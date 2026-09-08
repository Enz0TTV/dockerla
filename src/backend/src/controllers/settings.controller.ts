import { Request, Response } from 'express';
import { settingsService } from '../services/settings.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  const data = await settingsService.getPreferences();

  ApiResponse.success({
    res,
    data,
  });
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  const updated = await settingsService.updatePreferences(req.body);

  ApiResponse.success({
    res,
    message: 'Préférences mises à jour',
    data: updated,
  });
};

export const revokeSession = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await settingsService.revokeSession(id);

  ApiResponse.success({
    res,
    message: result.message,
    data: result,
  });
};
