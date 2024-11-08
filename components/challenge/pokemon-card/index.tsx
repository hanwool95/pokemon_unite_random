"use client";

import React from "react";
import { useYouTubeVideoInfo } from "@/hooks/useYoutubeVideoInfo";

const PokemonCardChallenge: React.FC<{ youtubeId: string }> = ({
  youtubeId,
}) => {
  const { data, isFetched } = useYouTubeVideoInfo(youtubeId);

  if (!isFetched) return <div></div>;

  return <div>{data?.likeCount}</div>;
};

export default PokemonCardChallenge;
