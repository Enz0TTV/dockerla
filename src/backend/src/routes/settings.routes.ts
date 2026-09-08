import { Router } from 'express';
import { getSettings, updateSettings, revokeSession } from '../controllers/settings.controller.js';

const router = Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.delete('/sessions/:id', revokeSession);

export const settingsRoutes = router;
