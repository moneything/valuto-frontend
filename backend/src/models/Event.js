const mongoose = require('mongoose');

/**
 * Event Schema (Updated to match old platform structure)
 */
const eventSchema = new mongoose.Schema(
  {
    // Basic Info
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Date & Time (old platform requires both)
    date: {
      type: String, // e.g. "September 15, 2025"
      required: true,
    },
    time: {
      type: String, // e.g. "4:00 PM - 6:30 PM"
      required: true,
    },
    eventDate: {
      type: Date, // used for sorting & past/upcoming filtering
      required: true,
      index: true,
    },

    // Location
    location: {
      type: String,
      required: true,
    },

    // Event Type (Matches old platform categories)
    type: {
      type: String,
      enum: [
        'Networking',
        'Workshop',
        'Panel',
        'Seminar',
        'Charity',
        'Competition',
        'Webinar',
        'Conference',
        'Meetup'
      ],
      required: true,
      default: 'Workshop',
    },

    // Registration Management
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    registered: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Pricing & Links
    price: {
      type: String,
      default: 'Free',
    },
    link: {
      type: String, // registration or external event link
      required: true,
    },

    // Additional Metadata
    featured: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      default: 'Eventbrite',
    },

    // Status Flags
    isActive: {
      type: Boolean,
      default: true,
    },
    isPast: {
      type: Boolean,
      default: false,
    },

    // Track attendance for past events
    attendanceTracking: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        attended: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
eventSchema.index({ eventDate: 1, isPast: 1 });
eventSchema.index({ type: 1, isActive: 1 });
eventSchema.index({ featured: 1, eventDate: 1 });

/**
 * Virtuals
 */
eventSchema.virtual('isFull').get(function () {
  return this.registered >= this.capacity;
});

eventSchema.virtual('registrationPercentage').get(function () {
  return Math.round((this.registered / this.capacity) * 100);
});

/**
 * Static Methods
 */
eventSchema.statics.getUpcomingEvents = async function () {
  return this.find({
    isActive: true,
    isPast: false,
    eventDate: { $gte: new Date() },
  })
    .sort({ featured: -1, eventDate: 1 })
    .lean();
};

eventSchema.statics.getPastEvents = async function () {
  return this.find({
    isActive: true,
    isPast: true,
    eventDate: { $lt: new Date() },
  })
    .sort({ eventDate: -1 })
    .lean();
};

/**
 * Instance Methods
 */
eventSchema.methods.didUserAttend = function (userId) {
  return this.attendanceTracking.some(
    (record) =>
      record.userId.toString() === userId.toString() && record.attended === true
  );
};

/**
 * JSON formatting
 */
eventSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Event', eventSchema);
