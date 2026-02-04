import nodemailer from 'nodemailer';

export const sendLeadEmail = async (data: {
    type: 'CONTACT' | 'JOB_APPLICATION' | 'COURSE_ENROLLMENT' | 'PROJECT_PURCHASE';
    subject: string;
    fromName: string;
    fromEmail: string;
    details: Record<string, string>;
}) => {
    const companyEmail = process.env.COMPANY_EMAIL || 'contact@bytsmartz.com';

    let detailsHtml = '';
    for (const [key, value] of Object.entries(data.details)) {
        if (!value) continue;
        const isUrl = typeof value === 'string' && value.startsWith('http');
        const displayValue = isUrl
            ? `<a href="${value}" target="_blank" style="color: #3b82f6; text-decoration: underline;">View Attachment</a>`
            : value;

        detailsHtml += `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${displayValue}</td></tr>`;
    }

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <img src="https://byt-tan.vercel.app/images/logo.png" alt="BytSmartz Logo" style="width: 150px; height: auto; margin-bottom: 10px; filter: brightness(0) invert(1);">
                <h1 style="color: white; margin: 0;">BytSmartz Lead</h1>
                <p style="color: #eee; margin: 5px 0 0;">New ${data.type.replace('_', ' ')} Inquiry</p>
            </div>
            
            <div style="padding: 20px;">
                <h2 style="color: #333;">Lead Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Type:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.type}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>From:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.fromName} (${data.fromEmail})</td>
                    </tr>
                    ${detailsHtml}
                </table>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9; text-align: center; border-radius: 0 0 10px 10px;">
                <p style="color: #666; font-size: 12px; margin: 0;">This is an automated notification from BytSmartz website.</p>
            </div>
        </div>
    `;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"BytSmartz Leads" <${process.env.SMTP_FROM || companyEmail}>`,
            to: companyEmail,
            replyTo: data.fromEmail,
            subject: `[LEAD] ${data.subject} - ${data.fromName}`,
            html: html,
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending lead email:', error);
        return { success: false, error };
    }
};
