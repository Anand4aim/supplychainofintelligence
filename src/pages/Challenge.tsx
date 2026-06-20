import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { SketchBoard } from "@/components/sketch/SketchElements";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Challenge = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const subject = String(form.get("subject") || "framework-critique");
    const message = String(form.get("message") || "");
    const sourceLabel = String(form.get("name") || "anonymous");
    const sourceUrl = String(form.get("link") || "https://supplychainofai.com/challenge");
    const reporterEmail = String(form.get("email") || "") || null;

    const { error } = await supabase.from("citation_reports").insert({
      subject,
      subject_id: "framework-challenge",
      source_label: sourceLabel,
      source_url: sourceUrl,
      issue_type: "framework-critique",
      message,
      reporter_email: reporterEmail,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Try emailing anand@supplychainofai.com instead.");
      return;
    }
    setDone(true);
    toast.success("Critique received. Anand reads every one.");
  };

  return (
    <SiteLayout>
      <Seo
        title="Challenge the framework, submit a counter-case"
        description="Supply Chain of Intelligence™ gets sharper when challenged. Submit counter-cases, edge cases, fuzzy layer boundaries, or disagreements. Open critique inbox."
        path="/challenge"
      />

      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-14">
          <Eyebrow tone="accent" className="mb-3">Open Peer Review</Eyebrow>
          <h1 className="font-display text-[36px] md:text-[52px] font-bold leading-[1.05] mb-5 text-foreground">
            Challenge the framework.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The 10 layers are a model, useful, opinionated, and incomplete. The fastest way to make it sharper is
            for operators, investors, and researchers to break it in public. Counter-cases especially welcome.
          </p>

          <SketchBoard className="mb-10 p-5">
            <p className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground mb-2">WHAT TO SUBMIT</p>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-1.5 list-disc pl-5">
              <li><strong>Counter-cases</strong>, a company that should have died under Law I and didn&apos;t, or vice versa.</li>
              <li><strong>Fuzzy boundaries</strong>, places where L5/L6/L7 or L1/L8 collapse into each other in practice.</li>
              <li><strong>Missing layers</strong>, something the 10-layer map fails to capture.</li>
              <li><strong>Better precedents</strong>, prior strategy thinking that anticipates one of the four Laws.</li>
              <li><strong>Real-world receipts</strong>, you applied the framework to a roadmap or thesis and it broke (or compounded).</li>
            </ul>
          </SketchBoard>

          {done ? (
            <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 text-center">
              <p className="font-display text-xl font-semibold text-foreground mb-2">Thank you.</p>
              <p className="text-sm text-muted-foreground">
                Critiques are reviewed weekly. The best ones become Live articles or get added to the Edge Cases page.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Name</span>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full bg-card/40 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                    placeholder="First name + company"
                  />
                </label>
                <label className="block">
                  <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Email (optional)</span>
                  <input
                    name="email"
                    type="email"
                    className="mt-1 w-full bg-card/40 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                    placeholder="so we can reply"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Subject</span>
                <select
                  name="subject"
                  className="mt-1 w-full bg-card/40 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="counter-case">Counter-case</option>
                  <option value="fuzzy-boundary">Fuzzy layer boundary</option>
                  <option value="missing-layer">Missing layer</option>
                  <option value="precedent">Better precedent</option>
                  <option value="receipt">Real-world receipt</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="block">
                <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Reference link (optional)</span>
                <input
                  name="link"
                  type="url"
                  className="mt-1 w-full bg-card/40 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                  placeholder="LinkedIn, essay, S-1, etc."
                />
              </label>
              <label className="block">
                <span className="font-mono-marker text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Your critique</span>
                <textarea
                  name="message"
                  required
                  rows={7}
                  className="mt-1 w-full bg-card/40 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-accent resize-y"
                  placeholder="Be specific. Name the company, the layer, the prediction it breaks."
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-foreground font-mono-marker text-xs tracking-[0.14em] uppercase hover:opacity-90 transition disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit critique →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Challenge;
