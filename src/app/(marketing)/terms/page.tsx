import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            Legal
          </span>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-base text-muted-foreground">
            Rules and conditions for using the Droply marketplace.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: April 26, 2026
          </p>
        </div>

        <div className="surface-card p-8 md:p-10">
          <div className="space-y-9 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Droply, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">2. User Accounts</h2>
              <p>
                To access certain features of the platform, you must register for an account. You agree to provide accurate information and keep it up to date. You are solely responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">3. Creator Responsibilities</h2>
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
              <h2 className="mb-3 text-lg font-semibold text-foreground">4. Buyer Responsibilities</h2>
              <p>
                Buyers are expected to use purchased digital products in accordance with the specific license provided by the creator. Redistribution, reselling, or unauthorized sharing of purchased products is strictly prohibited unless explicitly allowed by the creator&apos;s license.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">5. Payments and fees</h2>
              <p>
                Checkout and payment processing are not connected yet. No
                purchases can currently be completed and no platform or
                transaction fees are being charged. These terms will be updated
                before payments are enabled.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">6. Intellectual Property</h2>
              <p>
                The platform, including its original content, features, and functionality, is owned by Droply and protected by international copyright, trademark, and other intellectual property laws. Creators retain full ownership of the digital products they sell.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">7. Prohibited Content</h2>
              <p>
                You may not upload, distribute, or sell any content that is illegal, abusive, harassing, harmful to minors, or otherwise violates any laws. Droply maintains a zero-tolerance policy for malicious software, viruses, or fraudulent products.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">8. Account Suspension</h2>
              <p>
                Droply reserves the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or repeatedly receive valid copyright infringement claims, without prior notice or liability.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">9. Limitation of Liability</h2>
              <p>
                In no event shall Droply, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes. Your continued use of the platform following the posting of any changes constitutes acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:support@droply.com" className="text-accent hover:underline">support@droply.com</a>.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            Contact support <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
