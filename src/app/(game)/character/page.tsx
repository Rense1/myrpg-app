import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CharacterBuilder } from '@/components/character/CharacterBuilder';

export default async function CharacterPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // すでにキャラがあればホームへ
  const { data: character } = await supabase
    .from('characters')
    .select('id')
    .eq('user_id', user.id)
    .single();
  if (character) redirect('/home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950 pb-10">
      <div className="sticky top-0 bg-gray-950/90 backdrop-blur z-10 px-4 py-3 border-b border-gray-800">
        <h1 className="text-center text-yellow-400 font-bold text-lg tracking-wider">🎨 キャラメイク</h1>
      </div>
      <CharacterBuilder userId={user.id} />
    </div>
  );
}
