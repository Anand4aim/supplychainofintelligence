import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { Mic, Users, BookOpen, MapPin, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

const TOPICS = [
  { icon: <MapPin size={24} />, title: "Where Do YOU Sit in the Stack?", desc: "Map your company's structural position across the 8 layers.", format: "Keynote (45–60 min) or Workshop (half-day)" },
  { icon: <Users size={24} />, title: "The Six Fates of SaaS", desc: "Which archetype is your company? Data Refinery, Workflow Fortress, or Thin-Layer Graveyard?", format: "Keynote (30–45 min)" },
  { icon: <BookOpen size={24} />, title: "The Three Laws That Predict the Future", desc: "Structural forces that determine who wins and who dies.", format: "Executive briefing (60–90 min)" },
];

const SpeakingPage = () => {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been received. Anand will respond within 48 hours.");
    setForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Mic className="mx-auto mb-6 text-accent" size={40} />
            <p className="font-sketch text-base text-accent mb-6">✏️ Speaking & Workshops</p>
            <h1 className="font-display text-3xl md:text-[44px] font-bold text-foreground leading-[1.1] mb-6">
              Bring the Framework to Your Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Keynotes, executive briefings, and hands-on workshops.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-sketch text-base text-accent mb-4">✏️ About the Speaker</p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Anand Arivukkarasu</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ex-Meta & Google Product Leader who has spent over a decade at the intersection of platform 
                strategy and AI. Creator of The Supply Chain of Intelligence™ and The Intelligence Cube™.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Anand's work bridges the gap between traditional product thinking and the new structural 
                reality of AI.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Ex-Meta", "Ex-Google", "Product Strategy", "AI Frameworks"].map((tag) => (
                  <span key={tag} className="text-sm font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-10 text-center border border-border sketch-border">
              <div className="w-32 h-32 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <span className="font-display text-4xl font-bold text-accent">AA</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Anand Arivukkarasu</h3>
              <p className="text-muted-foreground text-sm mb-4">Creator, The Supply Chain of Intelligence™</p>
              <p className="font-sketch text-sm text-muted-foreground/60">Ex-Meta · Ex-Google · SupplyChainOfAI.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-sketch text-base text-accent mb-4">✏️ Speaking Topics</p>
          <h2 className="font-display text-[28px] md:text-[32px] font-bold text-foreground mb-10">Signature Talks & Workshops</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOPICS.map((topic, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 sketch-border">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-5">{topic.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{topic.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{topic.desc}</p>
                <p className="font-sketch text-sm font-bold text-accent">{topic.format}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-sketch text-base text-accent mb-4">✏️ Featured Workshop</p>
          <h2 className="font-display text-[28px] md:text-[36px] font-bold text-foreground mb-6">
            "Where Do YOU Sit in the Stack?"
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            A half-day executive workshop where your leadership team maps your company's position.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "32 Sub-Layer Mapping — Find exactly where your moat is",
              "Structural Risk Assessment — Apply the Three Laws",
              "Cube Position Mapping — Plot your company in 3D",
              "Industry Deep Dive — Your vertical, layer by layer",
              "Migration Playbook — Move value into scarce layers",
              "Competitive Threat Analysis — Who's eating your layer",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight size={16} className="text-accent mt-0.5 shrink-0" />
                <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="font-sketch text-base text-accent mb-4">✏️ Get in Touch</p>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Book Anand for Your Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Name", type: "text", key: "name", placeholder: "Your name" },
                  { label: "Company", type: "text", key: "company", placeholder: "Your company" },
                  { label: "Email", type: "email", key: "email", placeholder: "you@company.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-foreground mb-1">{field.label}</label>
                    <input type={field.type} required value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                      placeholder={field.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Message</label>
                  <textarea required rows={4} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                    placeholder="Tell us about your event..." />
                </div>
                <button type="submit" className="btn-sketch w-full justify-center">
                  Send Inquiry
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-card rounded-2xl p-10 text-center border border-border sketch-border">
                <Mail className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Prefer a Quick Call?</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Book a 30-minute discovery call.
                </p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                  className="btn-sketch justify-center">
                  Book a Call <ArrowRight size={18} />
                </a>
                <p className="font-sketch text-sm text-muted-foreground/50 mt-4">Or email: hello@supplychainofai.com</p>
              </div>

              <div className="mt-8 bg-secondary rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Perfect for:</h4>
                <ul className="space-y-2">
                  {["Product & Engineering offsites", "SaaS conferences", "Board-level briefings", "VC portfolio workshops"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default SpeakingPage;