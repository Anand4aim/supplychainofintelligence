import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { SketchBoard } from "@/components/sketch/SketchElements";

// Pre-AI Proof: the framework is not AI-specific. The 10 layers describe any
// supply chain of intelligence. This essay proves it by replaying the model on
// pre-AI category winners, Bloomberg, Salesforce, Visa, and naming the
// "SaaS-under-AI-pressure" archetype.

const PreAiProof = () => (
  <SiteLayout>
    <Seo
      title="Pre-AI Proof, the 10 layers existed before generative AI"
      description="A common critique: the framework only applies to AI-native products. Reply: the 10 layers describe any intelligence supply chain. Bloomberg, Salesforce, Visa, all explainable as L1+L3+L4+L8 stacks. Plus the SaaS-under-AI-pressure archetype."
      path="/essays/pre-ai-proof"
      article
    />

    <article className="bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-14">
        <Eyebrow tone="accent" className="mb-3">Framework Essay · Pre-AI Proof</Eyebrow>
        <h1 className="font-display text-[34px] md:text-[48px] font-bold leading-[1.08] mb-4 text-foreground">
          The 10 layers existed before AI did.
        </h1>
        <p className="font-display text-lg md:text-xl text-accent italic leading-snug mb-8 border-l-2 border-accent/60 pl-4">
          Bloomberg, Salesforce, Visa, Apollo, all explainable as the same stack. AI did not invent the supply chain. It just renamed L2.
        </p>

        <p className="text-sm text-muted-foreground mb-10">
          By <strong className="text-foreground">Anand Arivukkarasu</strong> · Creator of Supply Chain of Intelligence™
        </p>

        <div className="prose-essay space-y-6 text-[17px] md:text-[18px] leading-[1.75] text-foreground/85">
          <p>
            A fair critique of the framework is that it is only useful for AI-native products, that if you are building non-AI SaaS or a consumer app, the 10 layers do not apply. The critique is wrong, and the proof is that every durable software company of the last forty years can be cleanly decomposed into the same stack. AI did not invent the supply chain of intelligence. It just commoditized one layer of it (L2, Models) so violently that the layer became visible for the first time.
          </p>

          <p>
            <strong className="text-foreground">Bloomberg.</strong> Bloomberg is read as a media company by outsiders and a terminal company by users. It is neither. It is an L1b + L3 + L4 + L8 stack. The proprietary financial corpus (L1b) is forty years deep and structurally cannot be re-licensed at any price. The editorial and trust gates (L3d) are why a hedge fund will trust a Bloomberg headline at 3:47am and act on it. The integrated access to every desk, every chat, every counterparty (L4) is the system-of-record nobody can rebuild. And the user-shaped memory of watchlists, shortcuts, and instinct-fitted UIs (L8b) is the reason no one leaves the terminal even when cheaper alternatives ship. The model layer in Bloomberg's stack is trivial, a search box, a calculator, some ranking. That is the entire L2 contribution. The other four layers are the company.
          </p>

          <p>
            <strong className="text-foreground">Salesforce.</strong> Salesforce is the canonical L4 company. Every CRM workflow runs through their object graph. The L4 sub-layers, API surface (L4a), access governance (L4c), integration depth (L4b), are the entire moat. They have minimal L1 (the data belongs to the customer), and historically minimal L5 (the execution lived in human sales reps). The shift to Agentforce is exactly the framework's prediction: an L4 incumbent extending upward into L5 + L6 because that is where AI margin is moving. The reason Salesforce can attempt it and a startup cannot is that the L4 layer was already owned. Without owning the system of record, the agent has nothing to act on.
          </p>

          <p>
            <strong className="text-foreground">Visa.</strong> Visa looks like a payments company. It is an L3 + L4 company. L3 is the trust gate, banks, merchants, regulators, dispute resolution. L4 is the network, the rails every transaction flows across. There is no L2 in Visa's stack. There is no AI. There never needed to be. The two layers are so structurally scarce that they are sufficient. Net profit margin of ~50% is not a software margin. It is a bottleneck margin. Law II priced it correctly thirty years before the law was written.
          </p>

          <p>
            <strong className="text-foreground">Apollo.io.</strong> Apollo is a pre-AI L1c company that the AI era will make more valuable, not less. The behavioral contact graph (L1c) was always the moat. AI just amplifies the leverage of having proprietary data the models cannot scrape. The Apollo of 2030 will own more of L5 (sales execution) and L8 (account-level memory), but the foundation was laid in 2015, well before the L2 commoditization shock made it obvious.
          </p>

          <p>
            <strong className="text-foreground">The pattern.</strong> Every durable software company of the prior era owned at least one layer the new entrants could not rebuild. The 10-layer framework is not a new theory of AI strategy. It is a renaming exercise for a strategic structure that already existed, with one important addition: L2 (Models) was previously invisible because every company built their own narrow intelligence in-house. Generative AI made L2 a public commodity, which forced every other layer to become legible.
          </p>

          <p>
            <strong className="text-foreground">Which brings us to the harder case: SaaS under AI pressure.</strong> Most non-AI SaaS companies today are L4 + L7 stacks with a thin L5. The workflow tool you used in 2019, your project tracker, your design tool, your sales engagement platform, owns the integration surface (L4) and the interface (L7) but rents almost everything in between. For a decade that was enough, because L2 did not exist as a public layer. Now it does, and the new entrants are arriving with the same L4 + L7 but with a real L5 (execution depth) and a compounding L8 (memory). The incumbent SaaS company is not getting disrupted because someone built a better surface. It is getting disrupted because the framework's depth requirement just changed.
          </p>

          <SketchBoard className="my-10 p-5 md:p-6 bg-card/40">
            <p className="font-mono-marker text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              ARCHETYPE, SAAS UNDER AI PRESSURE
            </p>
            <p className="text-foreground/85 leading-relaxed text-base md:text-[17px]">
              A pre-AI SaaS company with strong L4 (integrations, system of record) and strong L7 (familiar interface)
              but minimal L1 (no proprietary data), minimal L5 (workflows still expect a human to do the work), and
              minimal L8 (the product does not remember). The AI-native competitor arrives with the same L4 + L7 plus
              real L5 and compounding L8. The incumbent's path is to extend downward into L5/L8 quickly, or be repriced
              as a system of record that someone else's intelligence runs on top of. Examples in motion: Salesforce
              (extending), Atlassian (extending), Zendesk (acquired by Sierra-adjacent strategy), classic Zapier
              (compressing into L6).
            </p>
          </SketchBoard>

          <p>
            <strong className="text-foreground">The answer to the critique, in one sentence:</strong> if the 10-layer framework only described AI-native products, it would not explain why Visa is still worth half a trillion dollars. It does. The framework is a theory of structural durability for any intelligence-bearing product, software, financial services, regulated industries, with AI as the most recent and most visible test case. Use it on your non-AI SaaS company. The layers you are missing are the layers you will be repriced on.
          </p>
        </div>
      </div>
    </article>
  </SiteLayout>
);

export default PreAiProof;
