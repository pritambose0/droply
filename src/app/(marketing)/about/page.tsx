import { ShieldCheck, Package, Download, Zap, BarChart3, Globe } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className={`group glass rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 opacity-0 animate-fade-in-up ${delay}`}
    >
      <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            About Droply
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Empowering creators to build <br />
            <span className="gradient-text">sustainable businesses</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Droply is the all-in-one platform for digital creators. We provide the tools you need to list, sell, and distribute your digital products directly to your audience, without the middlemen.
          </p>
        </div>

        {/* ── Features List (Moved from homepage) ── */}
        <div className="mb-24">
          <div className="text-center mb-12 animate-fade-in-up delay-100">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Everything you need to <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with modern architecture to give creators and buyers the best experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={ShieldCheck}
              title="Secure Authentication"
              description="JWT-based auth with email verification, OTP codes, rate limiting, and password reset — all production-hardened."
              delay="delay-100"
            />
            <FeatureCard
              icon={Package}
              title="Product Management"
              description="Full CRUD with search, sorting, pagination, draft/published status, tag support, and multi-currency pricing."
              delay="delay-200"
            />
            <FeatureCard
              icon={Download}
              title="Secure Downloads"
              description="File URLs are hidden from public APIs. Only paid buyers get download access after successful payment."
              delay="delay-300"
            />
            <FeatureCard
              icon={Zap}
              title="Instant Order Processing"
              description="Automatic price capture, duplicate prevention, self-purchase blocking, and real-time status tracking."
              delay="delay-100"
            />
            <FeatureCard
              icon={BarChart3}
              title="Sales Analytics"
              description="Track sales per product, view order history, and monitor payment statuses from your dashboard."
              delay="delay-200"
            />
            <FeatureCard
              icon={Globe}
              title="Multi-Currency"
              description="Accept payments in USD, EUR, GBP, and INR. Set your price in any supported currency."
              delay="delay-300"
            />
          </div>
        </div>

        <div className="glass rounded-3xl p-10 md:p-16 text-center animate-fade-in-up delay-400">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We believe that anyone with an idea or a digital skill should have the straightforward infrastructure to monetize it. Whether it is an eBook, a code snippet, design assets, or an online course, our goal is to eliminate setup friction so creators can focus entirely on creating.
          </p>
        </div>
      </div>
    </div>
  );
}
