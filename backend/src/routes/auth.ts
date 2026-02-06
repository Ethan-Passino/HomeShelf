import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FastifyInstance, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import { env } from "../config/env.js";
import { connectDb } from "../lib/db.js";
import {
  loginSchema,
  registerSchema,
  LoginPayload,
  RegisterPayload,
} from "../schemas/auth.js";

const TOKEN_COOKIE = "hsession";
const SESSION_DAYS = 7;

function toUserResponse(doc: any) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id?.toString(), ...rest };
}

function signSession(userId: string) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: `${SESSION_DAYS}d`,
  });
}

function cookieOptions() {
  const secure = process.env.NODE_ENV === "production";
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

async function requireUser(app: FastifyInstance, req: FastifyRequest) {
  const token = req.cookies?.[TOKEN_COOKIE];
  if (!token) {
    throw app.httpErrors.unauthorized("Missing session");
  }

  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
  } catch {
    throw app.httpErrors.unauthorized("Invalid session");
  }

  const db = await connectDb();
  const users = db.collection("users");
  const user = await users.findOne({ _id: new ObjectId(payload.sub) });
  if (!user) {
    throw app.httpErrors.unauthorized("User not found");
  }
  return user;
}

export async function authRoutes(app: FastifyInstance) {
  const db = await connectDb();
  const users = db.collection("users");
  const credentials = db.collection("credentials");

  await users.createIndex({ email: 1 }, { unique: true });
  await credentials.createIndex({ userId: 1, provider: 1 }, { unique: true });

  app.post("/api/auth/register", async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.badRequest("Invalid payload");
    }

    const { email, password, displayName } = parsed.data as RegisterPayload;
    const normalizedEmail = email.toLowerCase();

    const existing = await users.findOne({ email: normalizedEmail });
    if (existing) {
      return reply.conflict("Email already in use");
    }

    const now = new Date().toISOString();
    const userDoc = {
      _id: new ObjectId(),
      email: normalizedEmail,
      displayName,
      homes: [],
      createdAt: now,
      updatedAt: now,
    };

    const passwordHash = await bcrypt.hash(password, 12);
    const credDoc = {
      userId: userDoc._id.toString(),
      provider: "password",
      passwordHash,
      emailVerified: false,
      failedLoginAttempts: 0,
      createdAt: now,
      updatedAt: now,
    };

    await users.insertOne(userDoc);
    await credentials.insertOne(credDoc);

    const token = signSession(userDoc._id.toString());
    reply.setCookie(TOKEN_COOKIE, token, cookieOptions());

    const userResponse = toUserResponse(userDoc);
    return reply.code(201).send({ user: userResponse });
  });

  app.post("/api/auth/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.badRequest("Invalid payload");
    }
    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const user = await users.findOne({ email: normalizedEmail });
    if (!user) {
      return reply.unauthorized("Invalid email or password");
    }

    const cred = await credentials.findOne({
      userId: user._id.toString(),
      provider: "password",
    });
    if (!cred || !cred.passwordHash) {
      return reply.unauthorized("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, cred.passwordHash);
    if (!valid) {
      return reply.unauthorized("Invalid email or password");
    }

    const token = signSession(user._id.toString());
    reply.setCookie(TOKEN_COOKIE, token, cookieOptions());

    return reply.send({ user: toUserResponse(user) });
  });

  app.get("/api/auth/me", async (request, reply) => {
    const user = await requireUser(app, request);
    return reply.send({ user: toUserResponse(user) });
  });

  app.post("/api/auth/logout", async (_request, reply) => {
    reply.clearCookie(TOKEN_COOKIE, cookieOptions());
    return reply.send({ ok: true });
  });
}
