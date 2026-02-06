import { z } from "zod";

const membershipSchema = z.object({
  homeId: z.string(),
  role: z.enum(["owner", "admin", "member"]).default("member"),
  status: z.enum(["invited", "active"]).default("active"),
  invitedBy: z.string().optional(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  homes: z.array(membershipSchema).default([]),
});

export const createUserSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    createdAt: z.string().default(() => new Date().toISOString()),
    updatedAt: z.string().default(() => new Date().toISOString()),
  });

export const updateUserSchema = userSchema.partial().required({ id: true });

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserHomeMembership = z.infer<typeof membershipSchema>;
