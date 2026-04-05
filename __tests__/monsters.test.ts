import { BOSSES, MONSTERS, getMonstersByBoss, getBoss } from '@/lib/game/monsters';

describe('モンスター・ボスデータの整合性', () => {
  test('ボスは10体', () => {
    expect(BOSSES).toHaveLength(10);
  });

  test('モンスターは40体', () => {
    expect(MONSTERS).toHaveLength(40);
  });

  test('各ボスに4体のモンスターが紐付いている', () => {
    for (let bossId = 1; bossId <= 10; bossId++) {
      const monsters = getMonstersByBoss(bossId);
      expect(monsters).toHaveLength(4);
    }
  });

  test('全モンスターのIDがユニーク', () => {
    const ids = MONSTERS.map((m) => m.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test('全ボスのIDがユニーク', () => {
    const ids = BOSSES.map((b) => b.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test('getBoss は正しいボスを返す', () => {
    const boss = getBoss(1);
    expect(boss?.id).toBe(1);
    expect(boss?.name).toBe('鏡の魔王ナルキッソス');
  });

  test('存在しないボスIDはundefinedを返す', () => {
    expect(getBoss(99)).toBeUndefined();
  });

  test('各モンスターのorder は 1-4', () => {
    MONSTERS.forEach((m) => {
      expect(m.order).toBeGreaterThanOrEqual(1);
      expect(m.order).toBeLessThanOrEqual(4);
    });
  });

  test('各ボスに必要ステータスが設定されている', () => {
    BOSSES.forEach((boss) => {
      expect(boss.required_stats.length).toBeGreaterThan(0);
    });
  });
});
