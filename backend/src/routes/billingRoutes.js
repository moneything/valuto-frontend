const express = require('express');
const router = express.Router();
const { createCheckoutSession, createBillingPortalSession } = require('../controllers/billingController');
const { authenticateClerkUser } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');

const billingRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many billing requests. Please try again shortly.',
});

// Create a Stripe Checkout session for subscriptions
router.post('/checkout', billingRateLimit, authenticateClerkUser, createCheckoutSession);

// Access Stripe Billing Portal
router.post('/portal', billingRateLimit, authenticateClerkUser, createBillingPortalSession);

module.exports = router;
