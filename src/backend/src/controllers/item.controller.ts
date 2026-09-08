import { Request, Response } from 'express';
import { itemService } from '../services/item.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const listItems = async (req: Request, res: Response): Promise<void> => {
  const { search, completed, limit, offset } = req.query as unknown as {
    search?: string;
    completed?: boolean;
    limit: number;
    offset: number;
  };

  const result = await itemService.list({ search, completed, limit, offset });

  ApiResponse.success({
    res,
    data: result.items,
    meta: {
      total: result.total,
      limit: result.limit,
      offset: result.offset,
    },
  });
};

export const getItemById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = req.params.id;
  const item = await itemService.getById(id);

  ApiResponse.success({
    res,
    data: item,
  });
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  const item = await itemService.create(req.body);

  ApiResponse.created(res, item, 'Item created successfully');
};

export const updateItem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = req.params.id;
  const updatedItem = await itemService.update(id, req.body);

  ApiResponse.success({
    res,
    message: 'Item updated successfully',
    data: updatedItem,
  });
};

export const deleteItem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const id = req.params.id;
  await itemService.delete(id);

  ApiResponse.noContent(res);
};
