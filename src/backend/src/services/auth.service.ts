import bcrypt from 'bcryptjs';
import { AppError } from '../utils/app-error.js';
import { getDbPool } from '../config/database.js';
import { env } from '../config/env.js';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
  studentId: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  avatarInitials: string;
  createdAt: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  studentId: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  avatarInitials: string;
  createdAt: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  studentId?: string;
  phone?: string;
  birthDate?: string;
  address?: string;
}

class AuthService {
  // Pre-hashed seeds for immediate availability:
  // admin123 -> $2b$10$w8fl5ZVVFnYFOfV6r2MXrOJQezwn90wR3H45E2Xj1aWRwgu6/mWxC
  // password123 -> $2b$10$5G8iftyt/x8iehPSmWLQo./u1nD6hx40IIxfjYLTzoj/tMW2eY0qe
  private users: Map<string, UserRecord> = new Map([
    [
      'admin@myges.fr',
      {
        id: '1',
        email: 'admin@myges.fr',
        passwordHash: '$2b$10$w8fl5ZVVFnYFOfV6r2MXrOJQezwn90wR3H45E2Xj1aWRwgu6/mWxC',
        firstName: 'Admin',
        lastName: 'Système',
        role: 'admin',
        studentId: 'ADMIN001',
        phone: '01 00 00 00 00',
        avatarInitials: 'AS',
        createdAt: new Date().toISOString(),
      },
    ],
    [
      'enzo.g@myges.fr',
      {
        id: '2',
        email: 'enzo.g@myges.fr',
        passwordHash: '$2b$10$5G8iftyt/x8iehPSmWLQo./u1nD6hx40IIxfjYLTzoj/tMW2eY0qe',
        firstName: 'Enzo',
        lastName: 'G.',
        role: 'B3 Informatique',
        studentId: '20240142',
        phone: '06 12 34 56 78',
        birthDate: '2003-05-15',
        address: '42 rue de la République, 75011 Paris',
        avatarInitials: 'EG',
        createdAt: new Date().toISOString(),
      },
    ],
  ]);

  private sanitizeUser(u: UserRecord): UserResponse {
    const { passwordHash: _, ...rest } = u;
    return rest;
  }

  async register(data: RegisterDTO): Promise<{ user: UserResponse; token: string }> {
    const email = data.email.toLowerCase().trim();

    // Check if user exists locally
    if (this.users.has(email)) {
      throw AppError.conflict('Un compte existe déjà avec cette adresse email');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const now = new Date().toISOString();
    const initials = `${data.firstName[0] || ''}${data.lastName[0] || ''}`.toUpperCase();

    let newId = String(Date.now());

    // If PostgreSQL database is available, persist in DB
    if (env.DATABASE_URL) {
      try {
        const pool = getDbPool();
        const res = await pool.query(
          `INSERT INTO users (email, password, first_name, last_name, role, student_id, phone, birth_date, address)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING id, created_at;`,
          [
            email,
            passwordHash,
            data.firstName,
            data.lastName,
            'student',
            data.studentId || `STU${Math.floor(10000 + Math.random() * 90000)}`,
            data.phone || null,
            data.birthDate || null,
            data.address || null,
          ]
        );
        if (res.rows[0]?.id) {
          newId = String(res.rows[0].id);
        }
      } catch (dbErr: any) {
        if (dbErr.code === '23505') {
          // unique violation in Postgres
          throw AppError.conflict('Un compte existe déjà avec cette adresse email');
        }
        console.warn('⚠️ Enregistrement DB non disponible, stockage en mémoire:', dbErr.message);
      }
    }

    const newUser: UserRecord = {
      id: newId,
      email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'student',
      studentId: data.studentId || `STU${Math.floor(10000 + Math.random() * 90000)}`,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address,
      avatarInitials: initials,
      createdAt: now,
    };

    this.users.set(email, newUser);

    const token = 'token-' + Buffer.from(email + ':' + Date.now()).toString('base64');
    return {
      user: this.sanitizeUser(newUser),
      token,
    };
  }

  async login(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    const cleanEmail = email.toLowerCase().trim();
    let userRecord = this.users.get(cleanEmail);

    // Try finding in PostgreSQL if not in local cache or if DB is configured
    if (env.DATABASE_URL) {
      try {
        const pool = getDbPool();
        const dbRes = await pool.query(`SELECT * FROM users WHERE LOWER(email) = $1 LIMIT 1;`, [cleanEmail]);
        if (dbRes.rows.length > 0) {
          const row = dbRes.rows[0];
          userRecord = {
            id: String(row.id),
            email: row.email,
            passwordHash: row.password,
            firstName: row.first_name,
            lastName: row.last_name,
            role: row.role,
            studentId: row.student_id,
            phone: row.phone,
            birthDate: row.birth_date ? row.birth_date.toISOString().split('T')[0] : undefined,
            address: row.address,
            avatarInitials: `${(row.first_name || '')[0] || ''}${(row.last_name || '')[0] || ''}`.toUpperCase(),
            createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
          };
          this.users.set(cleanEmail, userRecord);
        }
      } catch (err: any) {
        console.warn('⚠️ Requête login DB échouée, consultation du cache mémoire:', err.message);
      }
    }

    if (!userRecord) {
      throw AppError.unauthorized('Adresse email ou mot de passe incorrect');
    }

    const isMatch = await bcrypt.compare(password, userRecord.passwordHash);
    if (!isMatch) {
      throw AppError.unauthorized('Adresse email ou mot de passe incorrect');
    }

    const token = 'token-' + Buffer.from(userRecord.email + ':' + Date.now()).toString('base64');

    return {
      user: this.sanitizeUser(userRecord),
      token,
    };
  }

  async getProfile(email: string = 'enzo.g@myges.fr'): Promise<UserResponse> {
    const cleanEmail = email.toLowerCase().trim();
    const user = this.users.get(cleanEmail) || this.users.get('enzo.g@myges.fr')!;
    return this.sanitizeUser(user);
  }

  async listUsers(): Promise<UserResponse[]> {
    if (env.DATABASE_URL) {
      try {
        const pool = getDbPool();
        const res = await pool.query(`SELECT * FROM users ORDER BY id ASC;`);
        if (res.rows.length > 0) {
          return res.rows.map((row) => ({
            id: String(row.id),
            email: row.email,
            firstName: row.first_name,
            lastName: row.last_name,
            role: row.role,
            studentId: row.student_id,
            phone: row.phone,
            birthDate: row.birth_date ? row.birth_date.toISOString().split('T')[0] : undefined,
            address: row.address,
            avatarInitials: `${(row.first_name || '')[0] || ''}${(row.last_name || '')[0] || ''}`.toUpperCase(),
            createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
          }));
        }
      } catch (err: any) {
        console.warn('⚠️ Erreur listUsers DB, utilisation du cache mémoire:', err.message);
      }
    }

    return Array.from(this.users.values()).map((u) => this.sanitizeUser(u));
  }

  async updateProfile(updates: Partial<UserRecord>, email: string = 'enzo.g@myges.fr'): Promise<UserResponse> {
    const cleanEmail = email.toLowerCase().trim();
    let user = this.users.get(cleanEmail) || this.users.get('enzo.g@myges.fr')!;

    user = {
      ...user,
      ...(updates.firstName !== undefined && { firstName: updates.firstName }),
      ...(updates.lastName !== undefined && { lastName: updates.lastName }),
      ...(updates.phone !== undefined && { phone: updates.phone }),
      ...(updates.birthDate !== undefined && { birthDate: updates.birthDate }),
      ...(updates.address !== undefined && { address: updates.address }),
    };

    if (updates.firstName || updates.lastName) {
      const first = (updates.firstName || user.firstName)[0] || '';
      const last = (updates.lastName || user.lastName)[0] || '';
      user.avatarInitials = `${first}${last}`.toUpperCase();
    }

    this.users.set(user.email, user);

    if (env.DATABASE_URL) {
      try {
        const pool = getDbPool();
        await pool.query(
          `UPDATE users 
           SET first_name = $1, last_name = $2, phone = $3, birth_date = $4, address = $5, updated_at = NOW()
           WHERE LOWER(email) = $6;`,
          [user.firstName, user.lastName, user.phone, user.birthDate || null, user.address, user.email]
        );
      } catch (err: any) {
        console.warn('⚠️ Mise à jour DB échouée:', err.message);
      }
    }

    return this.sanitizeUser(user);
  }

  async changePassword(current: string, next: string, email: string = 'enzo.g@myges.fr'): Promise<void> {
    const cleanEmail = email.toLowerCase().trim();
    const user = this.users.get(cleanEmail) || this.users.get('enzo.g@myges.fr')!;

    const isMatch = await bcrypt.compare(current, user.passwordHash);
    if (!isMatch) {
      throw AppError.badRequest('Mot de passe actuel incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(next, salt);
    this.users.set(user.email, user);

    if (env.DATABASE_URL) {
      try {
        const pool = getDbPool();
        await pool.query(`UPDATE users SET password = $1, updated_at = NOW() WHERE LOWER(email) = $2;`, [
          user.passwordHash,
          user.email,
        ]);
      } catch (err: any) {
        console.warn('⚠️ Mise à jour mot de passe DB échouée:', err.message);
      }
    }
  }
}

export const authService = new AuthService();
