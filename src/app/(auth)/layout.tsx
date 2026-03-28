import Link from "next/link";
import { DroplyLogo } from "@/components/ui/Logo";

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
