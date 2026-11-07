"use client";

import { useState } from "react";
import { Globe, Info, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/ui/PageHeader";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function SellerSettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [notice, setNotice] = useState(false);

  const email = session?.user?.email || "";

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      <PageHeader
        eyebrow="Account"
        title="Creator Settings"
        description="Manage your public creator profile."
      />

      <div className="surface-card p-6 md:p-8">
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <Info size={18} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Profile editing is not connected to an account-update endpoint yet.
            Changes made here are not saved.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xl font-bold uppercase text-accent">
            {name[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {name || "Your name"}
            </p>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Avatar upload is not available yet.
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setNotice(true);
          }}
        >
          <Input
            id="creator-name"
            label="Display name"
            icon={<User size={18} />}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
          <Input
            id="creator-email"
            label="Email address"
            type="email"
            icon={<Mail size={18} />}
            value={email}
            readOnly
            disabled
            containerClassName="opacity-80"
          />
          <Input
            id="creator-website"
            label="Website or portfolio"
            type="url"
            icon={<Globe size={18} />}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            placeholder="https://yourportfolio.com"
          />

          <div className="space-y-2">
            <label
              htmlFor="creator-bio"
              className="block text-sm font-medium text-foreground"
            >
              Creator bio
            </label>
            <textarea
              id="creator-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              placeholder="Tell buyers about yourself and what you create."
              className="w-full resize-none rounded-xl border border-input-border bg-input-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all hover:border-input-border/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-input-focus"
            />
          </div>

          {notice && (
            <p className="rounded-xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning">
              Saving is not available yet. Your profile has not been changed.
            </p>
          )}

          <div className="flex justify-end border-t border-card-border pt-6">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
