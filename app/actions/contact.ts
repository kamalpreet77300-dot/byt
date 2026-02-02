'use server';

import { sendLeadEmail } from '@/lib/mail';

export async function submitContactForm(data: any) {
    const { type, name, email, subject, message, ...details } = data;

    try {
        const result = await sendLeadEmail({
            type: type || 'CONTACT',
            subject: subject || 'New Inquiry',
            fromName: name,
            fromEmail: email,
            details: {
                Message: message,
                ...details
            }
        });

        if (result.success) {
            return { success: true, message: 'Message sent successfully' };
        } else {
            return { success: false, message: 'Failed to send message' };
        }
    } catch (error) {
        console.error('Server Action Error:', error);
        return { success: false, message: 'Internal server error' };
    }
}
