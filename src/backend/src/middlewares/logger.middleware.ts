import morgan from 'morgan';
import { RequestHandler } from 'express';
import { env } from '../config/env.js';

export const requestLogger: RequestHandler = (req, res, next) => {
  if (env.NODE_ENV === 'test') {
    return next();
  }

  const format = env.NODE_ENV === 'production' ? 'combined' : 'dev';
  return morgan(format)(req, res, next);
};
