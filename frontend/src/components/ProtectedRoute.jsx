import { useEffect, useState } from "react";
import { tokenManager } from "../utils/tokenManager";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = tokenManager.getToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Please login to continue</div>
          <button
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}/auth/google`;
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return children;
}
