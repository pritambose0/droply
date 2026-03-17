export default function TermsPage() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto glass rounded-3xl p-10 md:p-16 animate-fade-in-up">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 block">
          Legal
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-foreground">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Effective Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Droply, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using Droply owned or operated services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Droply provides creators with a platform to list, market, sell, and distribute digital products to buyers. We act strictly as an infrastructure provider; we do not own the content uploaded by creators and are not liable for copyright infringement by users, though we maintain a strict DMCA takedown policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Prohibited Content</h2>
            <p className="mb-4">
              Creators may not upload materials that contain: explicit or restricted adult content, malware or harmful code, copyright-infringing assets without licensing, or any material deemed completely illegal by US/EU jurisdiction. Droply reserves the right to ban accounts flouting these rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Payouts & Fees</h2>
            <p className="mb-4">
              Droply currently operates on a promotional 0% transaction fee. However, standard Stripe/PayPal payment processing fees (e.g., 2.9% + 30c) apply, which are deducted before creator payouts. Users must configure payouts via their supported global processor.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
