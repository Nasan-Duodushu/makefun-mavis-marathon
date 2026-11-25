// One-Liner Marathon — one joke, up to 280 chars, written to /output/entry.txt.
// Judge: a deadpan stand-up comic, pairwise. Surprise, economy and a distinct
// voice win; a setup with no punchline loses to any real one-liner.
import { mkdir, writeFile } from "node:fs/promises";

const MAX_CHARS = 280;
const LINE =
  "My smart fridge ordered the milk, then emailed me a self-help book about boundaries. The milk is now judging me.";

function charCount(line: string): number {
  return [...line].length;
}

function check(line: string): void {
  const chars = charCount(line);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars, gate is 1-${MAX_CHARS}`);
  }
  if (!line.trim()) throw new Error("entry is only whitespace");
  if (line.includes("\n")) throw new Error("entry must be a single line");
}

async function main(): Promise<void> {
  check(LINE);
  await mkdir("/output", { recursive: true });
  await writeFile("/output/entry.txt", LINE + "\n", "utf8");
  console.log(`wrote /output/entry.txt (${charCount(LINE)} chars)`);
}

await main();
