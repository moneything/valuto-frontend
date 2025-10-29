const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation Helper Functions
 * Provides reusable validation rules for API endpoints
 */

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

// User validation rules
const validateUserCreation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('role').isIn(['student', 'teacher']).withMessage('Role must be either student or teacher'),
  body('age').optional().isInt({ min: 5, max: 120 }).withMessage('Age must be between 5 and 120'),
  body('school').optional().trim().isLength({ max: 200 }),
  body('grade').optional().trim().isLength({ max: 50 }),
  body('subject').optional().trim().isLength({ max: 100 }),
  handleValidationErrors,
];

const validateUserUpdate = [
  body('name').optional().trim().notEmpty().isLength({ min: 2, max: 100 }),
  body('age').optional().isInt({ min: 5, max: 120 }),
  body('school').optional().trim().isLength({ max: 200 }),
  body('grade').optional().trim().isLength({ max: 50 }),
  body('subject').optional().trim().isLength({ max: 100 }),
  handleValidationErrors,
];

// Game result validation rules
const validateGameResult = [
  body('gameCode')
    .trim()
    .notEmpty()
    .withMessage('Game code is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('Game code must be 6 characters'),
  body('gameTitle').trim().notEmpty().withMessage('Game title is required'),
  body('score').isInt({ min: 0 }).withMessage('Score must be a non-negative integer'),
  body('maxPossibleScore')
    .isInt({ min: 0 })
    .withMessage('Max possible score must be a non-negative integer'),
  body('questionsAnswered')
    .isInt({ min: 0 })
    .withMessage('Questions answered must be a non-negative integer'),
  body('correctAnswers')
    .isInt({ min: 0 })
    .withMessage('Correct answers must be a non-negative integer'),
  body('timeTaken').optional().isInt({ min: 0 }).withMessage('Time taken must be non-negative'),
  body('questionResults').optional().isArray(),
  handleValidationErrors,
];

// Learning progress validation rules
const validateLearningProgress = [
  body('moduleId').trim().notEmpty().withMessage('Module ID is required'),
  body('moduleName').optional().trim(),
  body('lessonId').optional().trim(),
  body('lessonName').optional().trim(),
  body('activityType').optional().isIn(['quiz', 'simulation', 'scenario']).withMessage('Invalid activity type'),
  body('responses').optional().isArray().withMessage('Responses must be an array'),
  body('simulationResult').optional().isObject().withMessage('Simulation result must be an object'),
  body('scenarioResults').optional().isArray().withMessage('Scenario results must be an array'),
  body('sessionData').optional().isObject().withMessage('Session data must be an object'),
  body('quizScore')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Quiz score must be between 0 and 100'),
  body('timeSpent').optional().isInt({ min: 0 }).withMessage('Time spent must be non-negative'),
  body('status')
    .optional()
    .isIn(['not_started', 'in_progress', 'completed'])
    .withMessage('Invalid status'),
  handleValidationErrors,
];

// Challenge validation rules
const validateChallenge = [
  body('challengeId').trim().notEmpty().withMessage('Challenge ID is required'),
  body('challengeType').trim().notEmpty().withMessage('Challenge type is required'),
  body('challengeName').trim().notEmpty().withMessage('Challenge name is required'),
  body('pointsEarned')
    .isInt({ min: 0 })
    .withMessage('Points earned must be a non-negative integer'),
  body('targetProgress').isInt({ min: 1 }).withMessage('Target progress must be at least 1'),
  handleValidationErrors,
];

// Query parameter validation
const validatePaginationParams = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('skip').optional().isInt({ min: 0 }).withMessage('Skip must be a non-negative integer'),
  handleValidationErrors,
];

const validateLeaderboardParams = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 500 })
    .withMessage('Limit must be between 1 and 500'),
  query('school').optional().trim(),
  query('role').optional().isIn(['student', 'teacher']),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateUserCreation,
  validateUserUpdate,
  validateGameResult,
  validateLearningProgress,
  validateChallenge,
  validatePaginationParams,
  validateLeaderboardParams,
};
