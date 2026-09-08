import { Request, Response } from 'express';
import { absencesService } from '../services/absences.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const listAbsences = async (req: Request, res: Response): Promise<void> => {
  const filter = req.query.filter as string | undefined;
  const data = await absencesService.getAbsences(filter);

  ApiResponse.success({
    res,
    data,
  });
};

export const justifyAbsence = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { reason } = req.body;
  const updated = await absencesService.justifyAbsence(id, reason);

  ApiResponse.success({
    res,
    message: 'Absence justifiée avec succès',
    data: updated,
  });
};
