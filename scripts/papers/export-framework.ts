// Dumps the canonical framework data from src/data/layers.ts to JSON so the
// Python PDF builder (scripts/papers/build_papers.py) never re-states content.
// Run: bun scripts/papers/export-framework.ts > scripts/papers/framework.json
import { LAYERS, LAWS, OBSERVATIONS, AUDIT_QUESTIONS, AUDIT_BANDS } from "../../src/data/layers";

console.log(JSON.stringify({ LAYERS, LAWS, OBSERVATIONS, AUDIT_QUESTIONS, AUDIT_BANDS }, null, 1));
