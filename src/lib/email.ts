// Email notifications for lead capture
// Using Resend API (free tier: 100 emails/day)

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || '';
const NOTIFICATION_EMAIL = 'matt-troweledearth@outlook.com';

interface LeadEmailData {
  name?: string;
  email?: string;
  phone?: string;
  productsInterested?: string[];
  conversationSummary?: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set - skipping email notification');
    console.log('Lead captured:', lead);
    return false;
  }

  const productsList = lead.productsInterested?.length 
    ? lead.productsInterested.join(', ')
    : 'Not specified';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a1a1a; padding: 20px; text-align: center;">
        <h1 style="color: #f5f5f0; margin: 0;">New Lead from Website Chatbot</h1>
      </div>
      
      <div style="padding: 30px; background: #f5f5f0;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #8b7355; padding-bottom: 10px;">
          Contact Details
        </h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #8b7355;">Name:</td>
            <td style="padding: 10px 0;">${lead.name || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #8b7355;">Email:</td>
            <td style="padding: 10px 0;">
              <a href="mailto:${lead.email}" style="color: #8b7355;">${lead.email || 'Not provided'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #8b7355;">Phone:</td>
            <td style="padding: 10px 0;">
              ${lead.phone ? `<a href="tel:${lead.phone}" style="color: #8b7355;">${lead.phone}</a>` : 'Not provided'}
            </td>
          </tr>
        </table>

        <h2 style="color: #1a1a1a; border-bottom: 2px solid #8b7355; padding-bottom: 10px; margin-top: 30px;">
          Products Interested In
        </h2>
        <p style="color: #1a1a1a; font-size: 16px;">${productsList}</p>

        ${lead.conversationSummary ? `
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #8b7355; padding-bottom: 10px; margin-top: 30px;">
          Conversation Summary
        </h2>
        <p style="color: #1a1a1a; font-size: 14px; white-space: pre-wrap;">${lead.conversationSummary}</p>
        ` : ''}
      </div>
      
      <div style="background: #1a1a1a; padding: 15px; text-align: center;">
        <p style="color: #f5f5f0; margin: 0; font-size: 12px;">
          Lead captured via Troweled Earth Melbourne website chatbot
        </p>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Troweled Earth <notifications@resend.dev>',
        to: [NOTIFICATION_EMAIL],
        subject: `🏗️ New Lead: ${lead.name || lead.email || 'Website Visitor'}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return false;
    }

    console.log('Lead notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send lead notification:', error);
    return false;
  }
}
