import { useState } from "react";
import { Loader2, Check, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  source?: string;
  compact?: boolean;
  variant?: "card" | "inline" | "footer";
}

const NewsletterCTA = ({ source = "site", compact = false, variant = "card" }: Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
      setStatus("error");
      setMsg("Enter a valid email.");
      return;
    }
    setStatus("loading");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim(), source, status: "pending" });
    if (error) {
      // Duplicate is fine, treat as success
      if (error.code === "23505") {
        setStatus("success");
        setMsg("You're already on the list.");
      } else {
        setStatus("error");
        setMsg("Couldn't subscribe. Try again.");
      }
      return;
    }
    setStatus("success");
    setMsg("Subscribed. Watch your inbox for the next issue.");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div
        className={
          variant === "footer"
            ? "flex items-center gap-2 text-sm text-foreground"
            : "rounded-xl border border-[hsl(var(--verdict-fortified))]/40 bg-[hsl(var(--verdict-fortified))]/5 p-5 flex items-center gap-3"
        }
      >
        <Check size={16} className="text-[hsl(var(--verdict-fortified))]" />
        <span>{msg}</span>
      </div>
    );
  }

  const inputCls =
    "flex-1 bg-background border border-foreground/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-muted-foreground";
  const btnCls =
    "btn-sketch text-[12px] px-4 py-2 inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50";

  if (variant === "footer") {
    return (
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-sm">
        <label className="font-mono-marker text-[10px] text-foreground/60">
          Subscribe to the next issue
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
          />
          <button type="submit" disabled={status === "loading"} className={btnCls}>
            {status === "loading" ? <Loader2 className="animate-spin" size={12} /> : "Subscribe"}
          </button>
        </div>
        {status === "error" && <p className="text-xs text-[hsl(var(--verdict-exposed))]">{msg}</p>}
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-foreground/15 bg-card p-6 md:p-8">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
          <Mail size={16} className="text-accent" />
        </div>
        <div>
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
            Get the next teardown in your inbox.
          </h3>
          {!compact && (
            <p className="text-sm text-muted-foreground mt-1">
              One issue when something structurally important happens, usually weekly. No spam, no
              filler, unsubscribe anytime.
            </p>
          )}
        </div>
      </div>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputCls}
        />
        <button type="submit" disabled={status === "loading"} className={btnCls}>
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={12} /> Subscribing…
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-[hsl(var(--verdict-exposed))] mt-2">{msg}</p>
      )}
    </div>
  );
};

export default NewsletterCTA;
