import type { CharacterParts } from '@/types';

interface CharacterSpriteProps {
  parts: CharacterParts;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-40 h-40',
};

// 各パーツの色マッピング（仮のプレースホルダー）
const HAT_COLORS: Record<string, string>    = { hat1: 'bg-red-600', hat2: 'bg-blue-600', hat3: 'bg-green-600', hat4: 'bg-purple-600', hat5: 'bg-yellow-500' };
const FACE_COLORS: Record<string, string>   = { face1: 'bg-amber-300', face2: 'bg-orange-300', face3: 'bg-yellow-200', face4: 'bg-pink-300', face5: 'bg-amber-200' };
const TOP_COLORS: Record<string, string>    = { top1: 'bg-blue-500', top2: 'bg-green-500', top3: 'bg-red-500', top4: 'bg-purple-500', top5: 'bg-gray-500' };
const BOTTOM_COLORS: Record<string, string> = { bottom1: 'bg-indigo-700', bottom2: 'bg-gray-700', bottom3: 'bg-brown-700', bottom4: 'bg-blue-800', bottom5: 'bg-green-800' };

export function CharacterSprite({ parts, size = 'md' }: CharacterSpriteProps) {
  const dim = sizeMap[size];
  return (
    <div className={`${dim} flex flex-col items-center justify-center relative select-none`}>
      {/* 帽子 */}
      <div className={`w-1/2 h-[15%] ${HAT_COLORS[parts.hat] ?? 'bg-gray-500'} rounded-t-lg`} />
      {/* 顔 */}
      <div className={`w-1/2 h-[25%] ${FACE_COLORS[parts.face] ?? 'bg-amber-300'} flex items-center justify-center text-xs`}>
        <span style={{ fontSize: size === 'lg' ? '1rem' : '0.5rem' }}>👀</span>
      </div>
      {/* 上半身 */}
      <div className={`w-3/5 h-[30%] ${TOP_COLORS[parts.top] ?? 'bg-blue-500'} rounded-sm`} />
      {/* 下半身 */}
      <div className={`w-2/5 h-[30%] ${BOTTOM_COLORS[parts.bottom] ?? 'bg-indigo-700'} rounded-b-sm`} />
    </div>
  );
}
