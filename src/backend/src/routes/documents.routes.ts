import { Router } from 'express';
import { listDocuments, requestDocument } from '../controllers/documents.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const requestDocumentSchema = {
  body: z.object({
    documentType: z.string().min(1, 'Type de document requis'),
    note: z.string().optional(),
  }),
};

router.get('/', listDocuments);
router.post('/request', validate(requestDocumentSchema), requestDocument);

export const documentsRoutes = router;
