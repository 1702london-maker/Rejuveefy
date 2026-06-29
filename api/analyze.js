export const config = {
  maxDuration: 30,
  api: { bodyParser: { sizeLimit: '10mb' } }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { imageBase64, type } = req.body

  if (!imageBase64) return res.status(400).json({ error: 'No image provided' })

  const isHair = type === 'hair'

  const prompt = isHair
    ? `You are Reja, an expert hair analysis specialist for Rejuveefy, a UK beauty marketplace. Study this hair image carefully and return a complete JSON analysis. Every field is required — do not leave anything empty or skip any field.

Return this exact JSON structure with all fields populated:
{
  "overallScore": <integer 0-100 reflecting genuine hair health>,
  "summary": "<2-3 sentences describing what you see: the hair type, current condition, and the single most important thing to address>",
  "condition": "<one of: Excellent, Good, Fair, Needs Care>",
  "hairType": "<specific curl pattern e.g. 4C Coily, 4B Coily, 3C Curly, 3A Curly, 2C Wavy, 1B Straight — be precise>",
  "scores": {
    "moisture": <0-100>,
    "strength": <0-100>,
    "scalp": <0-100>,
    "shine": <0-100>,
    "density": <0-100>,
    "growth": <0-100>
  },
  "insights": [
    "<observation 1: specific thing visible in the image>",
    "<observation 2: specific thing visible in the image>",
    "<observation 3: specific thing visible in the image>",
    "<observation 4: specific thing visible in the image>"
  ],
  "recommendations": [
    { "product": "<real product type e.g. Deep Moisture Hair Mask>", "reason": "<specific reason based on what you saw>", "match": <70-98> },
    { "product": "<real product type e.g. Scalp Treatment Oil>", "reason": "<specific reason based on what you saw>", "match": <65-95> },
    { "product": "<real product type e.g. Protein Reconstructor>", "reason": "<specific reason based on what you saw>", "match": <60-90> }
  ],
  "concerns": [
    "<concern 1: specific issue visible>",
    "<concern 2: specific issue visible>"
  ]
}
Base every score and observation on what you actually see in the image. Be honest and specific.`
    : `You are Reja, an expert skin analysis specialist for Rejuveefy, a UK beauty marketplace. Study this face/skin image carefully and return a complete JSON analysis. Every field is required — do not leave anything empty or skip any field.

Return this exact JSON structure with all fields populated:
{
  "overallScore": <integer 0-100 reflecting genuine skin health>,
  "summary": "<2-3 sentences describing what you see: the skin type, current condition, and the single most important thing to address>",
  "condition": "<one of: Excellent, Good, Fair, Needs Care>",
  "skinType": "<one of: Oily, Dry, Combination, Normal, Sensitive, or a combination e.g. Combination-Oily>",
  "scores": {
    "hydration": <0-100>,
    "evenness": <0-100>,
    "texture": <0-100>,
    "radiance": <0-100>,
    "pores": <0-100>,
    "firmness": <0-100>
  },
  "insights": [
    "<observation 1: specific thing visible in the image>",
    "<observation 2: specific thing visible in the image>",
    "<observation 3: specific thing visible in the image>",
    "<observation 4: specific thing visible in the image>"
  ],
  "recommendations": [
    { "product": "<real product type e.g. Hyaluronic Acid Serum>", "reason": "<specific reason based on what you saw>", "match": <70-98> },
    { "product": "<real product type e.g. Niacinamide Toner>", "reason": "<specific reason based on what you saw>", "match": <65-95> },
    { "product": "<real product type e.g. SPF 50 Moisturiser>", "reason": "<specific reason based on what you saw>", "match": <60-90> }
  ],
  "concerns": [
    "<concern 1: specific issue visible>",
    "<concern 2: specific issue visible>"
  ]
}
Base every score and observation on what you actually see in the image. Be honest and specific.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 2000,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt + '\n\nRespond with valid JSON only. No markdown, no code blocks, no extra text.' },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'high',
                },
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(500).json({ error: err.error?.message || 'AI service error' })
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    let result
    try {
      result = JSON.parse(content)
    } catch {
      // Fallback: try to extract JSON block if model added extra text
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) return res.status(500).json({ error: 'Could not parse AI response. Please try again.' })
      result = JSON.parse(jsonMatch[0])
    }

    return res.status(200).json(result)

  } catch (err) {
    console.error('OpenAI API error:', err)
    return res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }
}
