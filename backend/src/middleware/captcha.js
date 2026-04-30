const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function getCaptchaToken(req) {
  return (
    req.body?.turnstileToken ||
    req.body?.captchaToken ||
    req.body?.['cf-turnstile-response'] ||
    req.headers['cf-turnstile-response']
  );
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress;
}

async function verifyTurnstile(req, res, next) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        success: false,
        message: 'Captcha verification is not configured on the server.',
      });
    }

    return next();
  }

  const token = getCaptchaToken(req);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Captcha verification is required.',
    });
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });
    const remoteIp = getClientIp(req);
    if (remoteIp) body.append('remoteip', remoteIp);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      return res.status(400).json({
        success: false,
        message: 'Captcha verification failed.',
      });
    }

    next();
  } catch (error) {
    console.error('Captcha verification error:', error);
    return res.status(502).json({
      success: false,
      message: 'Captcha verification is temporarily unavailable.',
    });
  }
}

module.exports = { verifyTurnstile };
