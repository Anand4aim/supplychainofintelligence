import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import { Mic, Users, BookOpen, MapPin, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

const TOPICS = [
  {
    icon: <MapPin size={24} />,
    title: "Where Do YOU Sit in the Stack?",
    desc: "Map your company's structural position across the 8 layers. Identify moats, risks, and migration paths using the Intelligence Cube™.",
    format: "Keynote (45–60 min) or Workshop (half-day)",
  },
  {
    icon: <Users size={24} />,
    title: "The Six Fates of SaaS",
    desc: "Which archetype is your company? Data Refinery, Workflow Fortress, or Thin-Layer Graveyard? Strategic positioning for the agent economy.",
    format: "Keynote (30–45 min)",
  },
  {
    icon: <BookOpen size={24} />,
    title: "The Three Laws That Predict the Future",
    desc: "Structural forces that determine who wins and who dies. Applied to your industry with real-time company mapping.",
    format: "Executive briefing (60–90 min)",
  },
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
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Mic className="mx-auto mb-6 text-indigo" size={40} />
            <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-6">Speaking & Workshops</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
              Bring the Framework to Your Team
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Keynotes, executive briefings, and hands-on workshops. Map your company's structural 
              position before the market forces it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Anand */}
      <section className="bg-card">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">About the Speaker</p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Anand Arivukkarasu</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ex-Meta Product Leader who has spent over a decade at the intersection of platform 
                strategy and AI. Creator of The Supply Chain of Intelligence™ and The Intelligence Cube™ — 
                frameworks that map the structural forces reshaping the software industry.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Anand's work bridges the gap between traditional product thinking (JTBD, customer-centricity) 
                and the new structural reality of AI — where understanding your position in the intelligence 
                stack matters as much as understanding your customer.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Ex-Meta", "Product Strategy", "AI Frameworks", "Enterprise SaaS"].map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-navy rounded-2xl p-10 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-indigo/20 flex items-center justify-center mb-6">
                <span className="font-display text-4xl font-bold text-indigo">AA</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Anand Arivukkarasu</h3>
              <p className="text-white/50 text-sm mb-4">Creator, The Supply Chain of Intelligence™</p>
              <p className="text-white/40 text-xs">Ex-Meta · SupplyChainOfAI.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">Speaking Topics</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-10">Signature Talks & Workshops</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOPICS.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center text-indigo mb-5">
                  {topic.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{topic.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{topic.desc}</p>
                <p className="text-xs font-medium text-indigo">{topic.format}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop deep-dive */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">Featured Workshop</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            "Where Do YOU Sit in the Stack?"
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            A half-day executive workshop where your leadership team maps your company's position in the Intelligence Cube™ 
            and builds a structural migration strategy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "32 Sub-Layer Mapping — Find exactly where your moat is",
              "Structural Risk Assessment — Apply the Three Laws to your business",
              "Cube Position Mapping — Plot your company in 3D",
              "Industry Deep Dive — Your vertical, layer by layer",
              "Migration Playbook — Move value into scarce layers",
              "Competitive Threat Analysis — Who's eating your layer",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight size={16} className="text-indigo mt-0.5 shrink-0" />
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Booking */}
      <section className="bg-card">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-indigo mb-4">Get in Touch</p>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Book Anand for Your Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo/50 resize-none"
                    placeholder="Tell us about your event, audience size, and preferred format..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Quick booking */}
            <div className="flex flex-col justify-center">
              <div className="bg-navy rounded-2xl p-10 text-center">
                <Mail className="mx-auto mb-4 text-indigo" size={32} />
                <h3 className="font-display text-xl font-bold text-white mb-3">Prefer a Quick Call?</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Book a 30-minute discovery call to discuss your event, 
                  audience, and how the framework applies to your industry.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo text-white font-semibold rounded-md hover:opacity-90 transition"
                >
                  Book a Call <ArrowRight size={18} />
                </a>
                <p className="text-white/30 text-xs mt-4">Or email directly: hello@supplychainofai.com</p>
              </div>

              <div className="mt-8 bg-secondary/50 rounded-xl p-6">
                <h4 className="font-body text-sm font-semibold text-foreground mb-3">Perfect for:</h4>
                <ul className="space-y-2">
                  {[
                    "Product & Engineering leadership offsites",
                    "SaaS conferences & industry events",
                    "Board-level strategic briefings",
                    "VC portfolio company workshops",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo shrink-0" />
                      {item}
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
