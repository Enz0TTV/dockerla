import { Request, Response } from 'express';
import { documentsService } from '../services/documents.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const listDocuments = async (req: Request, res: Response): Promise<void> => {
  const category = req.query.category as string | undefined;
  const data = await documentsService.getDocuments(category);

  ApiResponse.success({
    res,
    data,
  });
};

export const requestDocument = async (req: Request, res: Response): Promise<void> => {
  const result = await documentsService.requestDocument(req.body);

  ApiResponse.created(res, result, result.message);
};
