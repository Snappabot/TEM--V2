import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const spaceType = (formData.get('spaceType') as string) || '';
    const feeling = (formData.get('feeling') as string) || '';
    const designerName = (formData.get('designerName') as string) || '';
    const timeline = (formData.get('timeline') as string) || '';
    const investment = (formData.get('investment') as string) || '';
    const notes = (formData.get('notes') as string) || '';

    const imageFiles = formData.getAll('images') as File[];

    // Build Resend attachments from uploaded files
    const attachments: { filename: string; content: string; type: string }[] = [];
    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        attachments.push({
          filename: file.name,
          content: base64,
          type: file.type || 'application/octet-stream',
        });
      }
    }

    const fileList =
      attachments.length > 0
        ? attachments.map(a => a.filename).join(', ')
        : 'None attached';

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Georgia',serif;">

  <div style="max-width:640px;margin:0 auto;">

    <!-- Header -->
    <div style="background:#0f0f0f;border-bottom:1px solid #8b7355;padding:40px 48px 32px;">
      <p style="color:#8b7355;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 12px;">
        Exclusive Commission Application
      </p>
      <h1 style="color:#f5f5f0;font-size:28px;font-weight:400;margin:0;line-height:1.3;">
        ${fullName}
      </h1>
    </div>

    <!-- Contact -->
    <div style="background:#111;padding:32px 48px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <h2 style="color:#8b7355;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 20px;font-weight:400;">
        Contact Details
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;width:160px;">Email</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">
            <a href="mailto:${email}" style="color:#c9aa82;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Phone</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">
            ${phone ? `<a href="tel:${phone}" style="color:#c9aa82;">${phone}</a>` : '<span style="color:rgba(255,255,255,0.3);">Not provided</span>'}
          </td>
        </tr>
      </table>
    </div>

    <!-- Project -->
    <div style="background:#111;padding:32px 48px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <h2 style="color:#8b7355;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 20px;font-weight:400;">
        Project Details
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;width:160px;vertical-align:top;">Space Type</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">${spaceType || '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">Designer / Architect</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">${designerName || '—'}</td>
        </tr>
      </table>
      <div style="margin-top:20px;">
        <p style="color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 10px;">Vision</p>
        <p style="color:#f5f5f0;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${feeling}</p>
      </div>
    </div>

    <!-- Vision -->
    <div style="background:#111;padding:32px 48px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <h2 style="color:#8b7355;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 20px;font-weight:400;">
        Scope &amp; Timeline
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;width:160px;">Timeline</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">${timeline || '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Investment</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">${investment || '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">Reference Images</td>
          <td style="padding:8px 0;color:#f5f5f0;font-size:14px;">${fileList}</td>
        </tr>
      </table>
      ${
        notes
          ? `<div style="margin-top:20px;">
        <p style="color:#8b7355;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 10px;">Additional Notes</p>
        <p style="color:#f5f5f0;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${notes}</p>
      </div>`
          : ''
      }
    </div>

    <!-- Footer -->
    <div style="background:#0f0f0f;padding:24px 48px;text-align:center;">
      <p style="color:rgba(255,255,255,0.25);font-size:11px;letter-spacing:0.1em;margin:0;">
        Troweled Earth Melbourne — Exclusive Commission Application
      </p>
    </div>

  </div>
</body>
</html>`;

    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || '';

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — skipping email');
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailPayload: Record<string, unknown> = {
      from: 'Troweled Earth <notifications@resend.dev>',
      to: ['matt-troweledearth@outlook.com'],
      subject: `🎨 Exclusive Commission Application — ${fullName}`,
      html: emailHtml,
    };

    if (attachments.length > 0) {
      emailPayload.attachments = attachments;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend API error:', errText);
      return new Response(JSON.stringify({ error: 'Failed to send email. Please try again.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Exclusive commission API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
