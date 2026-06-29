import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const config = {
  maxDuration: 10,
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

const MAYE_EMAIL = '1702london@gmail.com'
const FROM_EMAIL = 'Rejuveefy <bookings@rejuveefy.com>'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    location, service, serviceType, size, length, duration,
    hairChoice, hairProducts,
    date, time,
    clientName, clientEmail, clientPhone, notes,
    priceSubtotal, londonSurcharge, hairTotal, total, deposit,
    paymentMethod,
  } = req.body

  if (!location || !service || !date || !time || !clientName || !clientEmail || !clientPhone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // 1. Save to Supabase
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
      hair_products: hairProducts || [],
      date,
      time,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      notes: notes || null,
      price_subtotal: priceSubtotal || 0,
      london_surcharge: londonSurcharge || 0,
      hair_total: hairTotal || 0,
      total: total || 0,
      deposit: deposit || 0,
      payment_method: paymentMethod,
      status: 'pending',
    })
    .select()
    .single()

  if (dbError) {
    console.error('Supabase error:', dbError)
    return res.status(500).json({ error: 'Failed to save booking' })
  }

  const locationLabel = { southampton: 'Southampton', portsmouth: 'Portsmouth', london: 'London' }[location] || location
  const hairProductNames = (hairProducts || []).map(p => p.name).join(', ')

  // 2. Send client confirmation email
  const clientEmailHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
      <div style="background:#111827;padding:32px;text-align:center">
        <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0">
          Booking <span style="color:#EC4899">Received</span>
        </h1>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:8px 0 0">Rejuveefy · Book Maye</p>
      </div>

      <div style="padding:32px;background:#ffffff">
        <p style="font-size:15px;line-height:1.6;margin:0 0 24px">
          Hi <strong>${clientName}</strong>,<br/>
          Your appointment request has been received. Maye will confirm your slot within 24 hours via WhatsApp or email.
        </p>

        <div style="background:#fdf2f8;border:1px solid #fce7f3;padding:24px;margin-bottom:24px">
          <h2 style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#EC4899;margin:0 0 16px">Appointment Details</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            ${row('Location', locationLabel)}
            ${row('Service', service)}
            ${serviceType ? row('Type', serviceType.split('(')[0].split('—')[0].trim()) : ''}
            ${size ? row('Size', size) : ''}
            ${length ? row('Length', length.split('—')[0].trim()) : ''}
            ${duration ? row('Duration', duration) : ''}
            ${row('Date', date)}
            ${row('Time', time)}
            ${hairProductNames ? row('Rejuveefy Hair', hairProductNames) : ''}
            ${londonSurcharge > 0 ? row('London Surcharge', `+£${londonSurcharge}`) : ''}
          </table>
        </div>

        <div style="background:#111827;padding:20px;display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
          <div>
            <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">Total</p>
            <p style="color:#ffffff;font-size:24px;font-weight:700;margin:0">£${total}</p>
          </div>
          <div style="text-align:right">
            <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">50% Deposit Due</p>
            <p style="color:#EC4899;font-size:24px;font-weight:700;margin:0">£${deposit}</p>
          </div>
        </div>

        ${paymentMethod === 'bank' ? `
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;margin-bottom:24px">
          <p style="font-size:13px;font-weight:700;color:#166534;margin:0 0 4px">Next step: Pay your deposit</p>
          <p style="font-size:13px;color:#166534;margin:0">Maye will send her bank details via WhatsApp. Once your deposit is received your appointment is confirmed.</p>
        </div>` : ''}

        <div style="border:1px solid #fce7f3;padding:16px;margin-bottom:24px">
          <p style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#9ca3af;margin:0 0 6px">Cancellation Policy</p>
          <p style="font-size:13px;color:#374151;margin:0">No refund if cancelled within 4 hours of your appointment.</p>
        </div>

        <p style="font-size:13px;color:#6b7280;margin:0">
          Questions? Contact Maye directly on WhatsApp or reply to this email.<br/>
          We look forward to seeing you.
        </p>
      </div>

      <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #f3e8ff">
        <p style="font-size:12px;color:#9ca3af;margin:0">Rejuveefy · rejuveefy.com</p>
      </div>
    </div>
  `

  // 3. Send Maye notification email
  const mayeEmailHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
      <div style="background:#111827;padding:32px;text-align:center">
        <h1 style="color:#EC4899;font-size:24px;font-weight:700;margin:0">New Booking</h1>
        <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:8px 0 0">Someone just booked through your Rejuveefy page</p>
      </div>

      <div style="padding:32px;background:#ffffff">
        <div style="background:#fdf2f8;border:1px solid #fce7f3;padding:24px;margin-bottom:24px">
          <h2 style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#EC4899;margin:0 0 16px">Client</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            ${row('Name', clientName)}
            ${row('Email', clientEmail)}
            ${row('Phone', clientPhone)}
            ${notes ? row('Notes', notes) : ''}
          </table>
        </div>

        <div style="background:#fdf2f8;border:1px solid #fce7f3;padding:24px;margin-bottom:24px">
          <h2 style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#EC4899;margin:0 0 16px">Appointment</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            ${row('Location', locationLabel)}
            ${row('Service', service)}
            ${serviceType ? row('Type', serviceType.split('(')[0].split('—')[0].trim()) : ''}
            ${size ? row('Size', size) : ''}
            ${length ? row('Length', length.split('—')[0].trim()) : ''}
            ${duration ? row('Duration', duration) : ''}
            ${row('Date', date)}
            ${row('Time', time)}
            ${hairProductNames ? row('Hair Ordered', hairProductNames) : ''}
          </table>
        </div>

        <div style="background:#111827;padding:20px;margin-bottom:24px">
          <table style="width:100%;font-size:13px;color:#ffffff">
            <tr><td style="padding:4px 0;color:rgba(255,255,255,0.5)">Total</td><td style="text-align:right;font-weight:700">£${total}</td></tr>
            ${londonSurcharge > 0 ? `<tr><td style="padding:4px 0;color:rgba(255,255,255,0.5)">London Surcharge</td><td style="text-align:right">+£${londonSurcharge}</td></tr>` : ''}
            <tr><td style="padding:4px 0;color:#EC4899;font-weight:700">Deposit (50%)</td><td style="text-align:right;color:#EC4899;font-weight:700">£${deposit}</td></tr>
            <tr><td style="padding:4px 0;color:rgba(255,255,255,0.5)">Payment Method</td><td style="text-align:right">${paymentMethod === 'bank' ? 'Bank Transfer (WhatsApp)' : 'Stripe'}</td></tr>
          </table>
        </div>

        ${paymentMethod === 'bank' ? `<p style="font-size:13px;font-weight:700;color:#EC4899;margin:0">Action required: Send your bank details to ${clientPhone} on WhatsApp to collect the deposit.</p>` : ''}
      </div>
    </div>
  `

  const [clientResult, mayeResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: `Booking Confirmed — ${service} on ${date} with Maye`,
      html: clientEmailHtml,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: MAYE_EMAIL,
      subject: `New Booking: ${clientName} — ${service} on ${date} at ${time}`,
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

function row(label, value) {
  return `
    <tr>
      <td style="padding:6px 0;color:#6b7280;width:40%;vertical-align:top">${label}</td>
      <td style="padding:6px 0;font-weight:600;text-align:right">${value}</td>
    </tr>
  `
}
