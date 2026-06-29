export const config = {
  maxDuration: 10,
  api: { bodyParser: { sizeLimit: '4mb' } }
}

const HAIR_PROMPT = `Analyse this hair photo. Return ONLY a JSON object — no markdown, no extra text.
Schema: {"overallScore":0,"summary":"","condition":"","hairType":"","scores":{"moisture":0,"strength":0,"scalp":0,"shine":0,"density":0,"growth":0},"insights":["","","",""],"recommendations":[{"product":"","reason":"","match":0},{"product":"","reason":"","match":0},{"product":"","reason":"","match":0}],"concerns":["",""]}
Rules: overallScore 0-100. condition = Excellent|Good|Fair|Needs Care. hairType = specific curl pattern e.g. 4C Coily. All scores 0-100. insights = 4 specific observations from the image. recommendations = 3 real product types with specific reasons. concerns = 2 specific issues you see.`

const SKIN_PROMPT = `Analyse this skin/face photo. Return ONLY a JSON object — no markdown, no extra text.
Schema: {"overallScore":0,"summary":"","condition":"","skinType":"","scores":{"hydration":0,"evenness":0,"texture":0,"radiance":0,"pores":0,"firmness":0},"insights":["","","",""],"recommendations":[{"product":"","reason":"","match":0},{"product":"","reason":"","match":0},{"product":"","reason":"","match":0}],"concerns":["",""]}
Rules: overallScore 0-100. condition = Excellent|Good|Fair|Needs Care. skinType = Oily|Dry|Combination|Normal|Sensitive. All scores 0-100. insights = 4 specific observations. recommendations = 3 real product types with specific reasons. concerns = 2 specific issues you see.`

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
        max_tokens: 700,
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
      return res.status(500).json({ error: err.error?.message || `OpenAI error ${response.status}` })
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
    console.error('Analyze error:', err)
    return res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }
}
