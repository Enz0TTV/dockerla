import { Request, Response } from 'express';
import { messagesService } from '../services/messages.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const listMessages = async (req: Request, res: Response): Promise<void> => {
  const folder = (req.query.folder as string) || 'inbox';
  const data = await messagesService.getMessages(folder);

  ApiResponse.success({
    res,
    data,
  });
};

export const getMessage = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;
  const message = await messagesService.getMessageById(id);

  ApiResponse.success({
    res,
    data: message,
  });
};

export const markAsRead = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;
  const message = await messagesService.markAsRead(id);

  ApiResponse.success({
    res,
    message: 'Message marqué comme lu',
    data: message,
  });
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const message = await messagesService.createMessage(req.body);

  ApiResponse.created(res, message, 'Message envoyé avec succès');
};
