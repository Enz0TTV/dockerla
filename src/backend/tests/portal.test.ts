import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Portal API Endpoints', () => {
  it('POST /api/v1/auth/register should create a new user and return token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'alice.dupont@myges.fr',
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Dupont',
        role: 'student',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('alice.dupont@myges.fr');
    expect(res.body.data.user.role).toBe('student');
    expect(res.body.data.token).toBeDefined();
  });

  it('POST /api/v1/auth/register should reject duplicate email with 409', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'admin@myges.fr',
        password: 'password123',
        firstName: 'Duplicate',
        lastName: 'Admin',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/auth/login should authenticate default admin account', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@myges.fr', password: 'admin123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe('admin');
    expect(res.body.data.token).toBeDefined();
  });

  it('POST /api/v1/auth/login should authenticate student user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'enzo.g@myges.fr', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe('enzo.g@myges.fr');
  });

  it('POST /api/v1/auth/logout should return success', async () => {
    const res = await request(app).post('/api/v1/auth/logout');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('Déconnexion');
  });

  it('POST /api/v1/auth/login should reject incorrect password with 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@myges.fr', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/auth/users should list all users', async () => {
    const res = await request(app).get('/api/v1/auth/users');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('GET /api/v1/auth/me should return student profile', async () => {
    const res = await request(app).get('/api/v1/auth/me');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.firstName).toBe('Enzo');
    expect(res.body.data.role).toBe('B3 Informatique');
  });

  it('PUT /api/v1/auth/profile should update profile fields', async () => {
    const res = await request(app)
      .put('/api/v1/auth/profile')
      .send({ phone: '06 99 88 77 66' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.phone).toBe('06 99 88 77 66');
  });

  it('GET /api/v1/dashboard should return aggregated portal metrics', async () => {
    const res = await request(app).get('/api/v1/dashboard');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stats.generalAverage).toBe(13.2);
    expect(Array.isArray(res.body.data.scheduleToday)).toBe(true);
    expect(Array.isArray(res.body.data.recentGrades)).toBe(true);
    expect(Array.isArray(res.body.data.homeworks)).toBe(true);
  });

  it('PATCH /api/v1/dashboard/homeworks/:id/toggle should toggle homework completion', async () => {
    const res = await request(app).patch('/api/v1/dashboard/homeworks/1/toggle');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.done).toBe(true);
  });

  it('GET /api/v1/grades should return student grades and subject averages', async () => {
    const res = await request(app).get('/api/v1/grades');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stats.generalAverage).toBe(13.2);
    expect(res.body.data.grades.length).toBeGreaterThan(0);
    expect(res.body.data.subjectAverages.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/absences should return absences list and gauge stats', async () => {
    const res = await request(app).get('/api/v1/absences');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stats.totalAbsences).toBe(5);
    expect(res.body.data.gauge.percentage).toBe(33);
  });

  it('POST /api/v1/absences/:id/justify should mark absence as justified', async () => {
    const res = await request(app)
      .post('/api/v1/absences/1/justify')
      .send({ reason: 'Certificat médical' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('justified');
  });

  it('GET /api/v1/schedule should return weekly schedule events', async () => {
    const res = await request(app).get('/api/v1/schedule');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.days.length).toBe(5);
    expect(res.body.data.events.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/messages should return inbox messages and unread counter', async () => {
    const res = await request(app).get('/api/v1/messages');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.unreadCount).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body.data.messages)).toBe(true);
  });

  it('GET /api/v1/documents should return available documents', async () => {
    const res = await request(app).get('/api/v1/documents');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.documents.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/stages should return current stage and deliverables', async () => {
    const res = await request(app).get('/api/v1/stages');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.currentStage.title).toContain('Full-Stack');
    expect(res.body.data.deliverables.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/settings should return preferences and active sessions', async () => {
    const res = await request(app).get('/api/v1/settings');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.preferences.notifications).toBeDefined();
    expect(res.body.data.sessions.length).toBeGreaterThan(0);
  });
});
