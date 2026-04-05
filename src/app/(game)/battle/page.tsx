import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { BattleClient } from './BattleClient';
import type { Character } from '@/types';

export default async function BattlePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: charData } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (!charData) redirect('/character');

  const { data: records } = await supabase
    .from('battle_records')
    .select('enemy_id, enemy_type, result')
    .eq('user_id', user.id)
    .eq('result', 'win');

  const wonMonsterIds = (records ?? []).filter((r) => r.enemy_type === 'monster').map((r) => r.enemy_id as number);
  const wonBossIds    = (records ?? []).filter((r) => r.enemy_type === 'boss').map((r) => r.enemy_id as number);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="sticky top-0 bg-gray-950/90 backdrop-blur z-10 px-4 py-3 border-b border-gray-800 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-white">←</Link>
        <h1 className="text-yellow-400 font-bold text-lg flex-1 text-center">⚔️ 戦闘</h1>
        <div className="w-6" />
      </div>
      <BattleClient
        userId={user.id}
        character={charData as Character}
        wonMonsterIds={wonMonsterIds}
        wonBossIds={wonBossIds}
      />
    </div>
  );
}
