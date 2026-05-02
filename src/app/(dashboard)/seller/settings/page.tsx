"use client";

import { useState } from "react";
import { User, Globe, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SellerSettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"profile">("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Profile State
  const [name, setName] = useState(session?.user?.name || "John Doe");
  const [bio, setBio] = useState("Digital creator & designer based in San Francisco.");


  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Creator Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your creator profile, shop preferences, and payments.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            <button
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap bg-accent/10 text-accent border border-accent/20`}
            >
              <User size={18} /> Public Profile
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass rounded-2xl p-6 lg:p-10 animate-fade-in text-left">

          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">Creator Profile</h2>
                <p className="text-sm text-muted-foreground">This information will be visible to potential buyers.</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-accent to-purple-400 flex flex-col items-center justify-center text-2xl font-bold text-white shadow-xl shrink-0">
                  {name[0]?.toUpperCase() || 'U'}
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent/90 transition-all shadow-md">
                      Upload New
                    </button>
                    <button className="px-4 py-2 bg-surface text-foreground text-xs font-semibold rounded-lg hover:bg-surface-hover border border-card-border transition-all">
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground italic">SVG, PNG or JPG max 2MB.</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Website / Portfolio</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="url"
                        placeholder="https://yourportfolio.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Creator Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all resize-none"
                    placeholder="Tell your buyers about yourself..."
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-card-border pt-8 mt-4">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-8 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 flex items-center gap-2"
                >
                  {isLoading && <Loader2 size={18} className="animate-spin" />}
                  Save Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
