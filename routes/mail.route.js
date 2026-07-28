import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/send', async (req, res) => {
	const { email, name } = req.body;
	const senderEmail = process.env.MAIL;
	const senderPassword = process.env.PASSWORD;
	const senderName = process.env.MAIL_NAME || 'Mail Sender';

	if (!senderEmail || !senderPassword) {
		console.error('Email service error: missing MAIL or PASSWORD env vars');
		return res.status(500).json({ error: 'Email service not configured.' });
	}

	// 1. Send the email
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: senderEmail,
			pass: senderPassword,
		},
	});

	const mailOptions = {
		from: `${senderName} <${senderEmail}>`,
		to: email,
		subject: 'Welcome to Our Site!',
		text: `Hi ${name},\n\nThanks for signing up!`,
		html: `<p>Hi ${name},</p><p>Thanks for signing up!</p>`,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Signup successful. Email sent!' });
	} catch (error) {
		console.error('Email error:', error);
		res.status(500).json({ error: 'Signup successful but email failed.' });
	}
});

export default router;
