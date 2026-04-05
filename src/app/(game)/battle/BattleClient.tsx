'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BattleScene } from '@/components/battle/BattleScene';
import { MonsterSprite } from '@/components/battle/MonsterSprite';
import { useBattle } from '@/hooks/useBattle';
import { BOSSES, MONSTERS, getMonstersByBoss } from '@/lib/game/monsters';
import { getMissingStats } from '@/lib/game/battle';
import { STAT_LABELS } from '@/types';
import type { Character, Monster, Boss } from '@/types';

interface BattleClientProps {
  userId:        string;
  character:     Character;
  wonMonsterIds: number[];
  wonBossIds:    number[];
}

export function BattleClient({ userId, character, wonMonsterIds, wonBossIds }: BattleClientProps) {
  const [selectedEnemy, setSelectedEnemy] = useState<{ enemy: Monster | Boss; type: 'monster' | 'boss' } | null>(null);
  const { result, pattern, animating, startBattle, reset } = useBattle(character, userId);
  const router = useRouter();

  const handleFight = (enemy: Monster | Boss, type: 'monster' | 'boss') => {
    setSelectedEnemy({ enemy, type });
    startBattle(enemy, type);
  };

  const handleClose = () => {
    reset();
    setSelectedEnemy(null);
    router.refresh();
  };

  if (selectedEnemy) {
    return (
      <BattleScene
        enemy={selectedEnemy.enemy}
        enemyType={selectedEnemy.type}
        result={result}
        pattern={pattern}
        animating={animating}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      {BOSSES.map((boss) => {
        const monsters = getMonstersByBoss(boss.id);
        const bossWon  = wonBossIds.includes(boss.id);
        const prevBossWon = boss.id === 1 || wonBossIds.includes(boss.id - 1);

        return (
          <div key={boss.id} className="space-y-2">
            {/* ボスセクションタイトル */}
            <div className="flex items-center gap-2">
              <span className="text-red-400 text-xs font-bold bg-red-900/40 px-2 py-0.5 rounded-full">BOSS {boss.id}</span>
              <h2 className="text-white font-bold text-sm">{boss.name}</h2>
              {bossWon && <span className="text-yellow-400 text-xs">✅ 撃破</span>}
            </div>

            {/* モンスター4体 */}
            <div className="grid grid-cols-4 gap-2">
              {monsters.map((monster) => {
                const won     = wonMonsterIds.includes(monster.id);
                const missing = getMissingStats(character.stats, monster.required_stats);
                const canFight = prevBossWon;
                return (
                  <button
                    key={monster.id}
                    onClick={() => canFight && handleFight(monster, 'monster')}
                    disabled={!canFight}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-colors ${won ? 'border-green-700 bg-green-900/20' : canFight ? 'border-gray-700 bg-gray-900 hover:border-yellow-500' : 'border-gray-800 bg-gray-900/20 opacity-40'}`}
                  >
                    <MonsterSprite name={monster.name} sprite={monster.sprite} size="sm" />
                    <p className="text-xs text-gray-400 truncate w-full text-center">{monster.name}</p>
                    {won
                      ? <span className="text-green-400 text-xs">✓</span>
                      : missing.length > 0 && canFight
                        ? <span className="text-red-400 text-xs">↑{missing[0].stat.slice(0, 2)}</span>
                        : null}
                  </button>
                );
              })}
            </div>

            {/* ボス */}
            <button
              onClick={() => prevBossWon && monsters.every((m) => wonMonsterIds.includes(m.id)) && handleFight(boss, 'boss')}
              disabled={!prevBossWon || !monsters.every((m) => wonMonsterIds.includes(m.id))}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${bossWon ? 'border-yellow-700 bg-yellow-900/20' : prevBossWon && monsters.every((m) => wonMonsterIds.includes(m.id)) ? 'border-red-700 bg-red-900/20 hover:border-red-500' : 'border-gray-800 bg-gray-900/20 opacity-40'}`}
            >
              <MonsterSprite name={boss.name} sprite={boss.sprite} size="md" />
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-red-400 text-xs">👑 BOSS</span>
                  {bossWon && <span className="text-yellow-400 text-xs">✅</span>}
                </div>
                <p className="text-white font-bold">{boss.name}</p>
                <p className="text-gray-400 text-xs">{boss.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {boss.required_stats.map(({ stat, required }) => (
                    <span key={stat} className="text-xs bg-gray-800 text-yellow-400 px-1.5 py-0.5 rounded">
                      {STAT_LABELS[stat]}:{required}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
