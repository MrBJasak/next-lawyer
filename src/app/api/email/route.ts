import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER_FROM,
    pass: process.env.EMAIL_PASS_CODE,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, phone, topic, message } = await request.json();
    if (!name || !email || !phone || !topic || !message) {
      return NextResponse.json({ error: 'Brakujące wymagane pola' }, { status: 400 });
    }

    const topicMap: { [key: string]: string } = {
      konsultacja: 'Konsultacja prawna',
      reprezentacja: 'Reprezentacja w sądzie',
      dokumenty: 'Przygotowanie dokumentów',
      inne: 'Inne',
    };

    const emailContent = `
      Nowa wiadomość z formularza kontaktowego:
      
      Imię: ${name}
      Email: ${email}
      Telefon: ${phone}
      Temat: ${topicMap[topic] || topic}
      
      Wiadomość:
      ${message}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER_FROM,
      to: process.env.EMAIL_USER_TO,
      subject: `[${topicMap[topic] || topic}] - Nowa wiadomość`,
      text: emailContent,
    });

    return NextResponse.json({ message: 'Wiadomość wysłana pomyślnie' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
