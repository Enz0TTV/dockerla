import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { apiRouter } from './routes/index.js';
import { healthRoutes } from './routes/health.routes.js';

export const createApp = (): Express => {
  const app = express();

  // Security & CORS
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
      credentials: true,
    })
  );

  // Request Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request Logger
  app.use(requestLogger);

  // Health check endpoint (for Docker / orchestrators)
  app.use('/health', healthRoutes);

  // API Routes (mounted under /api/v1)
  app.use(env.API_PREFIX, apiRouter);

  // Root Info Endpoint
  app.get('/', (_req, res) => {
    res.json({
      name: 'MieuxGES API',
      version: '1.0.0',
      apiPrefix: env.API_PREFIX,
      health: '/health',
    });
  });

  // 404 Handler for unmatched routes
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

export const app = createApp();
