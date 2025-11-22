/**
 * Improved Central Error Handling
 * Fully aligned with new Mongoose models & validators
 */

class AppError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  // Don't clone error — preserve Mongoose / Error props
  let error = err;

  // Dev logging
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }

  /** ------------------------------------
   * Mongoose: CastError (invalid ObjectId)
   * ------------------------------------ */
  if (err.name === "CastError") {
    error = new AppError(`Invalid ID: ${err.value}`, 400);
  }

  /** ------------------------------------
   * Mongoose: Duplicate Key
   * ------------------------------------ */
  if (err.code === 11000) {
    const fields = Object.keys(err.keyPattern);
    error = new AppError(
      `Duplicate value for: ${fields.join(", ")}`,
      400,
      fields
    );
  }

  /** ------------------------------------
   * Mongoose: Validation Errors
   * ------------------------------------ */
  if (err.name === "ValidationError") {
    const formattedErrors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    error = new AppError("Validation failed", 400, formattedErrors);
  }

  /** ------------------------------------
   * JWT Errors
   * ------------------------------------ */
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token has expired", 401);
  }

  /** ------------------------------------
   * Express-validator Recognition
   * ------------------------------------ */
  if (err.errors && Array.isArray(err.errors)) {
    error = new AppError("Validation failed", 400, err.errors);
  }

  /** ------------------------------------
   * Final Safe Response
   * ------------------------------------ */
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    errors: error.errors || undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

/** Async wrapper */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/** Not found */
const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

module.exports = {
  AppError,
  errorHandler,
  asyncHandler,
  notFound,
};
