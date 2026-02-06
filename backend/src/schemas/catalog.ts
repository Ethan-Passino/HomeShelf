import { z } from "zod";

export const catalogItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  homeId: z.string(),
  createdBy: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tags: z.array(z.string()).optional(),
});

export const createCatalogItemSchema = catalogItemSchema.omit({ id: true });
export const updateCatalogItemSchema = catalogItemSchema
  .partial()
  .required({ id: true });

export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type CreateCatalogItem = z.infer<typeof createCatalogItemSchema>;
export type UpdateCatalogItem = z.infer<typeof updateCatalogItemSchema>;
