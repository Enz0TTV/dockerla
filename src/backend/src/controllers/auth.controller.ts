import { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/api-response.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.register(req.body);

  ApiResponse.created(res, result, 'Compte utilisateur créé avec succès');
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  ApiResponse.success({
    res,
    message: 'Connexion réussie',
    data: result,
  });
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const email = authService.parseToken(req.headers.authorization);
  const profile = await authService.getProfile(email || undefined);

  ApiResponse.success({
    res,
    data: profile,
  });
};

export const listUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await authService.listUsers();

  ApiResponse.success({
    res,
    data: users,
  });
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const email = authService.parseToken(req.headers.authorization);
  const updated = await authService.updateProfile(req.body, email || undefined);

  ApiResponse.success({
    res,
    message: 'Profil mis à jour avec succès',
    data: updated,
  });
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const email = authService.parseToken(req.headers.authorization);
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(currentPassword, newPassword, email || undefined);

  ApiResponse.success({
    res,
    message: 'Mot de passe modifié avec succès',
  });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  ApiResponse.success({
    res,
    message: 'Déconnexion réussie',
  });
};
