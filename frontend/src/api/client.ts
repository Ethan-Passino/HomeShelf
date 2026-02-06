const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

type RequestOptions = RequestInit & { parseJson?: boolean };

export async function api<T>(path: string, options: RequestOptions = {}) {
  const { parseJson = true, headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    ...rest,
  });

  const contentType = response.headers.get('content-type');
  const isJson = parseJson && contentType?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = (data && data.message) || response.statusText;
    throw new Error(message || 'Request failed');
  }

  return data as T;
}

export { API_BASE };
