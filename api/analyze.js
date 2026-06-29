export const config = {
  maxDuration: 10,
  api: { bodyParser: { sizeLimit: '4mb' } }
}

// No example numbers — forces model to derive real values from the image
const HAIR_PROMPT = `You are an expert Afro and textured hair specialist for Rejuveefy, a UK Black hair marketplace.

CRITICAL RULE: You MUST analyse THIS SPECIFIC PHOTO carefully. Every person's hair is different. Look at the actual curl pattern visible, the real moisture level of these strands, the actual scalp condition, the precise density and length. DO NOT return generic or template values — every score must reflect what is genuinely visible in this particular image.

Return ONLY a valid JSON object (no markdown, no code blocks, no extra text):

{
  "overallScore": <look at the actual health of this hair and give a REAL score 0-100, not a middle-of-the-road number>,
  "summary": "<2 unique sentences that ONLY describe what you see in THIS specific photo — the actual texture, the real current condition visible to you, and the single most important thing this person should do>",
  "condition": "<Excellent if hair looks genuinely healthy | Good if mostly healthy with minor issues | Fair if visible dryness/damage | Needs Care if significant issues visible>",
  "hairType": "<be precise: 4C Coily, 4B Coily, 4A Coily, 3C Curly, 3B Curly, 3A Curly, 2C Wavy, 2B Wavy, 1B Straight — look at the actual curl diameter and pattern>",
  "faceShape": "<study the face proportions carefully: Oval, Round, Square, Heart, Diamond, or Oblong — if face is not clearly visible write null>",
  "porosity": "<Low if hair looks coated/shiny but repels moisture | High if hair looks very porous/frizzy/absorbs quickly | Normal otherwise>",
  "density": "<Thin if scalp easily visible | Thick if scalp barely visible | Medium otherwise>",
  "scores": {
    "moisture": <look at how dry or hydrated these strands actually appear — dry brittle hair = 20-45, slightly dry = 46-60, well moisturised = 61-80, very hydrated = 81-100>,
    "strength": <look for signs of breakage, split ends, elasticity in the strands — weak/breaking = 20-45, some damage = 46-60, fairly strong = 61-80, very strong = 81-100>,
    "scalp": <if scalp visible — flaky/red = 20-45, some buildup = 46-60, mostly healthy = 61-80, very clean = 81-100 — if not visible estimate from overall hair condition>,
    "shine": <look at actual light reflection in the hair — very dull = 20-40, low shine = 41-60, moderate = 61-75, good shine = 76-100>,
    "density": <thin strands = 30-50, medium = 51-70, thick/full = 71-100>,
    "growth": <estimate from length and overall health — poor conditions = 30-50, average = 51-70, good conditions = 71-100>
  },
  "insights": [
    "<very specific observation that ONLY applies to THIS image — e.g. the exact curl pattern at the root vs tip, a specific area of dryness, the actual colour/tone visible>",
    "<another specific observation unique to this photo>",
    "<third specific observation — could be about scalp, length, texture, styling damage, etc.>"
  ],
  "concerns": [
    "<specific concern you can actually see in this image, not a generic concern>",
    "<second specific concern visible>"
  ],
  "bestStyles": [
    "<hairstyle that genuinely suits this face shape and hair type — be specific e.g. Knotless Box Braids, Faux Locs, Bantu Knots, Twist Out, Crochet Braids, Mini Twists>",
    "<second specific style>",
    "<third specific style>"
  ],
  "wigPicks": [
    {"style": "<specific wig type>", "length": "<specific inch length>", "curl": "<curl pattern>", "why": "<specific reason tied to face shape and hair type observed>"},
    {"style": "<specific wig type>", "length": "<specific inch length>", "curl": "<curl pattern>", "why": "<specific reason>"}
  ],
  "recommendations": [
    {"product": "<specific product category>", "reason": "<reason directly tied to what you observed in this image>", "match": <real match score based on how relevant this is>},
    {"product": "<specific product category>", "reason": "<reason directly tied to observation>", "match": <score>},
    {"product": "<specific product category>", "reason": "<reason directly tied to observation>", "match": <score>}
  ]
}`

const SKIN_PROMPT = `You are an expert skin specialist for Rejuveefy, a UK beauty marketplace.

CRITICAL RULE: You MUST analyse THIS SPECIFIC FACE PHOTO carefully. Every person's skin is different. Look at the actual pore size, the real skin texture, the precise tone evenness, any visible blemishes, oiliness or dryness. DO NOT return generic or template values — every number must reflect what is genuinely visible in this particular photo.

Return ONLY a valid JSON object (no markdown, no code blocks, no extra text):

{
  "overallScore": <look at the real skin health in this photo and give an honest score 0-100 — not a safe middle number>,
  "summary": "<2 unique sentences that ONLY describe what you see in THIS specific face — the actual skin texture, real visible concerns, and one concrete thing this person should prioritise>",
  "condition": "<Excellent if skin looks genuinely healthy | Good if mostly healthy | Fair if visible issues | Needs Care if significant concerns>",
  "skinType": "<look at shine/dryness carefully: Oily if shine on T-zone/forehead | Dry if tight/flaky areas visible | Combination if T-zone oily but cheeks dry | Normal if balanced | Sensitive if visible redness/reactivity>",
  "undertone": "<study vein colour if visible, overall warmth: Warm if golden/peachy | Cool if pink/bluish | Neutral if balanced>",
  "faceShape": "<study face proportions: Oval, Round, Square, Heart, Diamond, or Oblong — measure forehead vs jaw vs cheekbone width visually>",
  "scores": {
    "hydration": <look at how plump vs tight the skin appears — very dehydrated = 20-40, slightly dry = 41-60, well hydrated = 61-80, very plump = 81-100>,
    "evenness": <look at actual tone consistency — significant hyperpigmentation/dark spots = 20-45, some unevenness = 46-65, mostly even = 66-80, very even = 81-100>,
    "texture": <look at actual surface — rough/bumpy = 20-45, some texture = 46-65, fairly smooth = 66-80, very smooth = 81-100>,
    "radiance": <look at actual glow — very dull = 20-40, low glow = 41-60, moderate = 61-75, glowing = 76-100>,
    "pores": <look at actual pore visibility — very visible/enlarged = 20-40, somewhat visible = 41-65, minimal = 66-80, barely visible = 81-100>,
    "firmness": <look at skin elasticity signs — significant sagging = 20-40, some looseness = 41-60, fairly firm = 61-80, very firm = 81-100>
  },
  "insights": [
    "<very specific observation ONLY about this face — e.g. a specific area of dryness, actual pore location, specific pigmentation pattern, exact forehead condition>",
    "<another specific unique observation>",
    "<third specific observation>"
  ],
  "concerns": [
    "<specific concern you can actually see in this face, not a generic concern>",
    "<second specific concern>"
  ],
  "morningRoutine": [
    "<step 1 product type — specific to their skin type>",
    "<step 2>",
    "<step 3>",
    "<step 4 — SPF is always last>"
  ],
  "eveningRoutine": [
    "<step 1 — cleanser type>",
    "<step 2 — treatment specific to their concerns>",
    "<step 3>",
    "<step 4 — night moisturiser>"
  ],
  "recommendations": [
    {"product": "<specific product type>", "reason": "<reason directly tied to what you observed in this face>", "match": <real relevance score 60-99>},
    {"product": "<specific product type>", "reason": "<reason directly tied to observation>", "match": <score>},
    {"product": "<specific product type>", "reason": "<reason directly tied to observation>", "match": <score>}
  ]
}`

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
        max_tokens: 900,
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } },
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
