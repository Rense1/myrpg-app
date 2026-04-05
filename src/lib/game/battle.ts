import type { Stats, RequiredStats, BattleResult } from '@/types';

/**
 * 戦闘判定：全必要ステータスを上回っていれば勝利
 */
export function judgeBattle(
  playerStats: Stats,
  requiredStats: RequiredStats[]
): BattleResult {
  const allMet = requiredStats.every(({ stat, required }) => {
    const playerValue = playerStats[stat] ?? 0;
    return playerValue >= required;
  });
  return allMet ? 'win' : 'lose';
}

/**
 * 不足ステータス一覧を返す
 */
export function getMissingStats(
  playerStats: Stats,
  requiredStats: RequiredStats[]
): Array<{ stat: string; current: number; required: number; diff: number }> {
  return requiredStats
    .filter(({ stat, required }) => (playerStats[stat] ?? 0) < required)
    .map(({ stat, required }) => ({
      stat,
      current:  playerStats[stat] ?? 0,
      required,
      diff:     required - (playerStats[stat] ?? 0),
    }));
}
