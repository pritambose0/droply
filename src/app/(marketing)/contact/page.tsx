"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally connect to API here
    setSubmitted(true);
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto glass rounded-3xl p-8 md:p-12 animate-fade-in-up">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            Support
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
            Contact <span className="gradient-text">Sales & Support</span>
          </h1>
          <p className="text-muted-foreground">
            Have a question about enterprise volume, or need help with a purchase? Fill out the form below.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent</h2>
            <p className="text-muted-foreground">We typically respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inquiry Type</label>
              <select className="w-full px-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer">
                <option>General Support</option>
                <option>Enterprise Sales (&gt;100k volume)</option>
                <option>Report Abuse</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
              <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none" />
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/20">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
