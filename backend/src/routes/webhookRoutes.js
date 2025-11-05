const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/clerk', express.json(), async (req, res) => {
  try {
    const event = req.body;
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
});

module.exports = router;
