"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePokemonCardPacks } from "@/hooks/usePokemonCardPacks";

const PokeCardRoulette = () => {
  const searchParams = useSearchParams();
  const card = searchParams.get("card");
  const { data: pokemonCards } = usePokemonCardPacks(card || "최강의유전자");

  const [currentName, setCurrentName] = useState(""); // 현재 룰렛에 표시되는 이름
  const [winner, setWinner] = useState(null); // 최종 당첨 이름
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
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Pokémon Card Roulette</h1>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1rem 0",
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isRolling ? currentName : winner ? winner.name : "돌려주세요!"}
      </div>
      <button
        onClick={startRoulette}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          backgroundColor: "#ffcc00",
          border: "none",
          borderRadius: "5px",
        }}
        disabled={isRolling}
      >
        {isRolling ? "돌아가는 중..." : "룰렛 돌리기"}
      </button>
      {winner && (
        <div style={{ marginTop: "2rem" }}>
          <p>
            축하합니다! <strong>{winner.name}</strong> 카드를 뽑았습니다!
          </p>
        </div>
      )}
    </div>
  );
};

export default PokeCardRoulette;
