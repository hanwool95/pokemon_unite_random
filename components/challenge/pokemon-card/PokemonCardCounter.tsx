"use client";

import React, { useMemo } from "react";
import { useYouTubeVideoInfo, VideoInfo } from "@/hooks/useYoutubeVideoInfo";
import { CardInfo, usePokemonCardPacks } from "@/hooks/usePokemonCardPacks";

interface Props {
  videoInfo?: VideoInfo;
  cards?: CardInfo[];
}

const PokemonCardCommentCounter: React.FC<Props> = ({ videoInfo, cards }) => {
  const cardMentionCounts = useMemo(() => {
    if (!videoInfo || !cards) return [];

    const uniqueCommenters = new Set<string>(); // 중복된 닉네임 방지용 Set
    const mentionCounts: { name: string; count: number }[] = cards.map(
      (card) => ({
        name: card.name,
        count: 0,
      }),
    );

    videoInfo.comments.forEach((comment) => {
      if (uniqueCommenters.has(comment.author)) return; // 중복 닉네임이면 무시
      uniqueCommenters.add(comment.author);

      // 코멘트에 각 카드 이름이 포함된 횟수를 카운트
      for (const mention of mentionCounts) {
        const matchIndex = comment.text.indexOf(mention.name);
        if (matchIndex !== -1) {
          mention.count += 1;
          break; // 첫 번째 언급만 카운트하고 중지
        }
      }
    });

    // 카운트를 기준으로 내림차순 정렬
    return mentionCounts.sort((a, b) => b.count - a.count);
  }, [videoInfo, cards]);

  if (!videoInfo && !cards) return <></>;

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Mentioned Pokémon Cards in Comments
      </h2>
      <ul>
        {cardMentionCounts.map((mention) => {
          if (mention.count === 0) return;
          return (
            <li key={mention.name} className="mb-2">
              <span className="font-semibold">{mention.name}</span>:{" "}
              {mention.count} mentions
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonCardCommentCounter;
