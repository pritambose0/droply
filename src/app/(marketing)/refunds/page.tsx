import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-4 block">
            Policies
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Refund Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent rules and guidelines for digital product purchases, refunds, and dispute resolution.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Last Updated: April 26, 2026</span>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in-up delay-100">
          <div className="space-y-10 text-muted-foreground leading-relaxed">

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start">
              <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-accent text-lg font-bold mb-2">Our Baseline Policy</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Because Droply is a marketplace for digital software and files, which are immediately accessible and downloadable upon purchase, our baseline policy is that <strong className="text-foreground">all sales are final</strong> unless specified otherwise by the creator.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">1. Nature of Digital Products</h2>
              <p>
                Unlike physical goods, digital products cannot be "returned." Once a file is downloaded or accessed, the buyer has received the full value of the purchase. Therefore, we do not offer refunds for "buyer's remorse" or situations where the buyer simply changed their mind.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">2. Eligible Refund Cases</h2>
              <p className="mb-4">
                We stand behind the quality of the marketplace. Refunds will be issued in the following situations:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Major Defects:</strong> The product is fundamentally broken, severely corrupted, or lacks critical features advertised on the product page, and the creator is unable to resolve the issue.</li>
                <li><strong className="text-foreground">Misrepresentation:</strong> The product delivered is significantly different from its description or previews.</li>
                <li><strong className="text-foreground">Creator Guarantee:</strong> The creator explicitly offers a money-back guarantee (e.g., "30-Day Money-Back") on their product page. We enforce these guarantees.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">3. Non-refundable Situations</h2>
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
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">4. Duplicate Purchases</h2>
              <p>
                If you accidentally purchase the same product twice, please contact support within 7 days. We will verify the duplicate transaction and issue a refund for the extra purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">5. Failed Deliveries</h2>
              <p>
                If a technical glitch on Droply's end prevents you from accessing or downloading your purchased product, and our support team cannot resolve the issue within 48 hours, you are entitled to a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">6. Fraudulent Transactions</h2>
              <p>
                If a purchase was made using your payment method fraudulently or without your authorization, please contact us and your bank immediately. We fully cooperate with payment providers to resolve unauthorized transactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">7. Request Timeline</h2>
              <p>
                All refund requests must be submitted within <strong className="text-foreground">14 days</strong> of the original purchase date. Requests made after this period will be evaluated solely at the discretion of the creator.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">8. How to Contact Support</h2>
              <p>
                To request a refund, please open a support ticket via our contact page. You must include your <strong className="text-foreground">Order ID</strong>, the email address used for the purchase, and a detailed explanation of why you are requesting a refund.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40">
            Contact Support
          </Link>
          <Link href="/terms" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface text-foreground font-medium hover:bg-surface-hover transition-colors border border-card-border">
            Read Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
