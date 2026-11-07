import { Mail, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pb-24 pt-32">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            Support
          </span>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
            Contact
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            A contact form is not connected to a backend yet, so the form has
            been removed instead of pretending to send messages.
          </p>
        </div>

        <div className="surface-card divide-y divide-card-border">
          <a
            href="mailto:support@droply.com"
            className="flex items-start gap-4 p-6 transition-colors hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Mail size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Email support
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                support@droply.com
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Include the email address on your Droply account and a clear
                description of the issue.
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <MessageSquare size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                What to include
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Account issues, product listing problems, and download access
                questions can all be handled by email. Checkout and payment
                support is not available yet because checkout is not connected.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Account security
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                We will never ask for your password or verification code. If you
                receive a message asking for either, do not respond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
