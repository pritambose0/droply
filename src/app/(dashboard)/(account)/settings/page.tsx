"use client";

import { useState } from "react";

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security">("profile");

  // Profile State
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("Digital creator & designer based in San Francisco.");

  // Notification State
  const [emailNotifs, setEmailNotifs] = useState({
    orderUpdates: true,
    promotions: false,
    newProducts: true,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === "profile"
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent"
                }`}
            >
              <UserIcon /> Profile
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === "notifications"
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent"
                }`}
            >
              <BellIcon /> Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === "security"
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-transparent"
                }`}
            >
              <ShieldIcon /> Security
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass rounded-2xl p-6 md:p-8 animate-fade-in text-left">

          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Public Profile</h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-accent to-purple-400 flex flex-col items-center justify-center text-xl font-bold text-white shadow-xl shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                  JD
                </div>
                <div>
                  <button className="px-4 py-2 bg-surface text-sm font-medium rounded-xl hover:bg-surface-hover transition-colors text-foreground mb-2">
                    Change Avatar
                  </button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
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
                    className="w-full px-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all resize-none"
                  />
                  <p className="text-xs text-muted-foreground">Brief description for your profile.</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="px-6 py-2.5 bg-linear-to-r from-accent to-purple-400 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-accent/20">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose what type of emails you want to receive.</p>

              <div className="space-y-4">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-card-border bg-surface">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Order Updates</h3>
                    <p className="text-xs text-muted-foreground">Receive emails when your orders are processed.</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifs({ ...emailNotifs, orderUpdates: !emailNotifs.orderUpdates })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifs.orderUpdates ? 'bg-accent' : 'bg-surface-hover'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${emailNotifs.orderUpdates ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-card-border bg-surface">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Promotions</h3>
                    <p className="text-xs text-muted-foreground">Receive exclusive offers and promotional news.</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifs({ ...emailNotifs, promotions: !emailNotifs.promotions })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifs.promotions ? 'bg-accent' : 'bg-surface-hover'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${emailNotifs.promotions ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                {/* Toggle 3 */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-card-border bg-surface">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">New Products</h3>
                    <p className="text-xs text-muted-foreground">Get notified when creators you follow post new items.</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifs({ ...emailNotifs, newProducts: !emailNotifs.newProducts })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifs.newProducts ? 'bg-accent' : 'bg-surface-hover'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${emailNotifs.newProducts ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Change Password</h2>
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-input-bg border border-input-border text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-input-focus transition-all" />
                  </div>
                  <button className="px-6 py-2.5 bg-surface text-foreground text-sm font-medium rounded-xl hover:bg-surface-hover transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-card-border" />

              <div>
                <h2 className="text-lg font-semibold text-danger mb-2">Danger Zone</h2>
                <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-6 py-2.5 bg-danger/10 text-danger border border-danger/20 text-sm font-medium rounded-xl hover:bg-danger hover:text-white transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
