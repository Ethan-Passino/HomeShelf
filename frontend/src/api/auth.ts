import { api } from './client';

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
};

export async function register(payload: {
  email: string;
  password: string;
  displayName: string;
}) {
  return api<{ user: AuthUser }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }) {
  return api<{ user: AuthUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function currentUser() {
  return api<{ user: AuthUser }>('/api/auth/me');
}

export async function logout() {
  return api<{ ok: boolean }>('/api/auth/logout', { method: 'POST' });
}

export async function googleLogin(credential: string) {
  return api<{ user: AuthUser }>('/api/auth/oauth/google', {
    method: 'POST',
    body: JSON.stringify({ provider: 'google', credential }),
  });
}
