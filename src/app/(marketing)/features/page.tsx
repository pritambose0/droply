import Link from "next/link";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export default function FeaturesPage() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 animate-fade-in-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            Powerful Features
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The ultimate toolkit for <br className="hidden md:block"/>
            <span className="gradient-text">digital commerce</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From seamless product hosting to instant payouts and robust analytics, Droply gives you everything you need to scale your audience and revenue.
          </p>
          <div className="mt-10">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-all shadow-xl shadow-accent/25"
            >
              Start Building Now
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="space-y-32">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16 animate-fade-in-up delay-100">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Sell globally with Multi-Currency</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Don&apos;t limit your sales to a single market. Droply natively supports USD, EUR, GBP, and INR. We handle local currency conversion automatically at checkout, reducing buyer friction and boosting your global conversions.
              </p>
              <ul className="space-y-3 pt-4">
                {["Automatic exchange rate syncing", "Local payment methods", "No hidden cross-border fees"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-success"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 glass rounded-3xl p-8 border-accent/20 w-full min-h-[300px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/10 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Abstract Currency UI mockup */}
              <div className="relative z-10 w-full max-w-sm space-y-4">
                 <div className="p-4 rounded-xl border border-card-border bg-surface/80 flex justify-between items-center backdrop-blur-md">
                   <div className="flex gap-3 items-center"><span className="text-2xl">🇺🇸</span> <span className="font-medium text-foreground">USD</span></div>
                   <span className="font-bold text-foreground">$124.00</span>
                 </div>
                 <div className="p-4 rounded-xl border border-card-border bg-surface/80 flex justify-between items-center backdrop-blur-md transform translate-x-4">
                   <div className="flex gap-3 items-center"><span className="text-2xl">🇪🇺</span> <span className="font-medium text-foreground">EUR</span></div>
                   <span className="font-bold text-foreground">€118.50</span>
                 </div>
                 <div className="p-4 rounded-xl border border-card-border bg-surface/80 flex justify-between items-center backdrop-blur-md transform translate-x-8">
                   <div className="flex gap-3 items-center"><span className="text-2xl">🇮🇳</span> <span className="font-medium text-foreground">INR</span></div>
                   <span className="font-bold text-foreground">₹9,999.00</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 animate-fade-in-up delay-200">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Secure Delivery & Hosting</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Never worry about managing cloud storage buckets or unauthorized file sharing again. We securely host your eBooks, courses, and software files on our edge network. Only verified buyers get unique, securely signed download links.
              </p>
              <ul className="space-y-3 pt-4">
                {["Unlimited bandwidth", "Secure signed URLs (anti-piracy)", "Instant post-purchase delivery"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-purple-400"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 glass rounded-3xl p-8 border-purple-500/20 w-full min-h-[300px] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-accent/10 transition-opacity duration-500 group-hover:opacity-100" />
               <div className="relative z-10 w-full max-w-sm">
                 <div className="p-6 rounded-2xl bg-surface/90 border border-card-border shadow-2xl backdrop-blur-md">
                   <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mx-auto mb-4">
                     <CheckIcon />
                   </div>
                   <h3 className="text-center font-bold text-xl mb-2 text-foreground">Payment Successful!</h3>
                   <p className="text-center text-sm text-muted-foreground mb-6">Your encrypted download is ready.</p>
                   <button className="w-full py-3 rounded-xl bg-accent text-white font-medium flex justify-center items-center gap-2">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                     Download 4.2GB
                   </button>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Section 3 */}
          <div className="flex flex-col md:flex-row items-center gap-16 animate-fade-in-up delay-300">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Actionable Sales Analytics</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Know exactly where your money is coming from. Our beautiful creator dashboard gives you real-time insight into your product views, conversion rates, and revenue across all active currencies. No complex setup required.
              </p>
              <ul className="space-y-3 pt-4">
                {["Real-time transaction tracking", "Conversion rate optimization metrics", "Product-level performance breakdowns"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-blue-400"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 glass rounded-3xl p-8 border-blue-500/20 w-full min-h-[300px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-accent/10 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 w-full flex items-end justify-between px-6 h-40 gap-4">
                 <div className="w-1/6 bg-accent rounded-t-md animate-pulse h-[40%]" style={{ animationDelay: "0ms" }} />
                 <div className="w-1/6 bg-accent rounded-t-md animate-pulse h-[60%]" style={{ animationDelay: "100ms" }} />
                 <div className="w-1/6 bg-accent rounded-t-md animate-pulse h-[30%]" style={{ animationDelay: "200ms" }} />
                 <div className="w-1/6 bg-accent rounded-t-md animate-pulse h-[80%]" style={{ animationDelay: "300ms" }} />
                 <div className="w-1/6 bg-purple-400 rounded-t-md animate-pulse h-[100%]" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
