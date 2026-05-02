import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-4 block">
            Legal Information
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Rules and conditions for using the Droply marketplace.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Last Updated: April 26, 2026</span>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in-up delay-100">
          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Droply, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">2. User Accounts</h2>
              <p>
                To access certain features of the platform, you must register for an account. You agree to provide accurate information and keep it up to date. You are solely responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">3. Creator Responsibilities</h2>
              <p className="mb-4">
                As a creator on Droply, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You own or have the necessary licenses for all digital products you upload.</li>
                <li>Your products do not infringe on the intellectual property rights of third parties.</li>
                <li>You will accurately describe your products and provide necessary support to buyers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">4. Buyer Responsibilities</h2>
              <p>
                Buyers are expected to use purchased digital products in accordance with the specific license provided by the creator. Redistribution, reselling, or unauthorized sharing of purchased products is strictly prohibited unless explicitly allowed by the creator's license.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">5. Payments & Fees</h2>
              <p>
                Droply facilitates payments through third-party processors (e.g., Stripe). Creators are subject to standard payment processing fees. Droply reserves the right to introduce or change platform fees with prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
              <p>
                The platform, including its original content, features, and functionality, is owned by Droply and protected by international copyright, trademark, and other intellectual property laws. Creators retain full ownership of the digital products they sell.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">7. Prohibited Content</h2>
              <p>
                You may not upload, distribute, or sell any content that is illegal, abusive, harassing, harmful to minors, or otherwise violates any laws. Droply maintains a zero-tolerance policy for malicious software, viruses, or fraudulent products.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">8. Account Suspension</h2>
              <p>
                Droply reserves the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or repeatedly receive valid copyright infringement claims, without prior notice or liability.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall Droply, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes. Your continued use of the platform following the posting of any changes constitutes acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:support@droply.com" className="text-accent hover:underline">support@droply.com</a>.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in-up delay-200">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface text-sm font-medium hover:bg-surface-hover transition-colors border border-card-border">
            Have a question? Contact Support <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
