import crypto from 'node:crypto';
import { Item, CreateItemDTO, UpdateItemDTO } from '../types/item.types.js';
import { AppError } from '../utils/app-error.js';

class ItemService {
  // In-memory store for demonstration purposes
  private items: Map<string, Item> = new Map([
    [
      '1',
      {
        id: '1',
        title: 'Learn modern Express.js',
        description: 'Set up TypeScript, Zod, Vitest, and clean architecture',
        completed: true,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    [
      '2',
      {
        id: '2',
        title: 'Build production REST API',
        description: 'Add Dockerfile, tests, and security middlewares',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  ]);

  async list(filters: { search?: string; completed?: boolean; limit: number; offset: number }) {
    let list = Array.from(this.items.values());

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      );
    }

    if (filters.completed !== undefined) {
      list = list.filter((item) => item.completed === filters.completed);
    }

    const total = list.length;
    const paginated = list.slice(filters.offset, filters.offset + filters.limit);

    return {
      items: paginated,
      total,
      limit: filters.limit,
      offset: filters.offset,
    };
  }

  async getById(id: string): Promise<Item> {
    const item = this.items.get(id);
    if (!item) {
      throw AppError.notFound(`Item with id '${id}' not found`);
    }
    return item;
  }

  async create(data: CreateItemDTO): Promise<Item> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const newItem: Item = {
      id,
      title: data.title,
      description: data.description,
      completed: data.completed ?? false,
      createdAt: now,
      updatedAt: now,
    };

    this.items.set(id, newItem);
    return newItem;
  }

  async update(id: string, data: UpdateItemDTO): Promise<Item> {
    const existing = await this.getById(id);
    const updated: Item = {
      ...existing,
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.completed !== undefined && { completed: data.completed }),
      updatedAt: new Date().toISOString(),
    };

    this.items.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    this.items.delete(id);
  }
}

export const itemService = new ItemService();
