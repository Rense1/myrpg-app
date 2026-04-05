'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { judgeBattle } from '@/lib/game/battle';
import type { Character, Monster, Boss, BattleResult, BattlePattern } from '@/types';

export function useBattle(character: Character | null, userId: string | undefined) {
  const [result, setResult] = useState<BattleResult | null>(null);
  const [pattern, setPattern] = useState<BattlePattern>(1);
  const [animating, setAnimating] = useState(false);
  const supabase = createClient();

  const startBattle = async (enemy: Monster | Boss, enemyType: 'monster' | 'boss') => {
    if (!character || !userId || animating) return;
    setAnimating(true);

    const battleResult = judgeBattle(character.stats, enemy.required_stats);
    const selectedPattern: BattlePattern = (Math.random() < 0.5 ? 1 : 2);
    setResult(battleResult);
    setPattern(selectedPattern);

    await supabase.from('battle_records').insert({
      user_id:    userId,
      enemy_type: enemyType,
      enemy_id:   enemy.id,
      result:     battleResult,
      pattern:    selectedPattern,
    });

    setTimeout(() => setAnimating(false), 2000);
  };

  const reset = () => { setResult(null); setPattern(1); };

  return { result, pattern, animating, startBattle, reset };
}
