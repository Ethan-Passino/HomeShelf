import { z } from "zod";

export const homeSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  createdBy: z.string(),
  invitedUsers: z.array(z.string()),
});

export const createHomeSchema = homeSchema
  .omit({ id: true, invitedUsers: true })
  .extend({
    invitedUsers: z.array(z.string()).default([]),
  });

export const updateHomeSchema = homeSchema.partial().required({ id: true });

export type Home = z.infer<typeof homeSchema>;
export type CreateHome = z.infer<typeof createHomeSchema>;
export type UpdateHome = z.infer<typeof updateHomeSchema>;
