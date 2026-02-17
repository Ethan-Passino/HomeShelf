// IMPORTANT: Do NOT import this schema or its types into the frontend. Backend-only credentials.
// Guard: if this module ever runs in a browser bundle, fail fast.
if (typeof window !== "undefined") {
  throw new Error("auth.ts is backend-only; do not import in frontend");
}

import { z } from "zod";

export const providerSchema = z.enum(["password", "google", "apple"]);

export const credentialsSchema = z.object({
  userId: z.string(),
  provider: providerSchema.default("password"),
  passwordHash: z.string().optional(), // only for provider=password
  emailVerified: z.boolean().default(false),
  passwordUpdatedAt: z.string().optional(),
  resetToken: z.string().optional(),
  resetTokenExpiresAt: z.string().optional(),
  failedLoginAttempts: z.number().int().nonnegative().default(0),
  lockedUntil: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  displayName: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const oauthLoginSchema = z.object({
  provider: z.literal("google"),
  credential: z.string(),
});

export type Credential = z.infer<typeof credentialsSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type OAuthLoginPayload = z.infer<typeof oauthLoginSchema>;
