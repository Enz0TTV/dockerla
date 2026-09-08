import { Router } from 'express';
import { getStages, declareStage } from '../controllers/stages.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const declareStageSchema = {
  body: z.object({
    title: z.string().min(1, 'Intitulé requis'),
    company: z.string().min(1, 'Entreprise requise'),
    startDate: z.string().min(1, 'Date de début requise'),
    endDate: z.string().min(1, 'Date de fin requise'),
    salary: z.string().optional(),
    tutor: z.string().optional(),
  }),
};

router.get('/', getStages);
router.post('/', validate(declareStageSchema), declareStage);

export const stagesRoutes = router;
