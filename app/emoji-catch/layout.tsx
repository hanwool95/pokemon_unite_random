import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포켓몬 이모티콘 캐치마인드",
  description: "3분 요약 카이사르의 포켓몬 이모티콘 캐치마인드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
