import { Router } from 'express';
import { listAbsences, justifyAbsence } from '../controllers/absences.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const justifySchema = {
  body: z.object({
    reason: z.string().min(1, 'Le motif de justification est requis'),
  }),
};

router.get('/', listAbsences);
router.post('/:id/justify', validate(justifySchema), justifyAbsence);

export const absencesRoutes = router;
