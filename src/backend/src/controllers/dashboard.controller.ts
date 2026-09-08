import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const getDashboard = async (_req: Request, res: Response): Promise<void> => {
  const data = await dashboardService.getDashboardData();

  ApiResponse.success({
    res,
    data,
  });
};

export const toggleHomework = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;
  const updated = await dashboardService.toggleHomework(id);

  ApiResponse.success({
    res,
    message: 'Statut du devoir mis à jour',
    data: updated,
  });
};
