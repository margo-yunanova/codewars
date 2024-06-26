import type { Config, Context } from "@netlify/edge-functions";
import { getUser } from "../../src/api.ts";

const TOTAL_USER = 646000;
const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Layer 1</title>
    <rect rx="5" id="svg_1" height="170" width="373.99999" y="12" x="9" fill="#000000" stroke="#000" />
    <path id="svg_5"
      d="m230.41507,115l29.35716,-36.5l78.28575,0l29.35715,36.5l-29.35715,36.5l-78.28575,0l-29.35716,-36.5z"
      stroke-width="5" stroke="#a855f7" fill="none" />
    <text transform="matrix(1.72157 0 0 1.38001 -282.47 -74.5433)" stroke="#ffffff" font-style="normal"
      font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'" font-size="18"
      stroke-width="0" id="svg_3" y="143.34815" x="317.52163" fill="#a855f7">RANK</text>
    <text transform="matrix(1.72157 0 0 1.38001 -282.47 -74.5433)" stroke="#ffffff" font-style="normal"
      font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'" font-size="18"
      stroke-width="0" id="svg_4" y="93.70092" x="179.30748" fill="#a855f7">Codewars Stats</text>
    <text style="cursor: move;" transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff"
      font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'"
      font-size="14" stroke-width="0" id="svg_6" y="151.97168" x="245.02805" fill="#ffffff">SOLVED</text>
    <text transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff" font-style="normal"
      font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'" font-size="14"
      stroke-width="0" id="svg_7" y="121.60918" x="133.54445" fill="#ffffff">Honor Percentile:</text>
    <text transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff" font-style="normal"
      font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'" font-size="14"
      stroke-width="0" id="svg_8" y="136.97168" x="133.3656" fill="#ffffff">Honor:</text>
    <text style="cursor: move;" transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff"
      font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'"
      font-size="14" stroke-width="0" id="svg_9" y="151.97168" x="133.54437" fill="#ffffff">Solved Katas:</text>
    <text style="cursor: move;" transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff"
      font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'"
      font-size="14" stroke-width="0" id="svg_10" y="167.26103" x="133.3656" fill="#ffffff">Skills:</text>
    <text style="cursor: move;" transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff"
      font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'"
      font-size="14" stroke-width="0" id="svg_11" y="166.53639" x="244.64869" fill="#ffffff">SKILLS</text>
    <text transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff" font-style="normal"
      font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'" font-size="14"
      stroke-width="0" id="svg_12" y="121.97168" x="245.0277" fill="#ffffff">PERCENTILE</text>
    <text transform="matrix(1.21312 0 0 1.38001 -133.727 -74.5433)" stroke="#ffffff" font-style="normal"
      font-weight="normal" xml:space="preserve" text-anchor="start" font-family="'Assistant'" font-size="14"
      stroke-width="0" id="svg_13" y="136.97168" x="245.0277" fill="#ffffff">HONOR</text>
  </g>
</svg>`;

export default async function handler(req: Request, context: Context) {
  const login = new URL(req.url).searchParams.get("login") ?? "";

  const user = await getUser(login);

  const percentile = ((user.leaderboardPosition / TOTAL_USER) * 100).toFixed(2);
  const skills = Object.entries(user.ranks.languages).map(([lang]) => lang);
  const newSvg = svg
    .replace("RANK", user.ranks.overall.name)
    .replace("SOLVED", user.codeChallenges.totalCompleted.toString())
    .replace("SKILLS", skills.join(", "))
    .replace("PERCENTILE", percentile.toString() + "%")
    .replace("HONOR", user.honor.toString());

  return new Response(newSvg, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

export const config: Config = {
  path: "/",
};
