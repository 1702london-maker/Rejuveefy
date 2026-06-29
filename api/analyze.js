export const config = {
  maxDuration: 10,
  api: { bodyParser: { sizeLimit: '4mb' } }
}

const HAIR_PROMPT = `You are a UK Black hair specialist. Study this hair photo carefully. Return ONLY a JSON object — absolutely no markdown or extra text.

Required JSON (replace placeholder values with your real observations):
{"overallScore":72,"summary":"Your hair shows [what you see] with [main characteristic]. The key focus should be [most important action].","condition":"Good","hairType":"4B Coily","faceShape":"Oval","porosity":"Normal","density":"Medium","scores":{"moisture":65,"strength":70,"scalp":75,"shine":60,"density":80,"growth":68},"insights":["Specific observation 1 from image","Specific observation 2 from image","Specific observation 3 from image"],"concerns":["Specific concern 1 you can see","Specific concern 2 you can see"],"bestStyles":["Knotless Box Braids","Faux Locs","Bantu Knots"],"wigPicks":[{"style":"Lace Front Wig","length":"16 inch","curl":"4B Match","why":"Why this suits their face shape and hair"},{"style":"Full Lace Wig","length":"20 inch","curl":"Body Wave","why":"Why this complements their features"}],"recommendations":[{"product":"Deep Moisture Hair Mask","reason":"Specific reason from what you see","match":92},{"product":"Scalp Treatment Oil","reason":"Specific reason","match":85},{"product":"Protein Reconstructor","reason":"Specific reason","match":78}]}

Rules: condition=Excellent|Good|Fair|Needs Care. faceShape=Oval|Round|Square|Heart|Diamond|Oblong. porosity=Low|Normal|High. density=Thin|Medium|Thick. bestStyles = 3 hairstyles that suit this face shape. wigPicks = 2 specific wig recommendations. All scores 0-100. Match 60-99.`

const SKIN_PROMPT = `You are a UK skin specialist. Study this face/skin photo carefully. Return ONLY a JSON object — absolutely no markdown or extra text.

Required JSON (replace placeholder values with your real observations):
{"overallScore":75,"summary":"Your skin appears [what you see] with [main characteristic]. The priority is [most important action].","condition":"Good","skinType":"Combination","undertone":"Warm","faceShape":"Oval","scores":{"hydration":70,"evenness":65,"texture":75,"radiance":68,"pores":72,"firmness":80},"insights":["Specific observation 1 from image","Specific observation 2 from image","Specific observation 3 from image"],"concerns":["Specific concern 1 you can see","Specific concern 2 you can see"],"morningRoutine":["Gentle Cleanser","Vitamin C Serum","Lightweight Moisturiser","SPF 50"],"eveningRoutine":["Oil Cleanser","Niacinamide Serum","Retinol (2x week)","Night Cream"],"recommendations":[{"product":"Hyaluronic Acid Serum","reason":"Specific reason from what you see","match":92},{"product":"Niacinamide Toner","reason":"Specific reason","match":85},{"product":"SPF 50 Moisturiser","reason":"Specific reason","match":80}]}

Rules: condition=Excellent|Good|Fair|Needs Care. skinType=Oily|Dry|Combination|Normal|Sensitive. undertone=Warm|Cool|Neutral. faceShape=Oval|Round|Square|Heart|Diamond|Oblong. All scores 0-100. Match 60-99.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { imageBase64, type } = req.body
  if (!imageBase64) return res.status(400).json({ error: 'No image provided' })

  const prompt = type === 'hair' ? HAIR_PROMPT : SKIN_PROMPT
  const imageUrl = imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 750,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageUrl, detail: 'low' } },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('OpenAI error:', JSON.stringify(err))
      return res.status(500).json({ error: err.error?.message || `AI error ${response.status}` })
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    let result
    try {
      result = JSON.parse(content)
    } catch {
      const match = content.match(/\{[\s\S]*\}/)
      if (!match) return res.status(500).json({ error: 'Could not parse response. Please try again.' })
      result = JSON.parse(match[0])
    }

    return res.status(200).json(result)

  } catch (err) {
    console.error('Analyze error:', err.message)
    return res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }
}
