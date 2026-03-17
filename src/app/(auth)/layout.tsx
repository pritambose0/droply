import Link from "next/link";

function DroplyLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="authLogo" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path
        d="M16 2C16 2 6 14 6 20a10 10 0 0020 0C26 14 16 2 16 2z"
        fill="url(#authLogo)"
        opacity="0.9"
      />
      <path
        d="M16 6C16 6 10 14 10 18a6 6 0 0012 0C22 14 16 6 16 6z"
        fill="white"
        opacity="0.2"
      />
    </svg>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background noise grid-pattern flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle modern ambient lights */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 group"
          id="auth-logo"
        >
          <DroplyLogo />
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            Droply
          </span>
        </Link>

        {/* Card wrapper */}
        <div className="glass rounded-3xl p-8 shadow-2xl animate-fade-in-up">
          {children}
        </div>
      </div>
    </div>
  );
}
