import { Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.js';
import { env } from '../config/env.js';

export const getHealth = (_req: Request, res: Response): void => {
  const memoryUsage = process.memoryUsage();

  ApiResponse.success({
    res,
    message: 'Service is healthy',
    data: {
      status: 'ok',
      environment: env.NODE_ENV,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memory: {
        rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      },
    },
  });
};
