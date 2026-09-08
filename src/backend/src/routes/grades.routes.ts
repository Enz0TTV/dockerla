import { Router } from 'express';
import { listGrades } from '../controllers/grades.controller.js';

const router = Router();

router.get('/', listGrades);

export const gradesRoutes = router;
