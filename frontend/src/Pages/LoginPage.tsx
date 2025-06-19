import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {

const handleGoogleLogin = async () => {
  try {
    console.log("Google user:test");
    // TODO: redirect or update app state
  } catch (error) {
    console.error("Google login error:", error);
  }
};

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In to HomeShelf</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>

                <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
        </div>
        </div>

        <button
        type="button"
        onClick={handleGoogleLogin}
        className="mt-6 w-full py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
        <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
        />
        Sign in with Google
        </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
