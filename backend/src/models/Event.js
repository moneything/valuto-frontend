const mongoose = require('mongoose');

/**
 * Event Schema
 * Stores networking and financial education events
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: 'Free',
    },
    link: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: 'Eventbrite',
    },
    category: {
      type: String,
      enum: ['networking', 'workshop', 'webinar', 'conference', 'meetup', 'general'],
      default: 'general',
    },
    eventDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
eventSchema.index({ eventDate: 1 });
eventSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Event', eventSchema);

