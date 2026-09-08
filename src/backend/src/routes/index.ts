import { Router } from 'express';
import { healthRoutes } from './health.routes.js';
import { itemRoutes } from './item.routes.js';
import { databaseRoutes } from './database.routes.js';
import { authRoutes } from './auth.routes.js';
import { dashboardRoutes } from './dashboard.routes.js';
import { gradesRoutes } from './grades.routes.js';
import { absencesRoutes } from './absences.routes.js';
import { scheduleRoutes } from './schedule.routes.js';
import { messagesRoutes } from './messages.routes.js';
import { documentsRoutes } from './documents.routes.js';
import { stagesRoutes } from './stages.routes.js';
import { settingsRoutes } from './settings.routes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/items', itemRoutes);
apiRouter.use('/db', databaseRoutes);
apiRouter.use('/database', databaseRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/grades', gradesRoutes);
apiRouter.use('/absences', absencesRoutes);
apiRouter.use('/schedule', scheduleRoutes);
apiRouter.use('/messages', messagesRoutes);
apiRouter.use('/documents', documentsRoutes);
apiRouter.use('/stages', stagesRoutes);
apiRouter.use('/settings', settingsRoutes);

export { apiRouter };
