import { Request, Response } from 'express';
import { scheduleService } from '../services/schedule.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const getSchedule = async (req: Request, res: Response): Promise<void> => {
  const weekOffset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
  const data = await scheduleService.getSchedule(weekOffset);

  ApiResponse.success({
    res,
    data,
  });
};
