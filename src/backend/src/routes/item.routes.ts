import { Router } from 'express';
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createItemSchema,
  updateItemSchema,
  getItemByIdSchema,
  listItemsQuerySchema,
} from '../validations/item.validation.js';

const router = Router();

router.get('/', validate(listItemsQuerySchema), listItems);
router.post('/', validate(createItemSchema), createItem);
router.get('/:id', validate(getItemByIdSchema), getItemById);
router.patch('/:id', validate(updateItemSchema), updateItem);
router.put('/:id', validate(updateItemSchema), updateItem);
router.delete('/:id', validate(getItemByIdSchema), deleteItem);

export const itemRoutes = router;
