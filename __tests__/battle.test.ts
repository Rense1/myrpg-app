import { judgeBattle, getMissingStats } from '@/lib/game/battle';
import type { Stats, RequiredStats } from '@/types';

describe('judgeBattle', () => {
  test('全ステータスが必要値以上の場合は勝利', () => {
    const stats: Stats = { appearance: 60, strength: 80 };
    const required: RequiredStats[] = [
      { stat: 'appearance', required: 50 },
      { stat: 'strength',   required: 70 },
    ];
    expect(judgeBattle(stats, required)).toBe('win');
  });

  test('1つでも不足している場合は敗北', () => {
    const stats: Stats = { appearance: 60, strength: 60 };
    const required: RequiredStats[] = [
      { stat: 'appearance', required: 50 },
      { stat: 'strength',   required: 70 },  // 不足
    ];
    expect(judgeBattle(stats, required)).toBe('lose');
  });

  test('ステータスが0の場合も正常に判定される', () => {
    const stats: Stats = {};
    const required: RequiredStats[] = [{ stat: 'appearance', required: 10 }];
    expect(judgeBattle(stats, required)).toBe('lose');
  });

  test('必要ステータスが空配列の場合は勝利', () => {
    const stats: Stats = { appearance: 100 };
    expect(judgeBattle(stats, [])).toBe('win');
  });

  test('ちょうど必要値と等しい場合は勝利', () => {
    const stats: Stats = { intelligence: 50 };
    const required: RequiredStats[] = [{ stat: 'intelligence', required: 50 }];
    expect(judgeBattle(stats, required)).toBe('win');
  });
});

describe('getMissingStats', () => {
  test('不足ステータスのリストを正しく返す', () => {
    const stats: Stats = { appearance: 30, strength: 80 };
    const required: RequiredStats[] = [
      { stat: 'appearance', required: 50 },
      { stat: 'strength',   required: 70 },
    ];
    const missing = getMissingStats(stats, required);
    expect(missing).toHaveLength(1);
    expect(missing[0].stat).toBe('appearance');
    expect(missing[0].diff).toBe(20);
  });

  test('全ステータスが満たされている場合は空配列を返す', () => {
    const stats: Stats = { appearance: 100, strength: 100 };
    const required: RequiredStats[] = [
      { stat: 'appearance', required: 50 },
      { stat: 'strength',   required: 70 },
    ];
    expect(getMissingStats(stats, required)).toHaveLength(0);
  });
});
