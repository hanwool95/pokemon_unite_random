"use client";

import React, { useMemo } from "react";
import { useYouTubeVideoInfo, VideoInfo } from "@/hooks/useYoutubeVideoInfo";
import { CardInfo, usePokemonCardPacks } from "@/hooks/usePokemonCardPacks";
import classNames from "classnames";

interface Props {
  videoInfo?: VideoInfo;
  cards?: CardInfo[];
  className?: string;
}

const PokemonCardCommentCounter: React.FC<Props> = ({
  videoInfo,
  cards,
  className,
}) => {
  const cardMentionCounts = useMemo(() => {
    if (!videoInfo || !cards) return [];

    const uniqueCommenters = new Set<string>(); // 중복된 닉네임 방지용 Set
    const cardNamesSet = new Set(cards.map((card) => card.name)); // 카드 이름 Set 생성

    // 초기화된 카드 카운트 배열
    const mentionCounts: { name: string; count: number }[] = cards.map(
      (card) => ({
        name: card.name,
        count: 0,
      }),
    );

    videoInfo.comments.forEach((comment) => {
      // if (uniqueCommenters.has(comment.author)) return; // 중복 닉네임이면 무시
      uniqueCommenters.add(comment.author);

      // 코멘트 전체 텍스트를 Set으로 검색하여 카드 이름이 있는지 확인
      if (cardNamesSet.has(comment.text.trim())) {
        // 일치하는 카드의 카운트 증가
        const matchedCard = mentionCounts.find(
          (card) => card.name === comment.text.trim(),
        );
        if (matchedCard) matchedCard.count += 1;
      }
    });

    // 카운트를 기준으로 내림차순 정렬
    return mentionCounts.sort((a, b) => b.count - a.count);
  }, [videoInfo, cards]);

  if (!videoInfo && !cards) return <></>;

  return (
    <div
      className={classNames(
        "p-4 border rounded-lg bg-gray-50 shadow-md max-w-xl mx-auto whitespace-pre-wrap",
        className,
      )}
    >
      <h2 className="text-xl font-bold mb-1">
        현재까지 언급된 포켓몬 카드 순위
      </h2>
      <h3 className={"text-md font-medium mb-4 text-[#222]"}>
        {"가장 높은 순위 10개를 사용하여 챌린지 예정\n실패할 경우 1등 코스프레"}
      </h3>
      <ul>
        {cardMentionCounts.map((mention, index) => {
          if (mention.count === 0) return;
          return (
            <li
              key={mention.name}
              className={classNames("mb-2", {
                "font-bold": index < 9,
                "font-light text-[#666]": index >= 9,
                "text-[#F00]": index === 0,
              })}
            >
              <span>{mention.name}</span>: {mention.count}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonCardCommentCounter;
