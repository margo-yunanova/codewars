type TRank = {
  rank: number;
  name: string;
  color: string;
  score: number;
};

type TRanks = {
  overall: TRank;
  languages: {
    [key: string]: TRank;
  };
};

type TCodeChallenges = {
  totalAuthored: number;
  totalCompleted: number;
};

export type TUser = {
  username: string;
  name: string;
  honor: number;
  clan: string;
  leaderboardPosition: number;
  skills: string[];
  ranks: TRanks;
  codeChallenges: TCodeChallenges;
};
