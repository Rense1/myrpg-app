'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません');
    } else {
      router.push('/home');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-gray-950 to-indigo-950">
      <div className="w-full max-w-sm">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">⚔️</div>
          <h1 className="text-2xl font-bold text-yellow-400 tracking-widest">RPGステータス</h1>
          <p className="text-gray-400 text-sm mt-1">育成アプリ</p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-950 font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          アカウントをお持ちでない方は{' '}
          <Link href="/register" className="text-yellow-400 hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
