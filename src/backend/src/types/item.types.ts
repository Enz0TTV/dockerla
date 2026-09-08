export interface Item {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateItemDTO = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateItemDTO = Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>;
