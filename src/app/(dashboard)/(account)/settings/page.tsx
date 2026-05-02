"use client";

import { useState } from "react";
import { Camera, Shield, Bell, Moon, Sun, Monitor, Globe, Download, Trash2, Smartphone, Mail, GitBranchPlusIcon, Key } from "lucide-react";

// --- Reusable UI Components ---

function SettingsSectionCard({ title, description, children, icon: Icon }: { title: string, description?: string, children: React.ReactNode, icon?: any }) {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-card-border/60">
      <div className="p-6 md:p-8 border-b border-card-border/40">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-surface border border-card-border/50 text-accent shrink-0">
              <Icon size={20} />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }: { title: string, description?: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${checked ? 'bg-accent' : 'bg-surface border-card-border/80'}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}

function InputField({ label, type = "text", placeholder, defaultValue, readOnly }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`w-full px-4 py-2.5 rounded-xl border border-card-border bg-surface text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

function AvatarUploader() {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div className="relative w-24 h-24 rounded-full bg-surface border border-card-border overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Camera className="text-white" size={24} />
        </div>
        {/* Mock Image Placeholder */}
        <div className="w-full h-full bg-linear-to-br from-accent/40 to-purple-500/40" />
      </div>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Avatar</span>
    </div>
  );
}

function DangerZoneCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-red-500/20">
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Privacy & Data</h2>
          <p className="text-sm text-muted-foreground">Manage your personal data and account status.</p>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-card-border bg-surface/50">
          <div>
            <h3 className="text-sm font-medium text-foreground">Export Data</h3>
            <p className="text-xs text-muted-foreground mt-1">Download a copy of all your data associated with this account.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-card-border bg-surface text-sm font-medium hover:bg-surface-hover transition-colors">
            <Download size={16} />
            Request Export
          </button>
        </div>

        <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5">
          <h3 className="text-sm font-medium text-red-400 mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500 hover:text-white transition-colors border border-red-500/20">
            <Trash2 size={16} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function GlobalSettingsPage() {
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);
  const [theme, setTheme] = useState('system');

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up">

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Account Settings</h1>
          <p className="text-lg text-muted-foreground">Manage your personal account preferences and security.</p>
        </div>

        <div className="space-y-8">

          {/* Profile Basics */}
          <SettingsSectionCard
            title="Profile Basics"
            description="Update your personal details and public profile."
            icon={Globe}
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <AvatarUploader />

              <div className="flex-1 space-y-5 w-full">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField label="Full Name" defaultValue="Alex Developer" />
                  <InputField label="Username" defaultValue="@alexdev" />
                </div>
                <InputField label="Email Address" type="email" defaultValue="alex@example.com" readOnly />
                <div className="pt-2 flex justify-end">
                  <button className="px-6 py-2.5 rounded-xl bg-linear-to-r from-accent to-purple-400 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-accent/20">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </SettingsSectionCard>

          {/* Security */}
          <SettingsSectionCard
            title="Security & Authentication"
            description="Keep your account secure and monitor active sessions."
            icon={Shield}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-card-border/50 pb-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground">Password</h3>
                  <p className="text-sm text-muted-foreground mt-1">Change your password regularly to keep your account secure.</p>
                </div>
                <button className="px-4 py-2 rounded-lg border border-card-border bg-surface text-sm font-medium hover:bg-surface-hover transition-colors">
                  Change Password
                </button>
              </div>

              <ToggleRow
                title="Two-Factor Authentication (2FA)"
                description="Add an extra layer of security to your account."
                checked={tfaEnabled}
                onChange={setTfaEnabled}
              />

              <div className="pt-4">
                <h3 className="text-sm font-medium text-foreground mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-card-border/50 bg-surface/50">
                    <div className="flex items-center gap-4">
                      <Monitor className="text-muted-foreground" size={20} />
                      <div>
                        <p className="text-sm font-medium text-foreground">MacBook Pro 16"</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA • Current Session</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-card-border/50 bg-surface/50">
                    <div className="flex items-center gap-4">
                      <Smartphone className="text-muted-foreground" size={20} />
                      <div>
                        <p className="text-sm font-medium text-foreground">iPhone 14 Pro</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-muted-foreground hover:text-red-400 transition-colors">Log out</button>
                  </div>
                </div>
              </div>
            </div>
          </SettingsSectionCard>

          {/* Connected Accounts */}
          <SettingsSectionCard
            title="Connected Accounts"
            description="Manage your linked social accounts for faster login."
            icon={Key}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-card-border/50">
                <div className="flex items-center gap-3">
                  <Mail className="text-muted-foreground" size={20} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Google</p>
                    <p className="text-xs text-muted-foreground">Connected as alex@example.com</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-card-border">Disconnect</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-card-border/50">
                <div className="flex items-center gap-3">
                  <GitBranchPlusIcon className="text-muted-foreground" size={20} />
                  <div>
                    <p className="text-sm font-medium text-foreground">GitHub</p>
                    <p className="text-xs text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-foreground bg-surface hover:bg-surface-hover transition-colors px-3 py-1.5 rounded-lg border border-card-border">Connect</button>
              </div>
            </div>
          </SettingsSectionCard>

          {/* Preferences */}
          <SettingsSectionCard
            title="Preferences"
            description="Customize your Droply experience."
            icon={Bell}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => setTheme('light')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${theme === 'light' ? 'border-accent bg-accent/5' : 'border-card-border bg-surface'} hover:border-accent/50 transition-colors`}>
                    <Sun size={20} className={theme === 'light' ? 'text-accent' : 'text-muted-foreground'} />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button onClick={() => setTheme('dark')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${theme === 'dark' ? 'border-accent bg-accent/5' : 'border-card-border bg-surface'} hover:border-accent/50 transition-colors`}>
                    <Moon size={20} className={theme === 'dark' ? 'text-accent' : 'text-muted-foreground'} />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button onClick={() => setTheme('system')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${theme === 'system' ? 'border-accent bg-accent/5' : 'border-card-border bg-surface'} hover:border-accent/50 transition-colors`}>
                    <Monitor size={20} className={theme === 'system' ? 'text-accent' : 'text-muted-foreground'} />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-card-border/50">
                <ToggleRow
                  title="Email Notifications"
                  description="Receive updates about your account and purchases."
                  checked={emailNotifs}
                  onChange={setEmailNotifs}
                />
                <ToggleRow
                  title="Marketing Emails"
                  description="Receive news, updates, and promotional content."
                  checked={marketingNotifs}
                  onChange={setMarketingNotifs}
                />
              </div>

              <div className="pt-4 border-t border-card-border/50">
                <label className="text-sm font-medium text-foreground block mb-2">Language</label>
                <select className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-card-border bg-surface text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </SettingsSectionCard>

          {/* Privacy & Danger Zone */}
          <DangerZoneCard />

        </div>
      </div>
    </div>
  );
}
