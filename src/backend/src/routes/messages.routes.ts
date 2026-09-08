import { Router } from 'express';
import { listMessages, getMessage, markAsRead, sendMessage } from '../controllers/messages.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const sendMessageSchema = {
  body: z.object({
    recipient: z.string().min(1, 'Destinataire requis'),
    subject: z.string().min(1, 'Objet requis'),
    content: z.string().min(1, 'Contenu requis'),
  }),
};

router.get('/', listMessages);
router.post('/', validate(sendMessageSchema), sendMessage);
router.get('/:id', getMessage);
router.patch('/:id/read', markAsRead);

export const messagesRoutes = router;
