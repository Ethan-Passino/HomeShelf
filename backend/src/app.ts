import Fastify from "fastify";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/auth.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(sensible);
  app.register(helmet);
  app.register(cors, { origin: true, credentials: true });
  app.register(cookie);
  app.register(authRoutes);

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}

export type AppInstance = ReturnType<typeof buildApp>;
