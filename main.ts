// ex-word-20261124 — "One Word From Your Ex" (make.fun).
// Writes exactly one word — the word my ex would use to describe me —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const EX_WORD_MAX_CHARS = 30;
// The single word my ex would use to describe me: the left-on-read habit,
// one word that needs no explanation and could not be swapped for a synonym.
const exDescriptionWord = "Unread";

// The entry must be exactly one word: no spaces, no sentence, no explanation.
if (
  exDescriptionWord.length < 1 ||
  exDescriptionWord.length > EX_WORD_MAX_CHARS ||
  /\s/.test(exDescriptionWord)
) {
  throw new Error(`entry must be a single word of 1-${EX_WORD_MAX_CHARS} characters`);
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryText = readFileSync(join(scriptDir, "entry.txt"), "utf8");
if (entryText !== exDescriptionWord) {
  throw new Error("entry.txt does not match the entry word");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), exDescriptionWord, "utf8");
