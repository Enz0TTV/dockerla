import { Response } from 'express';

export interface ApiResponseOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export class ApiResponse {
  static success<T>(options: ApiResponseOptions<T>): Response {
    const { res, statusCode = 200, message, data, meta } = options;
    return res.status(statusCode).json({
      success: true,
      ...(message && { message }),
      ...(data !== undefined && { data }),
      ...(meta && { meta }),
    });
  }

  static created<T>(res: Response, data: T, message: string = 'Resource created successfully'): Response {
    return this.success({ res, statusCode: 201, message, data });
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}
