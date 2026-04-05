import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { CharacterSprite } from '@/components/character/CharacterSprite';
import { StatusPanel } from '@/components/status/StatusPanel';
import type { Character } from '@/types';

export default async function HomePage() {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950 flex flex-col">
      {/* ヘッダー */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs">プレイヤー</p>
          <h1 className="text-yellow-400 font-black text-xl">{character.name}</h1>
        </div>
        <form action="/api/auth/signout" method="post">
          <button className="text-gray-500 hover:text-white text-sm">ログアウト</button>
        </form>
      </div>

      {/* キャラクタービジュアル */}
      <div className="flex justify-center py-6 bg-gray-900/30">
        <div className="flex flex-col items-center gap-2">
          <div className="w-36 h-36 rounded-full bg-gray-800 border-2 border-yellow-500/30 flex items-center justify-center">
            <CharacterSprite parts={character.parts} size="lg" />
          </div>
          <p className="text-gray-400 text-xs">Lv.{Math.floor(Object.values(character.stats).reduce((a, b) => a + (b ?? 0), 0) / 100) + 1}</p>
        </div>
      </div>

      {/* ステータスパネル */}
      <div className="px-4 py-4">
        <StatusPanel stats={character.stats} selectedStats={character.selected_stats} />
      </div>

      {/* ナビゲーション */}
      <div className="px-4 mt-auto pb-8 grid grid-cols-2 gap-3">
        <Link
          href="/actions"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 text-center transition-colors"
        >
          <p className="text-2xl mb-1">⚡</p>
          <p className="text-white font-bold">行動する</p>
          <p className="text-gray-500 text-xs">ステータスを上げる</p>
        </Link>
        <Link
          href="/battle"
          className="bg-gray-800 hover:bg-gray-700 border border-yellow-700 rounded-xl p-4 text-center transition-colors"
        >
          <p className="text-2xl mb-1">⚔️</p>
          <p className="text-yellow-400 font-bold">戦闘する</p>
          <p className="text-gray-500 text-xs">モンスターに挑む</p>
        </Link>
      </div>
    </div>
  );
}
