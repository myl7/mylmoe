/** To sync the GitHub profile with the one at mylmoe */

import { readFile } from "fs/promises";

const PROFILE_PATH = "src/content/fragments/myl7.md";
const EXTRA_HEADER = [
  "",
  "# Hi, I am myl7!",
  "",
  "![myl7's GitHub Stats](https://github-readme-stats.vercel.app/api?username=myl7&count_private=true&theme=gruvbox&show_icons=true)",
];

function isCommentLine(line: string) {
  return line.startsWith("<!--") && line.endsWith("-->");
}

const profile = await readFile(PROFILE_PATH, "utf-8");
const lines = profile.trim().split("\n");

// Currently it does not have a frontmatter, so comment the below lines
// const fmStart = lines.findIndex((line) => line == '---')
// lines.splice(0, fmStart + 1)
// const fmEnd = lines.findIndex((line) => line == '---')
// lines.splice(0, fmEnd + 1)

const legalStart = lines.findIndex(isCommentLine);
console.assert(legalStart != -1, "Legal header start not found");
const legalEnd = lines.slice(legalStart + 1).findIndex(isCommentLine) + legalStart + 1;
console.assert(legalEnd != legalStart, "Legal header end not found");
lines.splice(legalEnd + 1, 0, ...EXTRA_HEADER);

process.stdout.write(lines.join("\n") + "\n");
