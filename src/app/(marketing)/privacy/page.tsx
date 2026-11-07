export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
          Legal
        </span>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Effective date:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="surface-card space-y-8 p-8 text-sm leading-relaxed text-muted-foreground md:p-10">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              1. Information we collect
            </h2>
            <p>
              When you create an account, we collect the information you provide
              directly: your name, email address, and password. If you create
              product listings, we store the product details, thumbnail, and
              delivery file you upload.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              2. How information is used
            </h2>
            <p>
              Account details are used to authenticate you and to send
              verification and password-reset emails. Product details are used to
              display listings in the marketplace and to fulfill orders.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              3. Sharing of information
            </h2>
            <p>
              We use service providers for authentication, database hosting, file
              storage, and transactional email. We do not sell your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              4. Security
            </h2>
            <p>
              We take reasonable measures to protect account and product data.
              Passwords are stored as hashes, and product file URLs are not
              returned in public product responses.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              5. Digital product delivery
            </h2>
            <p>
              Download access is checked on the server against order and payment
              status. Only paid orders can request a product file.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              6. Contact
            </h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a
                href="mailto:privacy@droply.com"
                className="text-accent underline-offset-4 hover:underline"
              >
                privacy@droply.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
