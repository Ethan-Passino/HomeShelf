import { z } from "zod";

const homeMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(["owner", "admin", "member"]).default("member"),
  status: z.enum(["invited", "active"]).default("active"),
  invitedBy: z.string().optional(),
});

export const homeSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  createdBy: z.string(),
  members: z.array(homeMemberSchema).default([]),
});

export const createHomeSchema = homeSchema
  .omit({ id: true, members: true })
  .extend({
    members: z.array(homeMemberSchema).default([]),
  });

export const updateHomeSchema = homeSchema.partial().required({ id: true });

export type Home = z.infer<typeof homeSchema>;
export type CreateHome = z.infer<typeof createHomeSchema>;
export type UpdateHome = z.infer<typeof updateHomeSchema>;
export type HomeMember = z.infer<typeof homeMemberSchema>;
