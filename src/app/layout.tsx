import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPGステータス育成アプリ",
  description: "日常行動でキャラを育てるRPG育成アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        <div className="max-w-md mx-auto min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
