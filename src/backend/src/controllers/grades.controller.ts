import { Request, Response } from 'express';
import { gradesService } from '../services/grades.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const listGrades = async (req: Request, res: Response): Promise<void> => {
  const filter = req.query.filter as string | undefined;
  const data = await gradesService.getGrades(filter);

  ApiResponse.success({
    res,
    data,
  });
};
