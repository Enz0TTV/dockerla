import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import * as dbModule from '../src/config/database.js';

describe('Database API Endpoints', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GET /api/v1/db/test should return 200 when database is connected', async () => {
    vi.spyOn(dbModule, 'testDatabaseConnection').mockResolvedValueOnce({
      connected: true,
      latencyMs: 12,
      database: 'mieuxges',
      serverTime: '2026-09-08T08:30:00.000Z',
      postgresVersion: 'PostgreSQL 18.0 on x86_64-pc-linux-musl',
      tables: ['users'],
    });

    const res = await request(app).get('/api/v1/db/test');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Database connection successful');
    expect(res.body.data.connected).toBe(true);
    expect(res.body.data.database).toBe('mieuxges');
    expect(res.body.data.tables).toContain('users');
    expect(res.body.data.latencyMs).toBe(12);
  });

  it('GET /api/v1/db/test should return 503 when database connection fails', async () => {
    vi.spyOn(dbModule, 'testDatabaseConnection').mockResolvedValueOnce({
      connected: false,
      latencyMs: 50,
      error: 'connect ECONNREFUSED 127.0.0.1:5432',
    });

    const res = await request(app).get('/api/v1/db/test');

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Database connection failed');
    expect(res.body.data.connected).toBe(false);
    expect(res.body.data.error).toBe('connect ECONNREFUSED 127.0.0.1:5432');
  });

  it('GET /api/v1/db should alias /api/v1/db/test', async () => {
    vi.spyOn(dbModule, 'testDatabaseConnection').mockResolvedValueOnce({
      connected: true,
      latencyMs: 5,
      database: 'mieuxges',
      tables: [],
    });

    const res = await request(app).get('/api/v1/db');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.connected).toBe(true);
  });
});
