import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "포켓몬 카드게임 룰렛 | 계피디",
  description:
    "3분 요약 카이사르 채널의 계피디가 제작한 포켓몬 카드 게임 카드 룰렛",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Image
        className={"mx-auto"}
        src={"/pokemon-emoji-top-banner.png"}
        alt={"포켓몬 이모지 캐치마인드 by 카이사르"}
        width={280}
        height={360}
      />
      {children}
      <div className={"mx-auto"}>
        <p className={"mx-auto text-center"}>
          {"created by 계피디 in 3분 요약 카이사르"}
        </p>
        <p className={"mx-auto text-center mt-2 whitespace-pre-wrap"}>
          {"이용료 = 구독!"}
        </p>
        <div className="flex justify-center mt-2">
          <a
            href="https://www.youtube.com/@3min-caesar?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            카이사르 유튜브 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}
