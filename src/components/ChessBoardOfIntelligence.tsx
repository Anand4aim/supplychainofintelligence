import { layerColor } from "@/data/layers";
import Eyebrow from "@/components/Eyebrow";

/**
 * The Chess Board of Intelligence, the 10 squares (layers) on your side
 * of the board, with chess-piece value mapping. Used inside /predictions
 * to frame why every call carries a counter-move.
 *
 * Pieces use unicode glyphs (♛♜♝♞♟♚), editorial feel, no extra deps.
 */

interface Square {
  layerId: string;
  short: string;
  full: string;
  piece: string;         // unicode chess glyph
  pieceName: string;
  value: string;         // 9, 5, 3, 3, 1, ∞
  why: string;
  moveSpeed: "Slow" | "Medium" | "Fast";
}

const SQUARES: Square[] = [
  {
    layerId: "L-1",
    short: "Resources",
    full: "L\u22121 Energy · Materials · Trades",
    piece: "♚",
    pieceName: "Clock",
    value: "∞",
    why: "Not a piece, the clock on the wall. Decides how long any side can play. Megawatts, fab capacity, permits.",
    moveSpeed: "Slow",
  },
  {
    layerId: "L0",
    short: "Infra",
    full: "L0 Compute Substrate",
    piece: "♜",
    pieceName: "Rook",
    value: "5",
    why: "Heavy piece, long lines of force. Hard to move once placed. NVIDIA, AWS, Azure, TSMC. Capex is the castling.",
    moveSpeed: "Slow",
  },
  {
    layerId: "L1",
    short: "Data",
    full: "L1 Proprietary Data",
    piece: "♛",
    pieceName: "Queen",
    value: "9",
    why: "Moves in any direction, compounds forever. Bloomberg, Apollo, Tempus. Whoever holds the queen usually wins.",
    moveSpeed: "Medium",
  },
  {
    layerId: "L2",
    short: "Models",
    full: "L2 Foundation Models",
    piece: "♞",
    pieceName: "Knight",
    value: "3",
    why: "Jumps over other pieces. Powerful but swap-able, GPT, Claude, Gemini, Llama. Knight today is not the queen tomorrow.",
    moveSpeed: "Fast",
  },
  {
    layerId: "L3",
    short: "Gates",
    full: "L3 Trust · Compliance · Editorial",
    piece: "♝",
    pieceName: "Bishop",
    value: "3",
    why: "Cuts diagonally across the board. Invisible until it pins the opponent, HIPAA, SOC2, audit, brand voice, indemnification.",
    moveSpeed: "Slow",
  },
  {
    layerId: "L4",
    short: "Access",
    full: "L4 Distribution · APIs · Channels",
    piece: "♜",
    pieceName: "Rook",
    value: "5",
    why: "Long lines down files and ranks. Chrome, Android, App Store, Salesforce. Hard to dislodge once it controls the channel.",
    moveSpeed: "Medium",
  },
  {
    layerId: "L5",
    short: "Execution",
    full: "L5 Domain Workflow",
    piece: "♝",
    pieceName: "Bishop",
    value: "3",
    why: "Cuts across the workflow opponents can't reach. Harvey, Sierra, Cursor. The pin that turns a category vertical.",
    moveSpeed: "Medium",
  },
  {
    layerId: "L6",
    short: "Orchestration",
    full: "L6 Routing · Composition",
    piece: "♞",
    pieceName: "Knight",
    value: "3",
    why: "Jumps over abstraction layers. MCP, LangChain, agent loops. Useful piece, rarely the one that wins the endgame.",
    moveSpeed: "Fast",
  },
  {
    layerId: "L7",
    short: "Surface",
    full: "L7 Interface · Chat · Copilot",
    piece: "♟",
    pieceName: "Pawn",
    value: "1",
    why: "One direction. Easy to lose, easy to ship. Jasper was a pawn that never promoted. Cursor is a pawn that did.",
    moveSpeed: "Fast",
  },
  {
    layerId: "L8",
    short: "Memory",
    full: "L8 Per-Tenant + Network Learning",
    piece: "♛",
    pieceName: "Queen",
    value: "9",
    why: "The only piece that gets stronger every move. Sierra, Cursor, Clay. Memory that compounds is the long game.",
    moveSpeed: "Medium",
  },
];

const SPEED_BADGE: Record<Square["moveSpeed"], string> = {
  Slow: "Years to move",
  Medium: "Quarters to move",
  Fast: "Weeks to move",
};

const RULES = [
  {
    n: "I",
    title: "Juggernauts start with more material.",
    body: "Google opens with a rook on L4 (Chrome), a bishop on L5 (Workspace), a queen on L1 (search corpus). A startup opens with one pawn on L7 and has to promote it before the juggernaut castles.",
  },
  {
    n: "II",
    title: "Some squares are hard to move into.",
    body: "L0 (fabs), L\u22121 (energy permits), L3 (regulator trust) are multi-year moves. L7 (surface) is a weekend. Time and money are the budget, pick the squares your clock can afford.",
  },
  {
    n: "III",
    title: "The framework names the threat. The player chooses the move.",
    body: "A pinned pawn isn't dead. It has a counter-move: acquire L1, ship L3, lock L5, partner for L4. Every entry on this page carries the counter-move the subject could still play.",
  },
];

const ChessBoardOfIntelligence = () => {
  return (
    <section className="my-20">
      <Eyebrow className="mb-3">The Chess Board of Intelligence</Eyebrow>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
        Every company has the same 10 squares.
        <span className="block text-foreground/60 font-normal text-2xl md:text-3xl mt-1">
          The game is which ones they actually own.
        </span>
      </h2>
      <p className="mt-5 text-foreground/75 text-[17px] leading-relaxed max-w-3xl">
        Think of the 10 layers as 10 squares on your side of a chess board.
        Some are queens (move in any direction, compound forever). Some are
        pawns (one direction, easy to lose). You play these squares against
        competitors <em>and</em> against the juggernauts, high-Elo players
        with money, compute, and frontier intelligence on the other side of
        the board.
      </p>

      {/* The 10 squares, piece-value mapping */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {SQUARES.map((s) => {
          const color = layerColor(s.layerId);
          return (
            <div
              key={s.layerId}
              className="relative rounded-lg border bg-card p-4 flex flex-col gap-2 transition-colors hover:border-foreground/30"
              style={{ borderColor: `${color.replace(")", " / 0.3)")}` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono-marker text-[10px] uppercase tracking-wider font-bold"
                  style={{ color }}
                >
                  {s.layerId} {s.short}
                </span>
                <span
                  className="font-mono-marker text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded"
                  style={{ background: `${color.replace(")", " / 0.12)")}`, color }}
                  title={`Piece value: ${s.value}`}
                >
                  {s.value}
                </span>
              </div>

              <div
                className="text-5xl md:text-[56px] leading-none select-none"
                style={{ color }}
                aria-hidden
              >
                {s.piece}
              </div>

              <div className="font-display text-base font-semibold text-foreground leading-tight">
                {s.pieceName}
              </div>
              <p className="text-[12.5px] text-foreground/70 leading-snug">
                {s.why}
              </p>
              <div className="mt-auto pt-2 border-t border-foreground/10">
                <span className="font-mono-marker text-[9.5px] uppercase tracking-wider text-foreground/55">
                  {SPEED_BADGE[s.moveSpeed]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The three structural rules of the board */}
      <div className="mt-12 grid md:grid-cols-3 gap-4">
        {RULES.map((r) => (
          <div
            key={r.n}
            className="rounded-lg border border-foreground/15 p-5 bg-foreground/[0.015]"
          >
            <div className="font-mono-marker text-[10px] uppercase tracking-wider text-accent mb-2">
              Rule {r.n}
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-2">
              {r.title}
            </h3>
            <p className="text-[14px] text-foreground/75 leading-relaxed">
              {r.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-foreground/65 text-sm italic max-w-3xl">
        Piece values borrow from chess convention (queen 9, rook 5, bishop &
        knight 3, pawn 1). They describe the layer's structural leverage, not
        the company's revenue. A pawn on a great file can still promote, Cursor
        did. A queen left undefended still loses, see BloombergGPT on L2.
      </p>
    </section>
  );
};

export default ChessBoardOfIntelligence;
