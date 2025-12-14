const express = require('express');
const router = express.Router();
const { createCheckoutSession, createBillingPortalSession } = require('../controllers/billingController');
const { authenticateClerkUser } = require('../middleware/auth');

// Create a Stripe Checkout session for subscriptions
router.post('/checkout', authenticateClerkUser, createCheckoutSession);

// Access Stripe Billing Portal
router.post('/portal', authenticateClerkUser, createBillingPortalSession);

module.exports = router;
