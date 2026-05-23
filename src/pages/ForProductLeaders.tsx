import { motion } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import { ArrowRight, Target, Compass, GitBranch, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { SketchFilters, SketchBoard, SketchBox } from "@/components/sketch/SketchElements";
import Eyebrow from "@/components/Eyebrow";

const ForProductLeaders = () => (
  <SiteLayout>
    <Seo
      title="AI Strategy for Product Leaders — Add the Depth Axis"
      description="JTBD covers the customer axis. In the AI era, you also need the Z-axis — where in the intelligence stack your product sits — or it gets commoditized."
      path="/for-product-leaders"
    />
    <SketchFilters />

    {/* Hero */}
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Eyebrow className="mb-5">
  For Product Leaders
</Eyebrow>
          <h1 className="font-display text-[28px] md:text-[42px] font-bold text-foreground leading-[1.15] mb-5">
            You've Mastered the Customer Axis.{" "}
            <span className="text-accent">Now Master the Depth Axis.</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            Great product leaders understand JTBD, customer depth, the Y-axis. In the AI era, you also 
            need the Z-axis — where in the intelligence stack your product actually sits — or you'll 
            build something customers love today that gets commoditized tomorrow.
          </p>
        </motion.div>
      </div>
    </section>

    {/* The Two Axes */}
    <section className="bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <Eyebrow className="mb-4">The Shift</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          From Y-Axis Thinking to Y+Z Thinking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-card border border-border rounded-xl p-6 sketch-border">
            <Target className="text-muted-foreground mb-4" size={24} />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">The Y-Axis (What You Know)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Customer needs, JTBD, user research, product-market fit. The vertical dimension.
            </p>
            <p className="font-sketch text-sm text-muted-foreground italic">
              Necessary — but no longer sufficient.
            </p>
          </div>

          <div className="bg-card border-2 border-accent/30 rounded-xl p-6 sketch-border">
            <Layers className="text-accent mb-4" size={24} />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">The Z-Axis (What You Need)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Infrastructure depth. Which layer do you own? Which sublayers are defensible?
            </p>
            <p className="font-mono-marker text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-accent italic">
              This determines whether your product survives the next 3 years.
            </p>
          </div>
        </div>

        <div className="verdict-dominant bg-accent/5 rounded-xl p-5">
          <p className="text-sm text-foreground leading-relaxed italic">
            "Great product leaders have mastered the Y-axis — customer depth. In the AI era, you also need 
            the Z-axis — infrastructure depth — or you'll build something customers love today that gets 
            commoditized tomorrow."
          </p>
          <p className="mt-2 font-sketch text-base text-muted-foreground">— Anand Arivukkarasu</p>
        </div>
      </div>
    </section>

    {/* How to Use */}
    <section className="bg-background border-y border-border">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <Eyebrow className="mb-4">Practical Application</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          How Product Leaders Use the Framework
        </h2>

        <div className="space-y-6">
          {[
            { icon: <Compass size={22} />, title: "Roadmap Decisions", desc: "Before building a feature, map it to a sublayer. Is it L7a (surface, easily replicated) or L5d (company playbook, defensible)?", example: "Example: Building an AI summarizer? That's L5a — generic, model absorbs it. Building compliance audit trails? That's L3a — slow moat, hard to replicate." },
            { icon: <GitBranch size={22} />, title: "Build vs Buy vs Rent", desc: "Rent L2 (models) — they commoditize. Build L5b/c/d (domain skills) — they compound. Buy L4b (deep integrations) — they create switching costs.", example: "Example: Rent GPT-4 for reasoning. Build your own contract analysis engine (L5b). Buy Twilio for communications (L4b)." },
            { icon: <Target size={22} />, title: "Competitive Analysis", desc: "Map competitors to sublayers. Find the gaps. If everyone is at L7 (surfaces), go deeper to L5 (skills) or L8 (memory).", example: "Example: Your competitor offers AI chat (L7a). You build AI that remembers every customer interaction (L8b+L8c)." },
            { icon: <Layers size={22} />, title: "Org Design & Hiring", desc: "Each layer requires different expertise. L1 needs data engineers. L3 needs compliance specialists. L5 needs domain experts. L8 needs ML engineers.", example: "Example: If your strategy is to own L5+L8, you need domain experts who can encode SOPs (L5d) and ML engineers who can build feedback loops (L8c)." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 sketch-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-accent">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
              <p className="font-sketch text-sm text-muted-foreground/70 italic">{item.example}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-secondary/30">
      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Run the framework on your own roadmap.
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto">
          Use the public Supply Chain of Intelligence™ to audit your roadmap, your competitive
          position, and your structural defensibility — sublayer by sublayer. Free, no signup,
          no follow-up.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/framework" className="btn-sketch">
            Explore the Framework <ArrowRight size={16} />
          </Link>
          <Link to="/analysis" className="btn-sketch-outline">
            See Case Studies
          </Link>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default ForProductLeaders;