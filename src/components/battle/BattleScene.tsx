'use client';

import { useEffect, useState } from 'react';
import { MonsterSprite } from './MonsterSprite';
import { STAT_LABELS } from '@/types';
import type { Monster, Boss, BattleResult, BattlePattern } from '@/types';

interface BattleSceneProps {
  enemy:      Monster | Boss;
  enemyType:  'monster' | 'boss';
  result:     BattleResult | null;
  pattern:    BattlePattern;
  animating:  boolean;
  onClose:    () => void;
}

// 戦闘メッセージ（勝ち2種・負け2種）
const WIN_MESSAGES: Record<BattlePattern, string[]> = {
  1: ['✨ 完璧な一撃！', '敵は塵と化した！', '勝利の雄叫びが響き渡る！'],
  2: ['⚡ 電光石火！', 'あまりの力に敵は膝をついた！', '完全勝利だ！'],
};

const LOSE_MESSAGES: Record<BattlePattern, string[]> = {
  1: ['💥 まだ力が足りない...', '敵の壁は厚い。もっと成長しよう。', '敗北...だが諦めない！'],
  2: ['🌑 暗闇に倒れる...', 'ステータスが足りなかった。', '鍛え直して戻ってこい！'],
};

export function BattleScene({ enemy, enemyType, result, pattern, animating, onClose }: BattleSceneProps) {
  const [messageIdx, setMessageIdx] = useState(0);
  const messages = result === 'win' ? WIN_MESSAGES[pattern] : result === 'lose' ? LOSE_MESSAGES[pattern] : [];

  useEffect(() => {
    if (!result) return;
    const interval = setInterval(() => {
      setMessageIdx((i) => (i < messages.length - 1 ? i + 1 : i));
    }, 800);
    return () => clearInterval(interval);
  }, [result, messages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950 flex flex-col">
      {/* 戦場背景 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
        {/* 敵エリア */}
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${animating && !result ? 'scale-110' : result === 'lose' ? 'opacity-100' : result === 'win' ? 'opacity-30 scale-75' : ''}`}>
          <MonsterSprite
            name={enemy.name}
            sprite={enemy.sprite}
            size="lg"
            shake={animating && !result}
          />
          <p className="text-white font-bold text-lg">{enemy.name}</p>
          {enemyType === 'boss' && <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded-full">BOSS</span>}
        </div>

        {/* VSテキスト */}
        <p className="text-gray-500 text-2xl font-black">VS</p>

        {/* 必要ステータス */}
        <div className="bg-gray-900/80 rounded-xl p-3 w-full max-w-xs">
          <p className="text-xs text-gray-400 mb-2 text-center">必要ステータス</p>
          <div className="space-y-1">
            {enemy.required_stats.map(({ stat, required }) => (
              <div key={stat} className="flex justify-between text-sm">
                <span className="text-gray-300">{STAT_LABELS[stat]}</span>
                <span className="text-yellow-400 font-mono">{required}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 戦闘アニメーション / 結果 */}
        {animating && !result && (
          <div className="text-center space-y-2">
            <div className="text-4xl animate-spin">⚔️</div>
            <p className="text-yellow-400 font-bold animate-pulse">戦闘中...</p>
          </div>
        )}

        {result && (
          <div className={`text-center p-6 rounded-2xl w-full ${result === 'win' ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-red-500/20 border border-red-500'}`}>
            <p className="text-4xl mb-2">{result === 'win' ? '🏆' : '💀'}</p>
            <p className={`text-2xl font-black mb-3 ${result === 'win' ? 'text-yellow-400' : 'text-red-400'}`}>
              {result === 'win' ? 'VICTORY!' : 'DEFEAT...'}
            </p>
            <p className="text-white text-sm">{messages[messageIdx]}</p>
          </div>
        )}
      </div>

      {result && (
        <div className="p-6">
          <button
            onClick={onClose}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold py-4 rounded-xl text-lg transition-colors"
          >
            {result === 'win' ? '次へ進む →' : '鍛え直す 💪'}
          </button>
        </div>
      )}
    </div>
  );
}
