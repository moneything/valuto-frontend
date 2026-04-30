const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

function getHeader(req, name) {
  return req.get?.(name) || req.headers?.[name.toLowerCase()];
}

function getSigningSecret() {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return null;
  }

  const normalized = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret;
  const decoded = Buffer.from(normalized, 'base64');
  return decoded.length > 0 ? decoded : null;
}

function isFreshTimestamp(timestamp) {
  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  return Math.abs(nowSeconds - timestampSeconds) <= SIGNATURE_TOLERANCE_SECONDS;
}

function hasValidSignature({ rawBody, svixId, svixTimestamp, svixSignature, secret }) {
  const signedContent = `${svixId}.${svixTimestamp}.${rawBody.toString('utf8')}`;
  const expected = crypto.createHmac('sha256', secret).update(signedContent).digest('base64');
  const expectedBuffer = Buffer.from(expected);

  return String(svixSignature)
    .split(' ')
    .some((signaturePart) => {
      const [version, signature] = signaturePart.split(',');
      if (version !== 'v1' || !signature) {
        return false;
      }

      const receivedBuffer = Buffer.from(signature);
      return (
        receivedBuffer.length === expectedBuffer.length &&
        crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
      );
    });
}

function verifyClerkWebhook(req, res, next) {
  const secret = getSigningSecret();
  if (!secret) {
    return res.status(500).json({ message: 'Clerk webhook is not configured.' });
  }

  const rawBody = Buffer.isBuffer(req.body) ? req.body : null;
  if (!rawBody) {
    return res.status(400).json({ message: 'Webhook raw body is required.' });
  }

  const svixId = getHeader(req, 'svix-id');
  const svixTimestamp = getHeader(req, 'svix-timestamp');
  const svixSignature = getHeader(req, 'svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ message: 'Missing Clerk webhook signature headers.' });
  }

  if (!isFreshTimestamp(svixTimestamp)) {
    return res.status(400).json({ message: 'Invalid Clerk webhook timestamp.' });
  }

  const verified = hasValidSignature({
    rawBody,
    svixId,
    svixTimestamp,
    svixSignature,
    secret,
  });

  if (!verified) {
    return res.status(400).json({ message: 'Invalid Clerk webhook signature.' });
  }

  try {
    req.clerkEvent = JSON.parse(rawBody.toString('utf8'));
    next();
  } catch (_error) {
    return res.status(400).json({ message: 'Invalid Clerk webhook payload.' });
  }
}

async function handleClerkWebhook(req, res) {
  try {
    const event = req.clerkEvent;
    const data = event.data;

    if (event.type === 'user.created') {
      await User.findOneAndUpdate(
        { clerkUserId: data.id },
        {
          clerkUserId: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        },
        { new: true, upsert: true }
      );
    }

    if (event.type === 'user.deleted') {
      await User.deleteOne({ clerkUserId: data.id });
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

router.post('/clerk', express.raw({ type: 'application/json' }), verifyClerkWebhook, handleClerkWebhook);

module.exports = router;
module.exports.verifyClerkWebhook = verifyClerkWebhook;
module.exports.handleClerkWebhook = handleClerkWebhook;
module.exports.hasValidSignature = hasValidSignature;
