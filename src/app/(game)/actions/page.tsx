import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ActionsClient } from './ActionsClient';
import type { Character } from '@/types';

export default async function ActionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (!data) redirect('/character');

  const character = data as Character;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="sticky top-0 bg-gray-950/90 backdrop-blur z-10 px-4 py-3 border-b border-gray-800 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-white">←</Link>
        <h1 className="text-yellow-400 font-bold text-lg flex-1 text-center">⚡ 行動する</h1>
        <div className="w-6" />
      </div>
      <ActionsClient userId={user.id} character={character} />
    </div>
  );
}
