"use client";

import { useState } from "react";
import { User, Bell, Shield, Check, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function BuyerSettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"profile">("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Profile State
  const [name, setName] = useState(session?.user?.name || "John Doe");
  const [email, setEmail] = useState(session?.user?.email || "johndoe@example.com");

  // Notification State
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newProducts: true,
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Buyer Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal account and shopping preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap bg-accent/10 text-accent border border-accent/20`}
            >
              <User size={18} /> Profile
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass rounded-2xl p-6 md:p-8 animate-fade-in text-left min-h-[400px]">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-accent to-purple-400 flex flex-col items-center justify-center text-xl font-bold text-white shadow-xl shrink-0">
                  {name[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <button className="px-4 py-2 bg-surface text-sm font-medium rounded-xl hover:bg-surface-hover transition-colors text-foreground mb-2">
                    Change Photo
                  </button>
                  <p className="text-xs text-muted-foreground">Recommended: 400x400px JPG/PNG</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all shadow-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
