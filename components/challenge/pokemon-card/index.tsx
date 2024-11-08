"use client";

import React, { useEffect, useState } from "react";
import { useYouTubeVideoInfo } from "@/hooks/useYoutubeVideoInfo";
import CountSection from "@/components/challenge/CountSection";

const PokemonCardChallenge: React.FC<{ youtubeId: string }> = ({
  youtubeId,
}) => {
  const { data, isFetched } = useYouTubeVideoInfo(youtubeId);
  const [displayedLikes, setDisplayedLikes] = useState(0);

  // 좋아요 수 애니메이션 효과
  useEffect(() => {
    if (isFetched && data?.likeCount) {
      let start = 0;
      const end = data.likeCount;
      const duration = 2000; // 애니메이션 지속 시간 (밀리초)
      const increment = Math.ceil(end / (duration / 20)); // 증가량 계산

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayedLikes(end);
          clearInterval(counter);
        } else {
          setDisplayedLikes(start);
        }
      }, 20); // 업데이트 주기 (밀리초)

      return () => clearInterval(counter);
    }
  }, [isFetched, data?.likeCount]);

  if (!isFetched)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className={"w-full max-w-lg mx-auto py-4 px-4"}>
      <CountSection
        content={
          <span className="text-2xl text-center font-bold text-primary animate-pulse">
            목표 승리 수<br />
            (좋아요 / 100)
            <br />
            {Math.round(displayedLikes / 10)}
          </span>
        }
      />
    </div>
  );
};

export default PokemonCardChallenge;
