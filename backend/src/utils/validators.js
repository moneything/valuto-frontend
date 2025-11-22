// backend/src/utils/validators.js
const { body, param, query, validationResult } = require("express-validator");

/**
 * Unified validation utilities for all models
 */

/* -------------------------
   Shared Error Handler
-------------------------- */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("❌ VALIDATION FAILED:");
    console.dir(errors.array(), { depth: null });
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/* -------------------------
   User Validation
-------------------------- */
const validateUserCreation = [
  body("clerkUserId").trim().notEmpty().withMessage("Clerk user ID is required"),

  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2, max: 100 }),

  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),

  body("role")
    .isIn(["student", "teacher"])
    .withMessage("Role must be either student or teacher"),

  body("age").optional().isInt({ min: 5, max: 120 }),

  body("school").optional().trim().isLength({ max: 200 }),
  body("grade").optional().trim().isLength({ max: 50 }),
  body("subject").optional().trim().isLength({ max: 100 }),

  body("completedOnboarding").optional().isBoolean(),

  handleValidationErrors,
];

const validateUserUpdate = [
  body("name").optional().trim().isLength({ min: 2, max: 100 }),
  body("age").optional().isInt({ min: 5, max: 120 }),
  body("school").optional().trim().isLength({ max: 200 }),
  body("grade").optional().trim().isLength({ max: 50 }),
  body("subject").optional().trim().isLength({ max: 100 }),
  body("completedOnboarding").optional().isBoolean(),

  handleValidationErrors,
];

/* -------------------------
   GameResult Validation
-------------------------- */
const validateGameResult = [
  body("userId").trim().notEmpty(),
  body("clerkUserId").trim().notEmpty(),

  body("gameCode")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Game code must be 6 characters"),

  body("gameTitle").trim().notEmpty(),

  body("gameType").optional().isIn(["trivia", "quiz", "challenge"]),

  body("score").isInt({ min: 0 }),
  body("maxPossibleScore").isInt({ min: 0 }),

  body("questionsAnswered").isInt({ min: 0 }),
  body("correctAnswers").isInt({ min: 0 }),

  body("timeTaken").optional().isInt({ min: 0 }),

  body("questionResults")
    .optional()
    .isArray()
    .custom((arr) =>
      arr.every((q) => q.questionId && q.selectedAnswer !== undefined)
    ),

  handleValidationErrors,
];

/* -------------------------
   Learning Progress Validation (UPDATED FOR NEW SYSTEM)
-------------------------- */
const validateLearningProgress = [
  // Only validate what the frontend ACTUALLY sends

  body("moduleId")
    .trim()
    .notEmpty()
    .withMessage("moduleId (topic slug) is required"),

  body("responses")
    .optional()
    .isArray()
    .withMessage("responses must be an array"),

  body("responses.*.question")
    .optional()
    .isString()
    .withMessage("responses must be an array"),


  body("responses.*.selectedAnswer")
    .optional()
    .toInt()
    .isInt()
    .withMessage("selcted answer must be a string"),

  body("responses.*.isCorrect")
    .optional()
    .isBoolean()
    .withMessage("iscorrect must be a boolean"),

  body("simulationResult")
    .optional()
    .isObject()
    .withMessage("simulation result must be an object"),

  body("scenarioResults")
    .optional()
    .isArray()
    .withMessage("scenarioResults must be an array"),

  body("sessionData")
    .optional()
    .isObject()
    .withMessage("session data must be an object"),


  // Allow status but optional
  body("status")
    .optional({ nullable: true, checkFalsy: true }) // allows "", null, undefined
    .isIn(["not_started", "in_progress", "completed"])
    .withMessage("Invalid status"),


  handleValidationErrors,
];



/* -------------------------
   Challenge Validation
-------------------------- */
const validateChallenge = [
  body("userId").trim().notEmpty(),
  body("clerkUserId").trim().notEmpty(),

  body("challengeId").trim().notEmpty(),

  body("challengeType")
    .isIn([
      "daily_trivia",
      "learning_streak",
      "calculator_expert",
      "perfect_score",
      "speed_demon",
      "knowledge_master",
      "early_bird",
      "night_owl",
      "weekend_warrior",
    ])
    .withMessage("Invalid challenge type"),

  body("challengeName").trim().notEmpty(),

  body("challengeDescription").optional().trim(),

  body("completed").optional().isBoolean(),

  body("pointsEarned").isInt({ min: 0 }),

  body("bonusMultiplier").optional().isInt({ min: 1 }),

  body("currentProgress").optional().isInt({ min: 0 }),
  body("targetProgress").isInt({ min: 1 }),

  body("challengeDate").optional().isISO8601(),
  body("expiresAt").optional().isISO8601(),

  body("metadata").optional().isObject(),

  handleValidationErrors,
];

/* -------------------------
   Event Validation
-------------------------- */
const validateEventCreate = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty(),

  body("date").trim().notEmpty(),
  body("time").trim().notEmpty(),
  body("eventDate").notEmpty().isISO8601(),

  body("location").trim().notEmpty(),

  body("type")
    .isIn([
      "Networking",
      "Workshop",
      "Panel",
      "Seminar",
      "Charity",
      "Competition",
      "Webinar",
      "Conference",
      "Meetup",
    ]),

  body("capacity").isInt({ min: 1 }),
  body("registered").optional().isInt({ min: 0 }),

  body("price").optional().trim(),
  body("link").trim().notEmpty(),

  body("featured").optional().isBoolean(),
  body("source").optional().trim(),
  body("isActive").optional().isBoolean(),

  handleValidationErrors,
];

/* -------------------------
   Pagination & Leaderboards
-------------------------- */
const validatePaginationParams = [
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("skip").optional().isInt({ min: 0 }),
  handleValidationErrors,
];

const validateLeaderboardParams = [
  query("limit").optional().isInt({ min: 1, max: 500 }),
  query("school").optional().trim(),
  query("role").optional().isIn(["student", "teacher"]),
  handleValidationErrors,
];

/* -------------------------
   Session (Live Game) Validators
-------------------------- */
const validateSessionCreate = [
  body("sessionId").trim().notEmpty(),
  body("joinCode")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("Join code must be 6 characters"),

  // Game info
  body("title").trim().notEmpty(),

  // Host info
  body("hostId").trim().notEmpty(),
  body("hostName").trim().notEmpty(),

  // Optional socket
  body("hostSocketId").optional().trim(),

  // Status
  body("status")
    .optional()
    .isIn(["waiting", "active", "ended", "archived"]),

  // Questions array
  body("questions")
    .isArray({ min: 1 })
    .withMessage("Questions must be an array with at least 1 question"),

  body("questions.*.id").notEmpty(),
  body("questions.*.question").notEmpty(),
  body("questions.*.options")
    .isArray({ min: 4, max: 4 })
    .withMessage("Each question must have exactly 4 options"),
  body("questions.*.correctIndex").isInt({ min: 0, max: 3 }),
  body("questions.*.timeLimit").isInt({ min: 10, max: 120 }),
  body("questions.*.points").optional().isInt({ min: 0 }),

  // Settings
  body("settings").optional().isObject(),
  body("settings.pointsPerCorrect").optional().isInt({ min: 0 }),
  body("settings.speedBonusEnabled").optional().isBoolean(),
  body("settings.maxSpeedBonus").optional().isInt({ min: 0 }),

  handleValidationErrors,
];

const validateSessionAnswer = [
  body("questionId").trim().notEmpty(),
  body("selectedIndex").isInt({ min: 0, max: 3 }),
  body("timeSpentMs").optional().isInt({ min: 0 }),

  handleValidationErrors,
];

/* -------------------------
   SessionResult Validators
-------------------------- */
const validateSessionResultCreate = [
  body("sessionId").trim().notEmpty(),
  body("sessionTitle").trim().notEmpty(),
  body("joinCode").trim().notEmpty(),

  // Player info
  body("userId").trim().notEmpty(),
  body("userName").trim().notEmpty(),

  // Scoring
  body("score").isInt({ min: 0 }),
  body("rank").isInt({ min: 1 }),
  body("totalQuestions").isInt({ min: 0 }),
  body("answeredQuestions").isInt({ min: 0 }),
  body("correctAnswers").isInt({ min: 0 }),
  body("accuracy").isFloat({ min: 0, max: 100 }),

  // Timings
  body("sessionStartedAt").notEmpty().isISO8601(),
  body("sessionEndedAt").notEmpty().isISO8601(),
  body("completedAt").optional().isISO8601(),

  // Answers
  body("answers").optional().isArray(),
  body("answers.*.questionId").notEmpty(),
  body("answers.*.questionText").notEmpty(),
  body("answers.*.selectedIndex").optional().isInt({ min: 0, max: 3 }),
  body("answers.*.correctIndex").isInt({ min: 0, max: 3 }),
  body("answers.*.isCorrect").isBoolean(),
  body("answers.*.timeSpentMs").optional().isInt({ min: 0 }),
  body("answers.*.pointsEarned").isInt({ min: 0 }),
  body("answers.*.answeredAt").optional().isISO8601(),

  handleValidationErrors,
];

/* -------------------------
   Learning Module (Admin) Validators
-------------------------- */
const validateLearningModuleCreate = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty(),

  // Category object
  body("category").isObject(),
  body("category.id").trim().notEmpty(),
  body("category.name").trim().notEmpty(),
  body("category.icon").optional().trim(),
  body("category.color").optional().trim(),

  body("topic").trim().notEmpty(),

  // Visual metadata
  body("visual").optional().isObject(),
  body("visual.icon").optional().trim(),
  body("visual.iconColor").optional().trim(),
  body("visual.badge").optional().trim(),
  body("visual.readTime").optional().isInt({ min: 1, max: 60 }),

  // Sections array
  body("contentSections").optional().isArray(),
  body("contentSections.*.type").isIn([
    "header",
    "explanation",
    "example",
    "warning",
    "tip",
    "comparison",
    "list",
    "steps",
  ]),
  body("contentSections.*.title").optional().trim(),
  body("contentSections.*.content").optional().trim(),

  // Quiz
  body("quiz").optional().isObject(),
  body("quiz.questions").optional().isArray(),
  body("quiz.questions.*.question").optional().trim(),
  body("quiz.questions.*.options")
    .optional()
    .isArray({ min: 4, max: 4 })
    .withMessage("Each quiz question must have 4 options"),
  body("quiz.questions.*.correctAnswer")
    .optional()
    .isInt({ min: 0, max: 3 }),
  body("quiz.questions.*.explanation").optional().trim(),
  body("quiz.passingScore").optional().isInt({ min: 1 }),

  // Related lessons
  body("relatedLessons").optional().isArray(),
  body("relatedLessons.*.moduleId").optional().trim(),
  body("relatedLessons.*.title").optional().trim(),
  body("relatedLessons.*.relationship").optional().isIn([
    "prerequisite",
    "next-step",
    "related",
    "advanced",
  ]),

  // Metadata
  body("points").optional().isInt({ min: 0 }),
  body("difficultyLevel")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"]),
  body("timeEstimate").optional().isInt({ min: 1, max: 60 }),
  body("order").optional().isInt({ min: 0 }),

  body("isActive").optional().isBoolean(),

  // Creator
  body("createdBy").trim().notEmpty(),

  handleValidationErrors,
];

const validateLearningModuleUpdate = [
  body("title").optional().trim(),
  body("description").optional().trim(),
  body("category").optional().isObject(),
  body("topic").optional().trim(),

  body("visual").optional().isObject(),
  body("contentSections").optional().isArray(),

  body("quiz").optional().isObject(),
  body("relatedLessons").optional().isArray(),

  body("points").optional().isInt({ min: 0 }),
  body("difficultyLevel")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"]),
  body("timeEstimate").optional().isInt({ min: 1, max: 60 }),
  body("order").optional().isInt({ min: 0 }),

  body("isActive").optional().isBoolean(),

  handleValidationErrors,
];


/* -------------------------
   Export Validators
-------------------------- */
module.exports = {
  handleValidationErrors,
  validateUserCreation,
  validateUserUpdate,

  validateGameResult,
  validateLearningProgress,

  validateChallenge,

  validateEventCreate,

  validatePaginationParams,
  validateLeaderboardParams,

  // Sessions
  validateSessionCreate,
  validateSessionAnswer,

  // Session Results
  validateSessionResultCreate,

  // Learning Modules
  validateLearningModuleCreate,
  validateLearningModuleUpdate,
};

