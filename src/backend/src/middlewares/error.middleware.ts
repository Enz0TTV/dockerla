import { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/app-error.js';
import { env } from '../config/env.js';

// Express error middleware must have exactly 4 arguments: (err, req, res, next)
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // Check if error is an instance of our AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
    return;
  }

  // Handle malformed JSON body errors from express.json()
  if ('type' in err && err.type === 'entity.parse.failed') {
    res.status(400).json({
      success: false,
      error: {
        message: 'Invalid JSON payload provided in request body',
      },
    });
    return;
  }

  // Unhandled / server errors
  console.error(`[Unhandled Error] ${req.method} ${req.originalUrl}:`, err);

  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message =
    env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
