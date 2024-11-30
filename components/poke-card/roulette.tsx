"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CardInfo, usePokemonCardPacks } from "@/hooks/usePokemonCardPacks";

const PokeCardRoulette = () => {
  const searchParams = useSearchParams();
  const card = searchParams.get("card");
  const { data: pokemonCards } = usePokemonCardPacks(card || "최강의유전자");

  const [currentName, setCurrentName] = useState(""); // 현재 룰렛에 표시되는 이름
  const [winner, setWinner] = useState<CardInfo | null>(null); // 최종 당첨 이름
  const [isRolling, setIsRolling] = useState(false); // 룰렛 동작 상태

  useEffect(() => {
    if (!pokemonCards || pokemonCards.length === 0) return;
    setCurrentName(pokemonCards[0].name); // 초기 상태 설정
  }, [pokemonCards]);

  const startRoulette = () => {
    if (!pokemonCards || pokemonCards.length === 0) return;

    setIsRolling(true);
    setWinner(null);

    let count = 0; // 몇 번 돌았는지 추적
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pokemonCards.length);
      setCurrentName(pokemonCards[randomIndex].name);
      count++;

      // 일정 시간 후 멈추기
      if (count > 20) {
        clearInterval(interval);
        setWinner(pokemonCards[randomIndex]); // 최종 당첨
        setIsRolling(false);
      }
    }, 100); // 0.1초마다 업데이트
  };

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold">Pokémon Card Roulette</h1>
      <div className="text-2xl font-bold my-4 h-12 flex items-center justify-center">
        {isRolling ? currentName : winner ? winner.name : "돌려주세요!"}
      </div>
      <button
        onClick={startRoulette}
        className={`px-4 py-2 text-lg font-bold cursor-pointer bg-yellow-400 rounded-md ${
          isRolling ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
        }`}
        disabled={isRolling}
      >
        {isRolling ? "돌아가는 중..." : "룰렛 돌리기"}
      </button>
    </div>
  );
};

export default PokeCardRoulette;
