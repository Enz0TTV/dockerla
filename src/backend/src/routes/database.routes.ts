import { Router } from 'express';
import { testDb } from '../controllers/database.controller.js';

const router = Router();

// GET /api/v1/db or /api/v1/db/test
router.get('/', testDb);
router.get('/test', testDb);

export const databaseRoutes = router;
