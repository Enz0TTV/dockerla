import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Error Handling Middleware', () => {
  it('should return 404 for unknown endpoints', async () => {
    const res = await request(app).get('/api/unknown-route-xyz');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toContain('Route not found');
  });

  it('should handle malformed JSON syntax gracefully with 400', async () => {
    const res = await request(app)
      .post('/api/v1/items')
      .set('Content-Type', 'application/json')
      .send('{ "title": "broken json"');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toBe('Invalid JSON payload provided in request body');
  });
});
