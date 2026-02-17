import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, LOGOUT_GUARD_KEY } from '../auth/AuthProvider';
import { getGoogleClient } from '../auth/googleClient';
import { googleLogin } from '../api/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setGoogleLoading(true);
      try {
        const google = await getGoogleClient();
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: async (resp: any) => {
            if (!resp.credential) return;
            try {
              await googleLogin(resp.credential);
              localStorage.removeItem(LOGOUT_GUARD_KEY);
              await refresh();
              navigate('/dashboard');
            } catch (err) {
              const message =
                err instanceof Error ? err.message : 'Google login failed';
              if (!cancelled) setError(message);
            }
          },
        });

        if (googleButtonRef.current) {
          google.accounts.id.renderButton(googleButtonRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            width: '100%',
            text: 'continue_with',
          });
        }

        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // silently ignore; user can still click the button
          }
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Google login failed';
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setGoogleLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      const g = (window as any).google;
      if (g?.accounts?.id) g.accounts.id.cancel();
    };
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({ email, password });
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 relative">
        <Link
          to="/"
          className="absolute top-4 left-4 text-sm text-blue-600 hover:underline"
        >
          {'<-'} Back to Home
        </Link>
        <br />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <div className="mt-6">
            <div
              ref={googleButtonRef}
              className="flex justify-center"
              aria-label="Sign in with Google"
            />
            {googleLoading && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Loading Google sign-in…
              </p>
            )}
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
