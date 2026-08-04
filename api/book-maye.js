import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const config = {
  maxDuration: 10,
}

const MAYE_EMAIL = '1702london@gmail.com'
const FROM_EMAIL = 'Rejuveefy <bookings@rejuveefy.com>'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const missingEnv = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'RESEND_API_KEY'].filter(key => !process.env[key])
  if (missingEnv.length) {
    console.error('Book Maye configuration missing:', missingEnv.join(', '))
    return res.status(500).json({ error: 'Booking service is not ready. Please contact Rejuveefy directly.' })
  }

  const {
    location, service, serviceType, size, length, duration,
    hairChoice, hairProducts = [],
    date, time,
    clientName, clientEmail, clientPhone, notes,
    priceSubtotal, londonSurcharge, hairTotal, total, deposit,
    paymentMethod,
  } = req.body || {}

  if (!location || !service || !date || !time || !clientName || !clientEmail || !clientPhone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data: booking, error: dbError } = await supabase
    .from('maye_bookings')
    .insert({
      location,
      service,
      service_type: serviceType || null,
      size: size || null,
      length: length || null,
      duration: duration || null,
      hair_choice: hairChoice || null,
      hair_products: hairProducts,
      date,
      time,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      notes: notes || null,
      price_subtotal: Number(priceSubtotal || 0),
      london_surcharge: Number(londonSurcharge || 0),
      hair_total: Number(hairTotal || 0),
      total: Number(total || 0),
      deposit: Number(deposit || 0),
      payment_method: paymentMethod || null,
      status: 'pending',
    })
    .select()
    .single()

  if (dbError) {
    console.error('Book Maye save failed:', dbError)
    return res.status(500).json({ error: 'Booking could not be saved. Please contact Rejuveefy directly.' })
  }

  const locationLabel = { southampton: 'Southampton', portsmouth: 'Portsmouth', london: 'London' }[location] || location
  const serviceLabel = cleanLabel(service)
  const typeLabel = serviceType ? cleanLabel(serviceType) : ''
  const lengthLabel = length ? cleanLabel(length) : ''
  const hairProductNames = hairProducts.map(p => p.name).filter(Boolean).join(', ')
  const formattedTotal = money(total)
  const formattedDeposit = money(deposit)

  const clientEmailHtml = layoutEmail(`
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px">
      Hi <strong>${escapeHtml(clientName)}</strong>,<br/>
      Your appointment request has been received. Maye will review the request and confirm your slot within 24 hours by WhatsApp or email.
    </p>
    ${detailsBlock('Appointment Details', [
      ['Location', locationLabel],
      ['Service', serviceLabel],
      typeLabel && ['Type', typeLabel],
      size && ['Size', size],
      lengthLabel && ['Length', lengthLabel],
      duration && ['Duration', duration],
      ['Date', date],
      ['Time', time],
      hairProductNames && ['Rejuveefy Hair', hairProductNames],
      Number(londonSurcharge || 0) > 0 && ['London Surcharge', `+${money(londonSurcharge)}`],
    ])}
    ${paymentBlock(formattedTotal, formattedDeposit)}
    ${paymentMethod === 'bank' ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;margin-bottom:24px">
        <p style="font-size:13px;font-weight:700;color:#166534;margin:0 0 4px">Next step: deposit details</p>
        <p style="font-size:13px;color:#166534;margin:0">Maye will send bank details by WhatsApp. Your appointment is confirmed after the request and deposit are reviewed.</p>
      </div>` : ''}
    <div style="border:1px solid #fce7f3;padding:16px;margin-bottom:24px">
      <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#9ca3af;margin:0 0 6px">Cancellation Policy</p>
      <p style="font-size:13px;color:#374151;margin:0">No refund if cancelled within 4 hours of your appointment.</p>
    </div>
    <p style="font-size:13px;color:#6b7280;margin:0">Questions? Contact Maye directly on WhatsApp or reply to this email.</p>
  `)

  const mayeEmailHtml = layoutEmail(`
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px">
      A new Book Maye request has been submitted through Rejuveefy.
    </p>
    ${detailsBlock('Client', [
      ['Name', clientName],
      ['Email', clientEmail],
      ['Phone', clientPhone],
      notes && ['Notes', notes],
    ])}
    ${detailsBlock('Appointment', [
      ['Location', locationLabel],
      ['Service', serviceLabel],
      typeLabel && ['Type', typeLabel],
      size && ['Size', size],
      lengthLabel && ['Length', lengthLabel],
      duration && ['Duration', duration],
      ['Date', date],
      ['Time', time],
      hairProductNames && ['Hair Ordered', hairProductNames],
    ])}
    ${paymentBlock(formattedTotal, formattedDeposit)}
    ${paymentMethod === 'bank' ? `<p style="font-size:13px;font-weight:700;color:#EC4899;margin:0">Action required: send bank details to ${escapeHtml(clientPhone)} on WhatsApp to collect the deposit.</p>` : ''}
  `)

  const [clientResult, mayeResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: `Booking request received - ${serviceLabel} on ${date} with Maye`,
      html: clientEmailHtml,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: MAYE_EMAIL,
      subject: `New booking request: ${clientName} - ${serviceLabel} on ${date} at ${time}`,
      html: mayeEmailHtml,
    }),
  ])

  if (clientResult.status === 'rejected') console.error('Client email failed:', clientResult.reason)
  if (mayeResult.status === 'rejected') console.error('Maye email failed:', mayeResult.reason)

  return res.status(200).json({
    success: true,
    bookingId: booking.id,
    emailsSent: clientResult.status === 'fulfilled' && mayeResult.status === 'fulfilled',
  })
}

function layoutEmail(content) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
      <div style="background:#111827;padding:32px;text-align:center">
        <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0">Booking <span style="color:#EC4899">Received</span></h1>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:8px 0 0">Rejuveefy - Book Maye</p>
      </div>
      <div style="padding:32px;background:#ffffff">${content}</div>
      <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #f3e8ff">
        <p style="font-size:12px;color:#9ca3af;margin:0">Rejuveefy - rejuveefy.com</p>
      </div>
    </div>
  `
}

function detailsBlock(title, rows) {
  const cleanRows = rows.filter(Boolean)
  return `
    <div style="background:#fdf2f8;border:1px solid #fce7f3;padding:24px;margin-bottom:24px">
      <h2 style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#EC4899;margin:0 0 16px">${escapeHtml(title)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        ${cleanRows.map(([label, value]) => row(label, value)).join('')}
      </table>
    </div>
  `
}

function paymentBlock(total, deposit) {
  return `
    <div style="background:#111827;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:13px;color:#ffffff">
        <tr><td style="padding:4px 0;color:rgba(255,255,255,0.5)">Total</td><td style="text-align:right;font-weight:700">${escapeHtml(total)}</td></tr>
        <tr><td style="padding:4px 0;color:#EC4899;font-weight:700">Deposit request</td><td style="text-align:right;color:#EC4899;font-weight:700">${escapeHtml(deposit)}</td></tr>
      </table>
    </div>
  `
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:6px 0;color:#6b7280;width:40%;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:6px 0;font-weight:600;text-align:right">${escapeHtml(value)}</td>
    </tr>
  `
}

function money(value) {
  return `GBP ${Number(value || 0).toFixed(2)}`
}

function cleanLabel(value) {
  return String(value).split('(')[0].split('—')[0].split('-')[0].trim()
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
