import { z } from 'zod';

export const createItemSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
    description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
    completed: z.boolean().default(false),
  }),
};

export const updateItemSchema = {
  params: z.object({
    id: z.string().min(1, 'Item ID is required'),
  }),
  body: z
    .object({
      title: z.string().min(1, 'Title cannot be empty').max(100, 'Title cannot exceed 100 characters').optional(),
      description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
      completed: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
};

export const getItemByIdSchema = {
  params: z.object({
    id: z.string().min(1, 'Item ID is required'),
  }),
};

export const listItemsQuerySchema = {
  query: z.object({
    search: z.string().optional(),
    completed: z
      .enum(['true', 'false'])
      .transform((val) => val === 'true')
      .optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    offset: z.coerce.number().int().min(0).default(0),
  }),
};
