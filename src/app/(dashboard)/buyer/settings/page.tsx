"use client";

import { useState } from "react";
import { Info, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/ui/PageHeader";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function BuyerSettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email] = useState(session?.user?.email || "");
  const [notice, setNotice] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      <PageHeader
        eyebrow="Account"
        title="Buyer Settings"
        description="Manage your personal account details."
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
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xl font-bold uppercase text-accent">
            {name[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{name || "Your name"}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
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
            id="buyer-name"
            label="Full name"
            icon={<User size={18} />}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
          <Input
            id="buyer-email"
            label="Email address"
            type="email"
            icon={<Mail size={18} />}
            value={email}
            readOnly
            disabled
            containerClassName="opacity-80"
          />

          {notice && (
            <p className="rounded-xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning">
              Saving is not available yet. Your profile has not been changed.
            </p>
          )}

          <div className="flex justify-end border-t border-card-border pt-6">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
