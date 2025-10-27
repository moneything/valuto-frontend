const mongoose = require('mongoose');

/**
 * LearningModule Schema
 * Stores the actual learning module content, activities, and metadata
 */
const learningModuleSchema = new mongoose.Schema(
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
    topic: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // Lesson Content
    lessonContent: {
      type: String,
      required: true,
    },

    // Learning Steps (for interactive learning)
    learningSteps: [{
      id: String,
      type: {
        type: String,
        enum: ['explanation', 'interactive', 'example', 'mini-game'],
      },
      title: String,
      content: String,
      interactiveData: mongoose.Schema.Types.Mixed,
      emoji: String,
      points: Number,
    }],

    // Activity Configuration
    activityType: {
      type: String,
      enum: ['quiz', 'simulation', 'scenario'],
      required: true,
    },
    activityData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Metadata
    points: {
      type: Number,
      default: 100,
      min: 0,
    },
    difficultyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    timeEstimate: {
      type: Number, // in minutes
      default: 30,
      min: 1,
    },
    prerequisites: [{
      type: String, // moduleIds
    }],

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Creator
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
learningModuleSchema.index({ topic: 1, difficultyLevel: 1 });
learningModuleSchema.index({ isActive: 1 });
learningModuleSchema.index({ createdBy: 1 });

// Virtual for id field
learningModuleSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Static method to get modules with filters
learningModuleSchema.statics.getModules = async function (filters = {}) {
  const query = { isActive: true };
  
  if (filters.topic) {
    query.topic = filters.topic;
  }
  if (filters.difficulty) {
    query.difficultyLevel = filters.difficulty;
  }
  if (filters.activityType) {
    query.activityType = filters.activityType;
  }

  return this.find(query).sort({ createdAt: -1 }).lean();
};

module.exports = mongoose.model('LearningModule', learningModuleSchema);

