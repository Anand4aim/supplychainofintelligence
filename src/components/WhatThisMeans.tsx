import { Briefcase, TrendingUp, Wrench } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";

export interface ForYou {
  product_leader?: string;
  investor?: string;
  operator?: string;
}

interface Props {
  for_you?: ForYou;
  fallback?: {
    verdict?: string;
    layers?: string[];
  };
}

const buildFallback = (fb?: Props["fallback"]): ForYou => {
  const v = (fb?.verdict ?? "").toUpperCase();
  const layers = (fb?.layers ?? []).join(", ");
  if (v.includes("DEAD") || v.includes("EXPOSED")) {
    return {
      product_leader: `If your roadmap leans on ${layers || "this layer"} alone, the moat is thin today. The counter-move is to deepen the stack, add proprietary data (L1), workflow execution (L5), or memory (L8) under what you already ship.`,
      investor: `Re-underwrite positions concentrated in ${layers || "this layer"}. The thesis works only if management has a credible plan to add a deeper layer in the next 12–18 months.`,
      operator: `Hold off on multi-year commitments at this layer for now. Keep the relationship; renegotiate to shorter terms and watch how the vendor deepens.`,
    };
  }
  if (v.includes("SAFE") || v.includes("FORTRESS") || v.includes("DOMINANT") || v.includes("WINS") || v.includes("RISING")) {
    return {
      product_leader: `This is the layer pattern worth studying: own at least one of L1 (data), L3 (compliance), or L8 (memory) under your surface. A pure L7 alone tends to compress over time.`,
      investor: `Durable layer ownership supports premium multiples. Underwrite the moat layer, not the ARR.`,
      operator: `This is a reasonable stack to standardize on, switching cost is the feature, not the bug. Data and memory built here compounds for you.`,
    };
  }
  if (v.includes("CONTESTED") || v.includes("CONSOLIDATING")) {
    return {
      product_leader: `Pick a side: deepen a layer of your own, or attach cleanly to whoever does. The middle position tends to get ground out over 12–18 months.`,
      investor: `Position-size for binary outcomes. Track who consolidates the L4 distribution above this layer.`,
      operator: `Run a 90-day bake-off. Hold off on lock-in until the L4 winner is clearer.`,
    };
  }
  return {
    product_leader: `Map your product to the layers it actually owns vs. rents. The rented ones are where the counter-move work belongs.`,
    investor: `Underwrite layer ownership, not feature count. The Cube footprint is the moat.`,
    operator: `Audit your stack against the Supply Chain of Intelligence. Anything sitting only at L7 is the layer to watch.`,
  };
};

const WhatThisMeans = ({ for_you, fallback }: Props) => {
  const fy: ForYou = {
    ...buildFallback(fallback),
    ...for_you,
  };
  const items = [
    { label: "Product Leader", text: fy.product_leader, Icon: Briefcase, color: "hsl(var(--layer-5))" },
    { label: "Investor", text: fy.investor, Icon: TrendingUp, color: "hsl(var(--layer-1))" },
    { label: "Operator", text: fy.operator, Icon: Wrench, color: "hsl(var(--layer-4))" },
  ];
  return (
    <section className="my-12">
      <Eyebrow className="mb-4">What This Means for You</Eyebrow>
      <div className="grid md:grid-cols-3 gap-3">
        {items.map(({ label, text, Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border p-4 bg-card"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} style={{ color }} />
              <p className="font-mono-marker text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
                {label}
              </p>
            </div>
            <p className="text-[14px] text-foreground/85 leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatThisMeans;
