import { useState } from "react";
import { Flag } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  subjectId: string;
  subject: string;
  sourceUrl: string;
  sourceLabel: string;
}

const ISSUE_TYPES = [
  { value: "broken-link", label: "Broken / dead link" },
  { value: "wrong-source", label: "Wrong source for this claim" },
  { value: "outdated", label: "Outdated, newer info exists" },
  { value: "misattribution", label: "Misattribution / quoted incorrectly" },
  { value: "other", label: "Other" },
] as const;

const schema = z.object({
  issue_type: z.enum([
    "broken-link",
    "wrong-source",
    "outdated",
    "misattribution",
    "other",
  ]),
  message: z
    .string()
    .trim()
    .min(5, "Please describe the issue (5+ chars)")
    .max(2000, "Message must be under 2000 characters"),
  reporter_email: z
    .string()
    .trim()
    .max(255)
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
});

const ReportCitationDialog = ({ subjectId, subject, sourceUrl, sourceLabel }: Props) => {
  const [open, setOpen] = useState(false);
  const [issueType, setIssueType] = useState<typeof ISSUE_TYPES[number]["value"]>("broken-link");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ issue_type: issueType, message, reporter_email: email });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      toast.error(first ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("citation_reports").insert({
      subject_id: subjectId,
      subject,
      source_url: sourceUrl,
      source_label: sourceLabel,
      issue_type: parsed.data.issue_type,
      message: parsed.data.message,
      reporter_email: parsed.data.reporter_email || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit, please try again");
      return;
    }
    toast.success("Thanks, we'll review and correct if needed.");
    setMessage("");
    setEmail("");
    setIssueType("broken-link");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-foreground/40 hover:text-accent transition-colors inline-flex items-center"
          aria-label={`Report a citation issue for ${sourceLabel}`}
          title="Report a citation issue"
        >
          <Flag size={10} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Report a citation issue</DialogTitle>
          <DialogDescription className="text-xs leading-relaxed">
            <span className="block text-foreground/80">{subject}</span>
            <span className="block truncate">{sourceLabel}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="issue-type" className="text-xs">What's wrong?</Label>
            <Select value={issueType} onValueChange={(v) => setIssueType(v as typeof issueType)}>
              <SelectTrigger id="issue-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ISSUE_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs">Details</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's broken or wrong? A better source link helps a lot."
              maxLength={2000}
              rows={4}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs">Your email <span className="text-foreground/50">(optional)</span></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com, only if you want a reply"
              maxLength={255}
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? "Sending…" : "Submit report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCitationDialog;
