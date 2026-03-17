export default function PrivacyPage() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto glass rounded-3xl p-10 md:p-16 animate-fade-in-up">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 block">
          Legal
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-foreground">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Effective Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              When you use Droply, we collect information you provide directly to us (such as when you create or modify your account, contact customer support, or otherwise communicate with us). 
              This information may include your name, email address, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Sharing of Information</h2>
            <p className="mb-4">
              We do not share your personal information with third parties outside of our core services. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. Our platform employs secure data networks protected by industry-standard firewall and password protection systems.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Digital Product Delivery</h2>
            <p className="mb-4">
              URLs for digital products are protected and only generated as secure signatures upon successful purchase verification. Our servers track download analytics to ensure successful delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@droply.com" className="text-accent underline">privacy@droply.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
