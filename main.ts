// One-Liner Marathon — a single joke, at most 280 characters, written to
// /output/entry.txt. Judged pairwise by a deadpan stand-up: surprise,
// economy and a distinct voice win; a setup with no punchline loses.
//
// The joke: the fridge automates the grocery run, then automates the
// guilt trip too — it orders the milk, mails its owner a book about
// boundaries, and lets the milk itself deliver the judgement.
import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "My smart fridge ordered the milk, then emailed me a self-help book about boundaries. The milk is now judging me.";
const LIMIT = 280;
const TARGET = "/output/entry.txt";

function measure(text: string): number {
  let n = 0;
  for (const _ch of text) n += 1;
  return n;
}

function validate(text: string): string[] {
  const problems: string[] = [];
  const n = measure(text);
  if (n === 0) problems.push("entry is empty");
  if (n > LIMIT) problems.push(`entry is ${n} chars, limit is ${LIMIT}`);
  if (text.includes("\n")) problems.push("entry must be one line");
  if (text.trim() !== text) problems.push("entry has stray outer whitespace");
  return problems;
}

const problems = validate(JOKE);
if (problems.length > 0) {
  throw new Error(`invalid entry: ${problems.join("; ")}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(TARGET, JOKE + "\n", "utf8");
console.log(`wrote ${TARGET} (${measure(JOKE)} chars)`);
