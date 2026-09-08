import { Router } from 'express';
import { getDashboard, toggleHomework } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/', getDashboard);
router.patch('/homeworks/:id/toggle', toggleHomework);

export const dashboardRoutes = router;
