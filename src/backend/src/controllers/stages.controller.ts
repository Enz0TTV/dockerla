import { Request, Response } from 'express';
import { stagesService } from '../services/stages.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const getStages = async (_req: Request, res: Response): Promise<void> => {
  const data = await stagesService.getStagesData();

  ApiResponse.success({
    res,
    data,
  });
};

export const declareStage = async (req: Request, res: Response): Promise<void> => {
  const result = await stagesService.declareStage(req.body);

  ApiResponse.created(res, result, result.message);
};
