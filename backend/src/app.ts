import Fastify from "fastify";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { env } from "./config/env.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(sensible);
  app.register(helmet);
  app.register(cors, { origin: true });

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}

export type AppInstance = ReturnType<typeof buildApp>;
