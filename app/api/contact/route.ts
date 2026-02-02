import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, name, email, subject, message, ...details } = body;

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
            return NextResponse.json({ success: true, message: 'Message sent successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
