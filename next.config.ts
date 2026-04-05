import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind (atomic CSS) に最適化: CSSを<link>ではなく<style>としてHTMLに埋め込む
    // Turbopack + @layer の組み合わせでVercel上でスタイルが欠落する問題を回避
    inlineCss: true,
  },
};

export default nextConfig;
