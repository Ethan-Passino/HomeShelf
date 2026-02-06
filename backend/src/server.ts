import { buildApp } from "./app.js";
import { env } from "./config/env.js";

async function start() {
  const app = buildApp();
  try {
    await app.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    app.log.info(`Server listening on http://0.0.0.0:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
