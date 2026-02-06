import { z } from "zod";

export const inventoryItemSchema = z.object({
  id: z.string(),
  homeId: z.string(),
  catalogItemId: z.string(),
  quantity: z.number().int().min(0),
  location: z.string().optional(),
  expirationDate: z.string().optional(), // ISO date string
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createInventoryItemSchema = inventoryItemSchema.omit({ id: true });
export const updateInventoryItemSchema = inventoryItemSchema
  .partial()
  .required({ id: true });

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type CreateInventoryItem = z.infer<typeof createInventoryItemSchema>;
export type UpdateInventoryItem = z.infer<typeof updateInventoryItemSchema>;
