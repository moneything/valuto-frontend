const { AppError, asyncHandler } = require('../utils/errorHandler');

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

const sendContactEmail = asyncHandler(async (req, res) => {
  const sanitizedInput = sanitizeContactPayload(req.body || {});
  const { name, email, subject, message } = sanitizedInput;

  if (!name || !email || !subject || !message) {
    throw new AppError('Name, email, subject, and message are required', 400);
  }

  if (!/^[A-Za-z ,.'-]+$/.test(name)) {
    throw new AppError('Name contains unsupported characters', 400);
  }

  if (!isSafeEmailAddress(email)) {
    throw new AppError('Please provide a valid email address', 400);
  }

  if (/[<>]/.test(subject)) {
    throw new AppError('Subject cannot contain angle brackets', 400);
  }

  if (message.length < 10) {
    throw new AppError('Message must be at least 10 characters', 400);
  }

  if (/[<>]/.test(message)) {
    throw new AppError('Message cannot contain angle brackets', 400);
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'jakebpb1@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
    throw new AppError('Email service is not configured on the server', 500);
  }

  let nodemailer;
  try {
    nodemailer = require('nodemailer');
  } catch (error) {
    throw new AppError('Email dependency is not installed on the server', 500);
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"Valuto Contact Form" <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      </div>
    `,
  });

  res.status(200).json({
    success: true,
    message: 'Message sent successfully',
  });
});

function sanitizeContactPayload(payload) {
  return {
    name: sanitizeFieldValue(payload.name, MAX_NAME_LENGTH),
    email: sanitizeFieldValue(payload.email, MAX_EMAIL_LENGTH).toLowerCase(),
    subject: sanitizeFieldValue(payload.subject, MAX_SUBJECT_LENGTH),
    message: sanitizeMessage(payload.message),
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeFieldValue(value, maxLength) {
  return String(value || '')
    .replace(/\0/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[\u0001-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value) {
  return String(value || '')
    .replace(/\0/g, '')
    .replace(/[^\S\r\n]+/g, ' ')
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function isSafeEmailAddress(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const normalized = value.trim();

  // Intentionally stricter than RFC parsing to avoid parser edge cases in mail headers.
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(normalized);
}

module.exports = {
  sendContactEmail,
};
