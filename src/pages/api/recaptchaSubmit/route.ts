import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request, response: Response) {
    const secretKey = process.env.RECAPTION_KEY;

    const postData = await request.json();

    const { gRecaptchaToken } = postData;

    let res;

    const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

    try {
        res = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

    } catch (e) {
        return NextResponse.json({ success: false });
    }

    // eslint-disable-next-line no-magic-numbers
    if (res && res.data?.success && res.data?.score > 0.5) {

        return NextResponse.json({
            success: true,
            score: res.data.score,
        });
    } else {
        return NextResponse.json({ success: false });
    }
}