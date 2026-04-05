# デプロイ手順

## 1. Supabase プロジェクト作成

1. https://supabase.com にアクセスしてプロジェクトを作成
2. **Settings → API** で以下を取得:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **SQL Editor** で `supabase/migrations/001_initial.sql` を実行

## 2. ローカル開発

```bash
# 環境変数ファイルを作成
cp .env.local.example .env.local
# .env.local を編集して Supabase の値を入力

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
# → http://localhost:3000
```

## 3. Supabase Auth 設定

Supabaseダッシュボード → **Authentication → URL Configuration** で:
- **Site URL**: `http://localhost:3000`（開発時）/ Vercel URL（本番）
- **Redirect URLs**: `http://localhost:3000/**`（開発）/ `https://your-app.vercel.app/**`（本番）

## 4. GitHub に push

```bash
git init
git add .
git commit -m "feat: initial RPG status app setup"
git remote add origin https://github.com/YOUR_USERNAME/myrpg-app.git
git push -u origin main
```

## 5. Vercel デプロイ

1. https://vercel.com/new でリポジトリをインポート
2. **Environment Variables** に以下を設定:
   ```
   NEXT_PUBLIC_SUPABASE_URL     = <Supabase Project URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <Supabase anon key>
   NEXT_PUBLIC_SITE_URL          = https://your-app.vercel.app
   ```
3. **Deploy** をクリック
4. デプロイ完了後、Supabase Auth の **Site URL** と **Redirect URLs** をVercel URLに更新

---

## コミット計画（推奨単位）

| # | コミットメッセージ | 内容 |
|---|---|---|
| 1 | `chore: init Next.js 14 + TypeScript + Tailwind` | プロジェクト初期化 |
| 2 | `feat: add type definitions and constants` | types/index.ts, lib/constants.ts |
| 3 | `feat: add Supabase client/server/middleware` | lib/supabase/, middleware.ts |
| 4 | `feat: add database migration with RLS` | supabase/migrations/001_initial.sql |
| 5 | `feat: add game logic (battle, monsters)` | lib/game/battle.ts, monsters.ts |
| 6 | `feat: add auth pages (login, register)` | app/(auth)/login, register |
| 7 | `feat: add character creation flow` | components/character/, app/(game)/character |
| 8 | `feat: add home page with status display` | components/status/, app/(game)/home |
| 9 | `feat: add action management system` | components/action/, app/(game)/actions |
| 10 | `feat: add battle system with animations` | components/battle/, app/(game)/battle |
| 11 | `feat: add custom hooks (useAuth, useCharacter, useBattle)` | hooks/ |
| 12 | `test: add unit tests for battle logic and monsters` | __tests__/ |
| 13 | `docs: add deployment guide and env example` | DEPLOY.md, .env.local.example |
