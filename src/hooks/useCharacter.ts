'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Character, Stats, StatGain } from '@/types';

export function useCharacter(userId: string | undefined) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchCharacter = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const { data } = await supabase
      .from('characters')
      .select('*')
      .eq('user_id', userId)
      .single();
    setCharacter(data as Character | null);
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchCharacter(); }, [fetchCharacter]);

  const applyStatGains = useCallback(async (gains: StatGain[]) => {
    if (!character) return;
    const newStats: Stats = { ...character.stats };
    gains.forEach(({ stat, value }) => {
      newStats[stat] = (newStats[stat] ?? 0) + value;
    });
    const { data } = await supabase
      .from('characters')
      .update({ stats: newStats })
      .eq('id', character.id)
      .select()
      .single();
    if (data) setCharacter(data as Character);
  }, [character]);

  return { character, loading, refetch: fetchCharacter, applyStatGains };
}
