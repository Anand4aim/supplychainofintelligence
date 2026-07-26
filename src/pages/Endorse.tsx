import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import PersonalCapacityNotice from "@/components/PersonalCapacityNotice";
import QuoteCard from "@/components/QuoteCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { PAPERS } from "@/data/papers";

const schema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(120, "Name is too long"),
  title: z.string().trim().max(160, "Title is too long"),
  institution: z.string().trim().max(160, "Institution is too long"),
  email: z
    .string()
    .trim()
    .max(255, "Email is too long")
    .email("Please use a valid email")
    .or(z.literal("")),
  quote: z
    .string()
    .trim()
    .min(20, "A little more, please — at least 20 characters")
    .max(1200, "Please keep it under 1200 characters"),
  document: z.string().trim().max(120),
  permission_public: z.boolean(),
});

const field =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const Endorse = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    institution: "",
    email: "",
    quote: "",
    document: PAPERS[1].title,
    permission_public: true,
  });
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState<null | typeof form>(null);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    const v = parsed.data;
    const { error } = await supabase.from("endorsements").insert({
      name: v.name,
      title: v.title || null,
      institution: v.institution || null,
      email: v.email || null,
      quote: v.quote,
      document: v.document || null,
      permission_public: v.permission_public,
      status: "pending",
    });
    setBusy(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(form);
    toast.success("Thank you — your comment has been received.");
  };

  const shortDoc =
    PAPERS.find((p) => p.title === (submitted?.document ?? form.document))?.subtitle ?? null;

  return (
    <SiteLayout>
      <Seo
        title="Submit a comment or endorsement — Supply Chain of Intelligence"
        description="Academics and reviewers can submit a short comment, critique, or endorsement of the Supply Chain of Intelligence papers. Attribution is automatic and always shown as given."
        path="/endorse"
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="mb-10">
          <Eyebrow>For reviewers</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Comment, critique, or endorse
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            The verification boundary is stated so it can be refuted. A counter-example is as
            welcome as an endorsement — both are published the same way, with your attribution
            exactly as you write it here.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reading first?{" "}
            <Link to="/papers" className="underline underline-offset-4">
              The papers
            </Link>{" "}
            ·{" "}
            <Link to="/cite" className="underline underline-offset-4">
              How to cite
            </Link>
          </p>
        </header>

        {submitted ? (
          <section className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl text-foreground">Received, thank you.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nothing is published automatically. {submitted.permission_public
                ? "Because you allowed public attribution, this may appear on the Voices page with the attribution shown below."
                : "You did not grant public attribution, so this will be read privately and not published."}{" "}
              Here is your card — yours to keep or share.
            </p>
            <div className="mt-8">
              <QuoteCard
                data={{
                  name: submitted.name,
                  title: submitted.title,
                  institution: submitted.institution,
                  quote: submitted.quote,
                  document: shortDoc,
                }}
                fileName={`scoi-quote-${submitted.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              />
            </div>
            <Button variant="outline" className="mt-8" onClick={() => setSubmitted(null)}>
              Submit another
            </Button>
          </section>
        ) : (
          <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Name</span>
                <input
                  className={field}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  maxLength={120}
                  placeholder="Jane Okafor"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Title <span className="text-muted-foreground">(optional)</span>
                </span>
                <input
                  className={field}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  maxLength={160}
                  placeholder="Professor of Strategy"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Institution <span className="text-muted-foreground">(optional)</span>
                </span>
                <input
                  className={field}
                  value={form.institution}
                  onChange={(e) => set("institution", e.target.value)}
                  maxLength={160}
                  placeholder="Boston University"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Email <span className="text-muted-foreground">(optional, never published)</span>
                </span>
                <input
                  className={field}
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  maxLength={255}
                  placeholder="you@university.edu"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                Which document is this about?
              </span>
              <select
                className={field}
                value={form.document}
                onChange={(e) => set("document", e.target.value)}
              >
                {PAPERS.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title}
                  </option>
                ))}
                <option value="The framework as a whole">The framework as a whole</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                Your comment, critique, or endorsement
              </span>
              <textarea
                className={`${field} min-h-[160px] resize-y`}
                value={form.quote}
                onChange={(e) => set("quote", e.target.value)}
                maxLength={1200}
                placeholder="The stopping rule is the interesting move here…"
                required
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                {form.quote.trim().length}/1200
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={form.permission_public}
                onChange={(e) => set("permission_public", e.target.checked)}
              />
              <span className="text-sm leading-relaxed text-muted-foreground">
                I permit this comment to be published with the attribution above. Leave unchecked to
                send it privately.
              </span>
            </label>

            <Button type="submit" disabled={busy} className="w-full md:w-auto">
              {busy ? "Sending…" : "Submit"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Nothing is published automatically. Quotes are reviewed, and attribution is used
              exactly as written above. Email addresses are never published.
            </p>
          </form>
        )}

        <div className="mt-12">
          <PersonalCapacityNotice />
        </div>
      </article>
    </SiteLayout>
  );
};

export default Endorse;
