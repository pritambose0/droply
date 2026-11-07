import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            Policies
          </span>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
            Refund Policy
          </h1>
          <p className="text-base text-muted-foreground">
            Rules for digital product purchases, refunds, and disputes.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: April 26, 2026
          </p>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning/20 bg-warning/5 p-5">
          <HelpCircle className="mt-0.5 shrink-0 text-warning" size={18} />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Checkout is not connected yet, so no purchases or refunds can occur
            right now. This policy applies once payments are enabled.
          </p>
        </div>

        <div className="surface-card p-8 md:p-10">
          <div className="space-y-9 text-sm leading-relaxed text-muted-foreground">

            <div className="flex flex-col items-start gap-4 rounded-xl border border-accent/20 bg-accent/5 p-5 md:flex-row">
              <HelpCircle className="mt-1 shrink-0 text-accent" size={20} />
              <div>
                <h3 className="mb-2 text-base font-semibold text-foreground">Our baseline policy</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Because Droply is a marketplace for digital files, which are
                  accessible after purchase, our baseline policy is that{" "}
                  <strong className="text-foreground">all sales are final</strong>{" "}
                  unless specified otherwise by the creator.
                </p>
              </div>
            </div>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">1. Nature of Digital Products</h2>
              <p>
                Unlike physical goods, digital products cannot be &quot;returned.&quot; Once a file is downloaded or accessed, the buyer has received the full value of the purchase. Therefore, we do not offer refunds for &quot;buyer&apos;s remorse&quot; or situations where the buyer simply changed their mind.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">2. Eligible Refund Cases</h2>
              <p className="mb-4">
                We stand behind the quality of the marketplace. Refunds will be issued in the following situations:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Major Defects:</strong> The product is fundamentally broken, severely corrupted, or lacks critical features advertised on the product page, and the creator is unable to resolve the issue.</li>
                <li><strong className="text-foreground">Misrepresentation:</strong> The product delivered is significantly different from its description or previews.</li>
                <li><strong className="text-foreground">Creator Guarantee:</strong> The creator explicitly offers a money-back guarantee (e.g., &quot;30-Day Money-Back&quot;) on their product page. We enforce these guarantees.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">3. Non-refundable Situations</h2>
              <p className="mb-4">
                Refunds will <strong className="text-foreground">not</strong> be granted in the following scenarios:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You no longer need the product.</li>
                <li>You found another product you prefer.</li>
                <li>You do not possess the necessary software or skills to use the product, despite the requirements being clearly stated on the product page.</li>
                <li>You bought the item by mistake.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">4. Duplicate Purchases</h2>
              <p>
                If you accidentally purchase the same product twice, please contact support within 7 days. We will verify the duplicate transaction and issue a refund for the extra purchase.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">5. Failed Deliveries</h2>
              <p>
                If a technical glitch on Droply&apos;s end prevents you from accessing or downloading your purchased product, and our support team cannot resolve the issue within 48 hours, you are entitled to a full refund.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">6. Fraudulent Transactions</h2>
              <p>
                If a purchase was made using your payment method fraudulently or without your authorization, please contact us and your bank immediately. We fully cooperate with payment providers to resolve unauthorized transactions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">7. Request Timeline</h2>
              <p>
                All refund requests must be submitted within <strong className="text-foreground">14 days</strong> of the original purchase date. Requests made after this period will be evaluated solely at the discretion of the creator.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">8. How to contact support</h2>
              <p>
                Once checkout is enabled, refund requests can be sent by email
                to{" "}
                <a
                  href="mailto:support@droply.com"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  support@droply.com
                </a>
                . Include your order ID, the email address used for the
                purchase, and a clear explanation of the request.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Contact support
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            Read terms of service
          </Link>
        </div>
      </div>
    </div>
  );
}
