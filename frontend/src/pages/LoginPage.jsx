export default function LoginPage() {
    const handleLogin = () => {
      window.location.href = "http://localhost:8000/auth/google"; // backend login route
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Mini CRM</h1>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }