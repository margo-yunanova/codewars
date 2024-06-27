import type { Config, Context } from "@netlify/edge-functions";
import { getUser } from "../../src/api.ts";
import { simpleStats } from "../../src/stats.ts";

const TOTAL_USER = (8934 / 1.382) * 100;

export default async function handler(req: Request, context: Context) {
  const login = new URL(req.url).searchParams.get("login") ?? "";

  const user = await getUser(login);

  const formattedLeaderboardPosition = new Intl.NumberFormat("ru-RU").format(
    user.leaderboardPosition
  );
  const formattedPercentileHonor = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(user.leaderboardPosition / TOTAL_USER);
  const formattedHonor = new Intl.NumberFormat("ru-RU").format(user.honor);
  const formattedTotalCompletedKata = new Intl.NumberFormat("ru-RU").format(
    user.codeChallenges.totalCompleted
  );

  const skills = Object.entries(user.ranks.languages)
    .map(([lang, { rank }]) => [lang, rank])
    .sort(([, a], [, b]) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
    .slice(0, 3)
    .map(([lang]) => lang);

  const newSimpleStats = simpleStats
    .replace("LOGIN", user.username)
    .replace("RANK", user.ranks.overall.name)
    .replace("SOLVED", formattedTotalCompletedKata)
    .replace("SKILLS", skills.join(", "))
    .replace("PERCENTILE", formattedPercentileHonor)
    .replace("HONOR", formattedHonor)
    .replace("POSITION", formattedLeaderboardPosition);

  return new Response(newSimpleStats, {
    status: 200,
    headers: { "Content-Type": "image/svg+xml" },
  });
}

export const config: Config = {
  path: "/",
};
