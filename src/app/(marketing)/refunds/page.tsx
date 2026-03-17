export default function RefundsPage() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto glass rounded-3xl p-10 md:p-16 animate-fade-in-up">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 block">
          Legal
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-foreground">
          Refund Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Effective Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Digital Goods Standard</h2>
            <p className="mb-4">
              Because Droply acts as a marketplace to sell digital software and files, which are immediately accessible and downloadable upon purchase, our baseline policy is that <b>all sales are final</b>. 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Creator-Level Overrides</h2>
            <p className="mb-4">
              Individual Creators may choose to offer their own explicit money-back guarantees (e.g. "30-Day Money Back"). If a Creator clearly promises a refund publicly on their product page, Droply support will enforce that promise upon valid buyer dispute.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Exceptions for Fraud or Defect</h2>
            <p className="mb-4">
              Droply will step in to issue direct refunds under the following circumstances, bypassing the final sale clause:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The file delivered is catastrophically corrupted and unopenable.</li>
              <li>The transaction was verified as fraudulent or unauthorized by the credit card holder.</li>
              <li>The product fundamentally maliciously misrepresents what is being sold (e.g., selling a framework template but delivering a blank text file).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Contacting Support</h2>
            <p className="mb-4">
              For any refund inquiries, please use our Contact page to open a direct ticket. Make sure to provide your Order ID.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
