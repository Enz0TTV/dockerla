import { Request, Response } from 'express';
import { testDatabaseConnection } from '../config/database.js';
import { ApiResponse } from '../utils/api-response.js';

export const testDb = async (_req: Request, res: Response): Promise<void> => {
  const result = await testDatabaseConnection();

  if (result.connected) {
    ApiResponse.success({
      res,
      statusCode: 200,
      message: 'Database connection successful',
      data: result,
    });
    return;
  }

  res.status(503).json({
    success: false,
    message: 'Database connection failed',
    data: result,
  });
};
