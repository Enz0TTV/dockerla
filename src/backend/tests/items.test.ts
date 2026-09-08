import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Items API Endpoints', () => {
  let createdItemId: string;

  it('GET /api/v1/items should return list of items with pagination metadata', async () => {
    const res = await request(app).get('/api/v1/items');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta.total).toBeGreaterThanOrEqual(2);
  });

  it('POST /api/v1/items should create a new item when payload is valid', async () => {
    const payload = {
      title: 'Test New Task',
      description: 'Test description',
      completed: false,
    };

    const res = await request(app).post('/api/v1/items').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.title).toBe(payload.title);

    createdItemId = res.body.data.id;
  });

  it('POST /api/v1/items should return 400 when validation fails (empty title)', async () => {
    const res = await request(app).post('/api/v1/items').send({ title: '' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toBe('Validation failed');
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  it('GET /api/v1/items/:id should return single item', async () => {
    const res = await request(app).get(`/api/v1/items/${createdItemId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(createdItemId);
  });

  it('PATCH /api/v1/items/:id should update existing item', async () => {
    const res = await request(app)
      .patch(`/api/v1/items/${createdItemId}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.completed).toBe(true);
  });

  it('DELETE /api/v1/items/:id should delete item and return 204', async () => {
    const res = await request(app).delete(`/api/v1/items/${createdItemId}`);

    expect(res.status).toBe(204);

    // Verify it is deleted
    const verifyRes = await request(app).get(`/api/v1/items/${createdItemId}`);
    expect(verifyRes.status).toBe(404);
  });

  it('GET /api/v1/items/:id should return 404 for non-existing id', async () => {
    const res = await request(app).get('/api/v1/items/non-existent-id-999');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
