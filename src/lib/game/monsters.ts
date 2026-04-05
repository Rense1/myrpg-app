import type { Monster, Boss } from '@/types';

// ============================================================
// ボス10体 + 各ボス前モンスター4体 = 合計50体
// required_stats は累積的に難易度上昇
// ============================================================

export const BOSSES: Boss[] = [
  {
    id: 1,
    name: '鏡の魔王ナルキッソス',
    sprite: '/sprites/monsters/boss_01.png',
    description: '容姿の美しさを糧に生きる孤独な魔王。',
    lore: '鏡の世界に住む美の支配者。自分より美しい者を許さない。',
    required_stats: [
      { stat: 'appearance', required: 50 },
      { stat: 'personality', required: 30 },
    ],
  },
  {
    id: 2,
    name: '嵐の拳将ストームフィスト',
    sprite: '/sprites/monsters/boss_02.png',
    description: '圧倒的な腕力で全てを制してきた戦士の王。',
    lore: '嵐を呼ぶ拳は山をも砕く。その力に屈せぬ者はいない。',
    required_stats: [
      { stat: 'strength', required: 60 },
      { stat: 'appearance', required: 30 },
    ],
  },
  {
    id: 3,
    name: '叡智の塔ブレインロード',
    sprite: '/sprites/monsters/boss_03.png',
    description: '千の知識を操る知の支配者。',
    lore: 'あらゆる学問を極めた存在。愚者を最も嫌う。',
    required_stats: [
      { stat: 'intelligence', required: 70 },
      { stat: 'personality', required: 40 },
    ],
  },
  {
    id: 4,
    name: '黄金の皇帝ゴールデムペラー',
    sprite: '/sprites/monsters/boss_04.png',
    description: '富と権力を独占する財力の化身。',
    lore: '世界中の財宝を集め続ける欲望の塊。',
    required_stats: [
      { stat: 'wealth', required: 80 },
      { stat: 'intelligence', required: 40 },
    ],
  },
  {
    id: 5,
    name: '共鳴の女王エンパシア',
    sprite: '/sprites/monsters/boss_05.png',
    description: '他者の感情を操る感情操作の魔女。',
    lore: '千の心を読み、千の涙を武器にする。',
    required_stats: [
      { stat: 'empathy', required: 80 },
      { stat: 'personality', required: 50 },
    ],
  },
  {
    id: 6,
    name: '完璧なる騎士パラゴン',
    sprite: '/sprites/monsters/boss_06.png',
    description: '全ての美徳を体現した理想の騎士。',
    lore: '容姿・性格・力すべてにおいて完璧を求める。',
    required_stats: [
      { stat: 'appearance', required: 80 },
      { stat: 'personality', required: 80 },
      { stat: 'strength', required: 60 },
    ],
  },
  {
    id: 7,
    name: '深淵の賢者アビスマインド',
    sprite: '/sprites/monsters/boss_07.png',
    description: '深海に潜む知恵と財力の古代神。',
    lore: '千年の知識と財力で世界の均衡を握る。',
    required_stats: [
      { stat: 'intelligence', required: 90 },
      { stat: 'wealth', required: 70 },
    ],
  },
  {
    id: 8,
    name: '嵐の共感者テンペストハート',
    sprite: '/sprites/monsters/boss_08.png',
    description: '力と共感力を兼ね備えた戦士の頂点。',
    lore: '戦いながら相手の苦しみを感じ、それを力に変える。',
    required_stats: [
      { stat: 'strength', required: 90 },
      { stat: 'empathy', required: 80 },
    ],
  },
  {
    id: 9,
    name: '超越者ネメシス',
    sprite: '/sprites/monsters/boss_09.png',
    description: '五つの才能を極めた伝説の覇者。',
    lore: '過去に世界を一度征服した存在。その再来を誰も望まない。',
    required_stats: [
      { stat: 'appearance', required: 90 },
      { stat: 'intelligence', required: 90 },
      { stat: 'strength', required: 90 },
      { stat: 'wealth', required: 80 },
      { stat: 'empathy', required: 80 },
    ],
  },
  {
    id: 10,
    name: '究極魔王オムニロード',
    sprite: '/sprites/monsters/boss_10.png',
    description: '全ステータスを超越した真の最強。',
    lore: '全ての価値観を超越した絶対的な存在。これを倒した者が真の勝者となる。',
    required_stats: [
      { stat: 'appearance',   required: 100 },
      { stat: 'personality',  required: 100 },
      { stat: 'intelligence', required: 100 },
      { stat: 'strength',     required: 100 },
      { stat: 'wealth',       required: 100 },
      { stat: 'empathy',      required: 100 },
    ],
  },
];

export const MONSTERS: Monster[] = [
  // ===== ボス1前 =====
  { id: 1,  boss_id: 1, order: 1, name: 'スライムミラー',      sprite: '/sprites/monsters/m_01.png', description: '鏡面の表面を持つスライム。', required_stats: [{ stat: 'appearance', required: 10 }] },
  { id: 2,  boss_id: 1, order: 2, name: 'ゴーストフェイス',     sprite: '/sprites/monsters/m_02.png', description: '顔のない幽霊。', required_stats: [{ stat: 'appearance', required: 15 }, { stat: 'personality', required: 10 }] },
  { id: 3,  boss_id: 1, order: 3, name: 'バニティゴーレム',     sprite: '/sprites/monsters/m_03.png', description: '虚栄心の塊で作られたゴーレム。', required_stats: [{ stat: 'appearance', required: 25 }, { stat: 'personality', required: 15 }] },
  { id: 4,  boss_id: 1, order: 4, name: 'プリズムナイト',       sprite: '/sprites/monsters/m_04.png', description: '七色に輝く鎧の騎士。', required_stats: [{ stat: 'appearance', required: 40 }, { stat: 'personality', required: 25 }] },
  // ===== ボス2前 =====
  { id: 5,  boss_id: 2, order: 1, name: 'マッスルスライム',     sprite: '/sprites/monsters/m_05.png', description: '筋肉質なスライム。', required_stats: [{ stat: 'strength', required: 15 }] },
  { id: 6,  boss_id: 2, order: 2, name: 'アイアンゴブリン',     sprite: '/sprites/monsters/m_06.png', description: '鉄の爪を持つゴブリン。', required_stats: [{ stat: 'strength', required: 25 }, { stat: 'appearance', required: 15 }] },
  { id: 7,  boss_id: 2, order: 3, name: 'ストームウルフ',       sprite: '/sprites/monsters/m_07.png', description: '嵐を呼ぶ大狼。', required_stats: [{ stat: 'strength', required: 40 }, { stat: 'appearance', required: 20 }] },
  { id: 8,  boss_id: 2, order: 4, name: 'サンダータイタン',     sprite: '/sprites/monsters/m_08.png', description: '雷を纏った巨人。', required_stats: [{ stat: 'strength', required: 55 }, { stat: 'appearance', required: 25 }] },
  // ===== ボス3前 =====
  { id: 9,  boss_id: 3, order: 1, name: 'ブックワーム',         sprite: '/sprites/monsters/m_09.png', description: '本を食べる虫型モンスター。', required_stats: [{ stat: 'intelligence', required: 15 }] },
  { id: 10, boss_id: 3, order: 2, name: 'スペルキャスター',      sprite: '/sprites/monsters/m_10.png', description: '魔法書を操る小悪魔。', required_stats: [{ stat: 'intelligence', required: 30 }, { stat: 'personality', required: 20 }] },
  { id: 11, boss_id: 3, order: 3, name: 'アーケインサーバント', sprite: '/sprites/monsters/m_11.png', description: '古代魔術を使う番人。', required_stats: [{ stat: 'intelligence', required: 50 }, { stat: 'personality', required: 30 }] },
  { id: 12, boss_id: 3, order: 4, name: 'ウィザードガーディアン', sprite: '/sprites/monsters/m_12.png', description: '叡智の塔を守る精霊。', required_stats: [{ stat: 'intelligence', required: 65 }, { stat: 'personality', required: 35 }] },
  // ===== ボス4前 =====
  { id: 13, boss_id: 4, order: 1, name: 'コインゴブリン',       sprite: '/sprites/monsters/m_13.png', description: '金貨を盗むゴブリン。', required_stats: [{ stat: 'wealth', required: 20 }] },
  { id: 14, boss_id: 4, order: 2, name: 'シルバーサーペント',   sprite: '/sprites/monsters/m_14.png', description: '銀の鱗を持つ蛇。', required_stats: [{ stat: 'wealth', required: 35 }, { stat: 'intelligence', required: 20 }] },
  { id: 15, boss_id: 4, order: 3, name: 'ゴールドドラゴン幼体', sprite: '/sprites/monsters/m_15.png', description: '黄金の卵から生まれた小竜。', required_stats: [{ stat: 'wealth', required: 55 }, { stat: 'intelligence', required: 30 }] },
  { id: 16, boss_id: 4, order: 4, name: 'トレジャーコロッサス', sprite: '/sprites/monsters/m_16.png', description: '財宝を体に纏った巨像。', required_stats: [{ stat: 'wealth', required: 70 }, { stat: 'intelligence', required: 38 }] },
  // ===== ボス5前 =====
  { id: 17, boss_id: 5, order: 1, name: 'エコーシェイド',       sprite: '/sprites/monsters/m_17.png', description: '感情の残像モンスター。', required_stats: [{ stat: 'empathy', required: 20 }] },
  { id: 18, boss_id: 5, order: 2, name: 'ソウルウィスパー',     sprite: '/sprites/monsters/m_18.png', description: '魂に囁く霊体。', required_stats: [{ stat: 'empathy', required: 35 }, { stat: 'personality', required: 25 }] },
  { id: 19, boss_id: 5, order: 3, name: 'ハートシーカー',       sprite: '/sprites/monsters/m_19.png', description: '心の弱点を突く暗殺者。', required_stats: [{ stat: 'empathy', required: 55 }, { stat: 'personality', required: 38 }] },
  { id: 20, boss_id: 5, order: 4, name: 'エモーションタイラント', sprite: '/sprites/monsters/m_20.png', description: '感情を支配する独裁者。', required_stats: [{ stat: 'empathy', required: 72 }, { stat: 'personality', required: 45 }] },
  // ===== ボス6前 =====
  { id: 21, boss_id: 6, order: 1, name: 'シャドウスクワイア',   sprite: '/sprites/monsters/m_21.png', description: '完璧さに憧れる見習い。', required_stats: [{ stat: 'appearance', required: 55 }, { stat: 'personality', required: 40 }] },
  { id: 22, boss_id: 6, order: 2, name: 'シルバーナイト',       sprite: '/sprites/monsters/m_22.png', description: '銀の甲冑を纏った騎士。', required_stats: [{ stat: 'appearance', required: 65 }, { stat: 'personality', required: 55 }, { stat: 'strength', required: 35 }] },
  { id: 23, boss_id: 6, order: 3, name: 'クリスタルパラディン', sprite: '/sprites/monsters/m_23.png', description: '水晶の盾を持つ聖騎士。', required_stats: [{ stat: 'appearance', required: 72 }, { stat: 'personality', required: 68 }, { stat: 'strength', required: 48 }] },
  { id: 24, boss_id: 6, order: 4, name: 'ヴィルトゥエンジェル', sprite: '/sprites/monsters/m_24.png', description: '美徳の化身たる天使騎士。', required_stats: [{ stat: 'appearance', required: 78 }, { stat: 'personality', required: 75 }, { stat: 'strength', required: 55 }] },
  // ===== ボス7前 =====
  { id: 25, boss_id: 7, order: 1, name: 'アビスフィッシュ',     sprite: '/sprites/monsters/m_25.png', description: '深海の発光魚。', required_stats: [{ stat: 'intelligence', required: 65 }, { stat: 'wealth', required: 45 }] },
  { id: 26, boss_id: 7, order: 2, name: 'クリプトスクリーチャー', sprite: '/sprites/monsters/m_26.png', description: '暗号を操る深淵の生物。', required_stats: [{ stat: 'intelligence', required: 75 }, { stat: 'wealth', required: 55 }] },
  { id: 27, boss_id: 7, order: 3, name: 'リバイアサンスポーン', sprite: '/sprites/monsters/m_27.png', description: '深淵の大蛇の子。', required_stats: [{ stat: 'intelligence', required: 82 }, { stat: 'wealth', required: 62 }] },
  { id: 28, boss_id: 7, order: 4, name: 'オーシャンオラクル',   sprite: '/sprites/monsters/m_28.png', description: '海の底から予言を語る。', required_stats: [{ stat: 'intelligence', required: 88 }, { stat: 'wealth', required: 68 }] },
  // ===== ボス8前 =====
  { id: 29, boss_id: 8, order: 1, name: 'ラージビーストゴブ',   sprite: '/sprites/monsters/m_29.png', description: '力強く共感力を持つ獣人。', required_stats: [{ stat: 'strength', required: 65 }, { stat: 'empathy', required: 55 }] },
  { id: 30, boss_id: 8, order: 2, name: 'ウォーエンパス',       sprite: '/sprites/monsters/m_30.png', description: '戦場で仲間の痛みを感じる戦士。', required_stats: [{ stat: 'strength', required: 75 }, { stat: 'empathy', required: 65 }] },
  { id: 31, boss_id: 8, order: 3, name: 'バーサーカーハート',   sprite: '/sprites/monsters/m_31.png', description: '激情で戦う共感の戦士。', required_stats: [{ stat: 'strength', required: 84 }, { stat: 'empathy', required: 72 }] },
  { id: 32, boss_id: 8, order: 4, name: 'テンペストウォリアー', sprite: '/sprites/monsters/m_32.png', description: '嵐の中心で戦う感情の戦士。', required_stats: [{ stat: 'strength', required: 88 }, { stat: 'empathy', required: 78 }] },
  // ===== ボス9前 =====
  { id: 33, boss_id: 9, order: 1, name: 'クインテッセンス',     sprite: '/sprites/monsters/m_33.png', description: '五つの元素を持つ存在。', required_stats: [{ stat: 'appearance', required: 72 }, { stat: 'intelligence', required: 72 }, { stat: 'strength', required: 72 }] },
  { id: 34, boss_id: 9, order: 2, name: 'ペンタゴンゴーレム',   sprite: '/sprites/monsters/m_34.png', description: '五角形の体を持つゴーレム。', required_stats: [{ stat: 'appearance', required: 80 }, { stat: 'intelligence', required: 80 }, { stat: 'wealth', required: 65 }] },
  { id: 35, boss_id: 9, order: 3, name: 'アルティメットシャドウ', sprite: '/sprites/monsters/m_35.png', description: 'ネメシスの影から生まれた存在。', required_stats: [{ stat: 'appearance', required: 85 }, { stat: 'intelligence', required: 85 }, { stat: 'strength', required: 82 }, { stat: 'wealth', required: 72 }] },
  { id: 36, boss_id: 9, order: 4, name: 'ネメシスヴァンガード',  sprite: '/sprites/monsters/m_36.png', description: 'ネメシスの前衛部隊長。', required_stats: [{ stat: 'appearance', required: 88 }, { stat: 'intelligence', required: 88 }, { stat: 'strength', required: 88 }, { stat: 'wealth', required: 78 }, { stat: 'empathy', required: 75 }] },
  // ===== ボス10前 =====
  { id: 37, boss_id: 10, order: 1, name: 'オムニスポーン1',     sprite: '/sprites/monsters/m_37.png', description: '究極魔王の分身その一。', required_stats: [{ stat: 'appearance', required: 90 }, { stat: 'personality', required: 85 }, { stat: 'intelligence', required: 85 }] },
  { id: 38, boss_id: 10, order: 2, name: 'オムニスポーン2',     sprite: '/sprites/monsters/m_38.png', description: '究極魔王の分身その二。', required_stats: [{ stat: 'strength', required: 90 }, { stat: 'wealth', required: 88 }, { stat: 'empathy', required: 85 }] },
  { id: 39, boss_id: 10, order: 3, name: 'オムニスポーン3',     sprite: '/sprites/monsters/m_39.png', description: '究極魔王の分身その三。', required_stats: [{ stat: 'appearance', required: 95 }, { stat: 'personality', required: 92 }, { stat: 'intelligence', required: 95 }, { stat: 'strength', required: 92 }] },
  { id: 40, boss_id: 10, order: 4, name: 'オムニガーディアン',   sprite: '/sprites/monsters/m_40.png', description: '究極魔王の最後の守護者。', required_stats: [{ stat: 'appearance', required: 98 }, { stat: 'personality', required: 95 }, { stat: 'intelligence', required: 98 }, { stat: 'strength', required: 98 }, { stat: 'wealth', required: 95 }, { stat: 'empathy', required: 95 }] },
];

export function getMonstersByBoss(bossId: number): Monster[] {
  return MONSTERS.filter((m) => m.boss_id === bossId).sort((a, b) => a.order - b.order);
}

export function getBoss(bossId: number): Boss | undefined {
  return BOSSES.find((b) => b.id === bossId);
}
