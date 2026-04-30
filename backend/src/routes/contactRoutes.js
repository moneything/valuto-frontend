const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');
const { verifyTurnstile } = require('../middleware/captcha');
const { rateLimit } = require('../middleware/rateLimit');

const router = express.Router();
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many contact form submissions. Please try again later.',
});

// @route   POST /api/contact
// @desc    Send contact form email
// @access  Public
router.post('/', contactRateLimit, verifyTurnstile, sendContactEmail);

module.exports = router;
