import { Router } from 'express';
import { register, login, logout, getMe, listUsers, updateProfile, changePassword } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { z } from 'zod';

const router = Router();

const registerSchema = {
  body: z.object({
    email: z.string().email('Adresse email valide requise'),
    password: z.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
    firstName: z.string().min(1, 'Le prénom est requis'),
    lastName: z.string().min(1, 'Le nom est requis'),
    studentId: z.string().optional(),
    phone: z.string().optional(),
    birthDate: z.string().optional(),
    address: z.string().optional(),
  }),
};

const loginSchema = {
  body: z.object({
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(1, 'Mot de passe requis'),
  }),
};

const updateProfileSchema = {
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().optional(),
    birthDate: z.string().optional(),
    address: z.string().optional(),
  }),
};

const changePasswordSchema = {
  body: z.object({
    currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
    newPassword: z.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
  }),
};

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', getMe);
router.get('/users', listUsers);
router.put('/profile', validate(updateProfileSchema), updateProfile);
router.post('/change-password', validate(changePasswordSchema), changePassword);

export const authRoutes = router;
