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
    ? `You are an expert hair analysis AI for Rejuveefy, a UK beauty platform. Analyse this hair image and return a JSON object with exactly this structure:
{
  "overallScore": <number 0-100>,
  "summary": "<2 sentence overall assessment>",
  "condition": "<Excellent|Good|Fair|Needs Care>",
  "hairType": "<e.g. 4C Coily, 3B Curly, 2A Wavy, 1B Straight>",
  "scores": {
    "moisture": <0-100>,
    "strength": <0-100>,
    "scalp": <0-100>,
    "shine": <0-100>,
    "density": <0-100>,
    "growth": <0-100>
  },
  "insights": [
    "<specific observation 1>",
    "<specific observation 2>",
    "<specific observation 3>"
  ],
  "recommendations": [
    { "product": "<product name>", "reason": "<why this helps>", "match": <60-99> },
    { "product": "<product name>", "reason": "<why this helps>", "match": <60-99> },
    { "product": "<product name>", "reason": "<why this helps>", "match": <60-99> }
  ],
  "concerns": ["<concern 1>", "<concern 2>"]
}
Be specific, accurate, and helpful. Focus on what you can see in the image.`
    : `You are an expert skin analysis AI for Rejuveefy, a UK beauty platform. Analyse this skin/face image and return a JSON object with exactly this structure:
{
  "overallScore": <number 0-100>,
  "summary": "<2 sentence overall assessment>",
  "condition": "<Excellent|Good|Fair|Needs Care>",
  "skinType": "<e.g. Oily, Dry, Combination, Normal, Sensitive>",
  "scores": {
    "hydration": <0-100>,
    "evenness": <0-100>,
    "texture": <0-100>,
    "radiance": <0-100>,
    "pores": <0-100>,
    "firmness": <0-100>
  },
  "insights": [
    "<specific observation 1>",
    "<specific observation 2>",
    "<specific observation 3>"
  ],
  "recommendations": [
    { "product": "<product name>", "reason": "<why this helps>", "match": <60-99> },
    { "product": "<product name>", "reason": "<why this helps>", "match": <60-99> },
    { "product": "<product name>", "reason": "<why this helps>", "match": <60-99> }
  ],
  "concerns": ["<concern 1>", "<concern 2>"]
}
Be specific, accurate, and helpful. Focus on what you can see in the image.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1200,
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
