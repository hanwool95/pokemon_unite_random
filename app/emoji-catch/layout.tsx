import type { Metadata } from "next";
import Image from "next/image";

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
      <body>
        <Image
          className={"mx-auto"}
          src={"/pokemon-emoji-top-banner.png"}
          alt={"포켓몬 이모지 캐치마인드 by 카이사르"}
          width={280}
          height={360}
        />
        {children}
      </body>
    </html>
  );
}
