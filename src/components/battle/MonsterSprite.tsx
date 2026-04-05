interface MonsterSpriteProps {
  name:   string;
  sprite: string;
  size?:  'sm' | 'md' | 'lg';
  shake?: boolean;
}

const sizeMap = {
  sm: 'w-16 h-16 text-4xl',
  md: 'w-24 h-24 text-5xl',
  lg: 'w-40 h-40 text-8xl',
};

// 仮のモンスター絵文字マッピング（後でドット絵に差し替え）
const MONSTER_EMOJIS: Record<number, string> = {
  1: '🪞', 2: '👻', 3: '🗿', 4: '🔮',
  5: '💪', 6: '👺', 7: '🐺', 8: '⚡',
  9: '📚', 10: '🧙', 11: '🔯', 12: '🌀',
  13: '💰', 14: '🐍', 15: '🐲', 16: '🗽',
  17: '🌫️', 18: '👁️', 19: '💔', 20: '😈',
  21: '🌑', 22: '⚔️', 23: '💎', 24: '👼',
  25: '🐟', 26: '🦑', 27: '🐉', 28: '🔭',
  29: '🦍', 30: '🛡️', 31: '🌪️', 32: '🌊',
  33: '⭐', 34: '🔷', 35: '🌑', 36: '💀',
  37: '👾', 38: '🤖', 39: '☠️', 40: '🌌',
};

const BOSS_EMOJIS: Record<number, string> = {
  1: '🎭', 2: '⚡', 3: '🔮', 4: '👑',
  5: '🌹', 6: '🏰', 7: '🌊', 8: '🌪️',
  9: '☄️', 10: '🌌',
};

export function MonsterSprite({ name, sprite, size = 'md', shake = false }: MonsterSpriteProps) {
  const dim = sizeMap[size];
  // spriteパスからIDを抽出して絵文字を選択
  const bossMatch = sprite.match(/boss_(\d+)/);
  const monsterMatch = sprite.match(/m_(\d+)/);
  const emoji = bossMatch
    ? BOSS_EMOJIS[parseInt(bossMatch[1])] ?? '👹'
    : monsterMatch
      ? MONSTER_EMOJIS[parseInt(monsterMatch[1])] ?? '👾'
      : '❓';

  return (
    <div
      className={`${dim} flex items-center justify-center rounded-xl bg-gray-800 border border-gray-700 ${shake ? 'animate-pulse' : ''}`}
      title={name}
    >
      <span className={sizeMap[size].split(' ')[2]}>{emoji}</span>
    </div>
  );
}
