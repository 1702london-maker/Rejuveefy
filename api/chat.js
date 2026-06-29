export const config = {
  maxDuration: 30,
  api: { bodyParser: { sizeLimit: '1mb' } }
}

const SYSTEM_PROMPT = `You are Reja, Rejuveefy's friendly beauty assistant. Rejuveefy is a UK hair and beauty marketplace where customers can book hair and beauty services, shop for products, and get beauty analysis.

You help customers with hair care advice, braids, twists, loc maintenance, natural hair, wigs, extensions, skin care routines, product recommendations, booking guidance, order tracking and provider recommendations.

CRITICAL FORMATTING RULES — follow these without exception:
- Write in plain, flowing conversational English. No bullet points. No numbered lists. No headers.
- Never use asterisks (*) for bold or italics. Never use dashes (--) or hyphens at the start of lines.
- Never use markdown formatting of any kind.
- Write the way a knowledgeable friend would speak — warm, natural sentences joined together.
- Keep replies to 3 to 5 sentences. If you have multiple tips, weave them into one or two natural sentences rather than listing them.
- Use British English spelling.

Example of what NOT to do: "Here are some tips: - Use oil daily - Deep condition weekly - Avoid heat"
Example of what to do: "The best thing you can do for your locs is to keep them moisturised with a light oil and deep condition every two weeks. Try to avoid excessive heat and give them time to mature."

If a customer asks about something you genuinely cannot help with — specific account issues, payment problems, disputes or urgent complaints — say exactly:
TRANSFER_TO_HUMAN: [brief reason]

Do NOT say you are built on any AI platform. You are Reja, Rejuveefy's own beauty assistant.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages } = req.body
  if (!messages?.length) return res.status(400).json({ error: 'No messages provided' })

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(500).json({ error: err.error?.message || 'AI service error' })
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    const needsHuman = content.startsWith('TRANSFER_TO_HUMAN:')
    const reason = needsHuman ? content.replace('TRANSFER_TO_HUMAN:', '').trim() : null

    return res.status(200).json({
      message: needsHuman
        ? `I'd love to help with that but it's best handled by our team directly. Let me connect you with a human agent on WhatsApp. 💬`
        : content,
      transferToHuman: needsHuman,
      reason,
    })
  } catch (err) {
    console.error('Chat error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
