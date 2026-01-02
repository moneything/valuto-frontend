const Stripe = require('stripe');
const User = require('../models/User');
const { AppError, asyncHandler } = require('../utils/errorHandler');

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' }) : null;

const appBaseUrl =
  process.env.FRONTEND_URL ||
  'http://localhost:3000';

const successUrl = `${appBaseUrl}/dashboard?checkout=success`;
const cancelUrl = `${appBaseUrl}/subscribe?checkout=cancelled`;

const mapStripeStatus = (status) => {
  switch (status) {
    case 'trialing':
      return 'trialing';
    case 'active':
      return 'active';
    case 'past_due':
    case 'unpaid':
      return 'past_due';
    case 'canceled':
    case 'incomplete_expired':
    case 'incomplete':
    default:
      return 'inactive';
  }
};

const updateUserSubscription = async ({ clerkUserId, customerId, subscriptionId, status, currentPeriodEnd }) => {
  if (!clerkUserId && !customerId) {
    return;
  }

  const query = clerkUserId ? { clerkUserId } : { stripeCustomerId: customerId };

  await User.findOneAndUpdate(
    query,
    {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      subscriptionStatus: mapStripeStatus(status),
      subscriptionCurrentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null,
      lastActiveDate: new Date(),
    },
    { new: true }
  );
};

/**
 * @desc Create Stripe Checkout session for subscription
 * @route POST /api/billing/checkout
 * @access Private
 */
const createCheckoutSession = asyncHandler(async (req, res) => {
  if (!stripe || !process.env.STRIPE_PRICE_ID) {
    throw new AppError('Stripe is not configured. Please set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.', 500);
  }

  const { userId, emailAddress } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });

  if (!user) throw new AppError('User not found', 404);

  if (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing') {
    return res.status(200).json({
      success: true,
      alreadyActive: true,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    allow_promotion_codes: true,
    customer: user.stripeCustomerId || undefined,
    customer_email: user.stripeCustomerId ? undefined : user.email || emailAddress,
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        clerkUserId: userId,
      },
    },
    metadata: {
      clerkUserId: userId,
    },
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });
});

/**
 * @desc Create Stripe billing portal session
 * @route POST /api/billing/portal
 * @access Private
 */
const createBillingPortalSession = asyncHandler(async (req, res) => {
  if (!stripe) {
    throw new AppError('Stripe is not configured.', 500);
  }

  const { userId } = req.auth;
  const user = await User.findOne({ clerkUserId: userId });

  if (!user || !user.stripeCustomerId) {
    throw new AppError('No Stripe customer found for this user.', 400);
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${appBaseUrl}/dashboard`,
  });

  res.status(200).json({
    success: true,
    url: portalSession.url,
  });
});

/**
 * @desc Stripe webhook handler
 * @route POST /api/billing/webhook
 * @access Public (Stripe only)
 */
const handleStripeWebhook = async (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).send('Stripe webhook not configured');
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const clerkUserId = session.metadata?.clerkUserId;
        const subscriptionId = session.subscription;
        const customerId = session.customer;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          await updateUserSubscription({
            clerkUserId,
            customerId,
            subscriptionId,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
          });
        } else {
          await updateUserSubscription({
            clerkUserId,
            customerId,
            subscriptionId: null,
            status: 'active',
            currentPeriodEnd: null,
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await updateUserSubscription({
          clerkUserId: subscription.metadata?.clerkUserId,
          customerId: subscription.customer,
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
        });
        break;
      }

      default:
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook handler error:', err);
    res.status(500).send('Webhook handler failed');
  }
};

module.exports = {
  createCheckoutSession,
  createBillingPortalSession,
  handleStripeWebhook,
};
