export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className="min-h-screen relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent)]" />

      <div className="w-full max-w-2xl px-6">
        <div className="rounded-3xl bg-white/95 text-slate-900 shadow-[0_10px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/5 p-10">
          <div className="flex items-center justify-center mb-6">
            <div className="h-10 w-10 rounded-md bg-blue-600/15 text-blue-600 font-bold grid place-items-center">MC</div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-center">Welcome to MiniCRM</h1>
          <p className="text-slate-600 text-center mt-2">Manage customers and campaigns with clarity.</p>

          <div className="mt-8">
            <div className="relative text-center text-slate-400 text-xs tracking-wider">
              <span className="inline-block bg-white px-2 relative z-10">CONTINUE WITH</span>
              <span className="absolute left-0 right-0 top-1/2 h-px bg-slate-200 -z-0" />
            </div>
            <button
              onClick={handleLogin}
              className="mt-4 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-black text-white px-4 py-3 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.6 1.4l2.5-2.5C16.9 3.6 14.7 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12s4.2 9.3 9.3 9.3c5.4 0 9-3.8 9-9.2 0-.6-.1-1-.2-1.5H12z"/><path fill="#34A853" d="M3.8 7.3l3 2.2C8.1 6.5 9.9 5.4 12 5.4c1.8 0 3 .8 3.6 1.4l2.5-2.5C16.9 3.6 14.7 2.7 12 2.7 8.4 2.7 5.3 3.6 3.8 7.3z"/><path fill="#4A90E2" d="M12 21.3c2.7 0 4.9-.9 6.6-2.5l-3-2.5c-.9.6-2.1 1-3.6 1-3.6 0-4.9-2.4-5.1-3.6H3.9c-.7 1.5-1.2 3.1-1.2 5.1 0 1.2.1 2.4.5 3.5 0 0 3 1 8.8 1z"/><path fill="#FBBC05" d="M21.3 12.1c0-.5-.1-.9-.2-1.4H12v3.6h5.1c-.3 1.8-1.5 3.6-5.1 3.6-1.7 0-3.2-.7-4.2-1.9l-3 2.3c1.6 2.7 4.5 4.6 8.1 4.6 5.4 0 9-3.8 9-9.2z"/></svg>
              </span>
              <span className="font-medium">Continue with Google</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-6">
            By continuing, you agree to our <span className="text-slate-700">Terms</span> and <span className="text-slate-700">Privacy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}