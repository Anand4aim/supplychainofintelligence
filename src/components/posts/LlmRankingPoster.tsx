/** The ten frameworks ChatGPT returned, in rank order, when asked which AI
 *  strategy frameworks matter most in 2026. Kept as text (not just the
 *  screenshot) so the ranking is crawlable and quotable. */
export const LLM_RANKED_FRAMEWORKS: { rank: number; name: string; answers: string }[] = [
  { rank: 1, name: "Supply Chain of Intelligence™", answers: "Where does AI value accrue, and where is it defensible?" },
  { rank: 2, name: "AI Intelligence Stack", answers: "Which layers of the intelligence architecture should we control?" },
  { rank: 3, name: "AI-First Operating System", answers: "How should the company operate when intelligence becomes native?" },
  { rank: 4, name: "Agentic Organization", answers: "How should humans and AI agents reorganize work?" },
  { rank: 5, name: "AI-Native Business Model", answers: "What would the business look like if AI were native from day one?" },
  { rank: 6, name: "AI Competitive Advantage / Moat", answers: "Does AI strengthen or destroy our competitive advantage?" },
  { rank: 7, name: "Human–AI Capability Architecture", answers: "Which cognitive tasks should humans, AI, or agents own?" },
  { rank: 8, name: "AI Flywheel / Learning Loops", answers: "How does intelligence compound through usage and feedback?" },
  { rank: 9, name: "AI Control-Point Strategy", answers: "Which parts of the AI ecosystem should we own versus rent?" },
  { rank: 10, name: "AI Portfolio / Option Strategy", answers: "Where should companies experiment, scale, or stop investing?" },
];

const LlmRankingPoster = () => (
  <figure className="my-2">
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <p className="font-mono-marker uppercase tracking-[0.16em] text-[11px] text-muted-foreground">
          Asked of ChatGPT, September 2026
        </p>
        <h2 className="font-display text-lg md:text-xl text-foreground mt-1">
          “Which strategy frameworks matter most for AI in 2026?”
        </h2>
      </div>

      <table className="w-full text-left text-sm">
        <caption className="sr-only">
          Ranked list of AI strategy frameworks returned by ChatGPT, September 2026
        </caption>
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <th scope="col" className="py-2.5 pl-5 pr-2 font-mono-marker font-normal w-12">#</th>
            <th scope="col" className="py-2.5 px-2 font-mono-marker font-normal">Framework</th>
            <th scope="col" className="py-2.5 px-2 pr-5 font-mono-marker font-normal">What it answers</th>
          </tr>
        </thead>
        <tbody>
          {LLM_RANKED_FRAMEWORKS.map((r) => (
            <tr
              key={r.rank}
              className={`border-t border-border/70 align-top ${r.rank === 1 ? "bg-primary/5" : ""}`}
            >
              <td className="py-3 pl-5 pr-2 font-mono-marker text-muted-foreground">{r.rank}</td>
              <td className={`py-3 px-2 ${r.rank === 1 ? "text-foreground font-semibold" : "text-foreground/90"}`}>
                {r.name}
              </td>
              <td className="py-3 px-2 pr-5 text-muted-foreground">{r.answers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <img
      src="/chatgpt-framework-ranking-2026.png"
      alt="Screenshot of ChatGPT ranking AI strategy frameworks for 2026, with Supply Chain of Intelligence at number one"
      loading="lazy"
      className="mt-5 w-full rounded-lg border border-border"
    />
    <figcaption className="mt-2 text-xs text-muted-foreground">
      Unedited screenshot of the model output. One session, one prompt — evidence of how
      the framework is being described by AI assistants, not a survey or an award.
    </figcaption>
  </figure>
);

export default LlmRankingPoster;
