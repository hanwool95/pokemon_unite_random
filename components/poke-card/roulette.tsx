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
  const [pickedCards, setPickedCards] = useState<CardInfo[]>([]); // 뽑힌 카드 목록
  const [isRolling, setIsRolling] = useState(false); // 룰렛 동작 상태

  useEffect(() => {
    if (!pokemonCards || pokemonCards.length === 0) return;
    setCurrentName(pokemonCards[0].name); // 초기 상태 설정
  }, [pokemonCards]);

  const startRoulette = () => {
    if (!pokemonCards || pokemonCards.length === 0) return;

    const remainingCards = pokemonCards.filter(
      (card) => !pickedCards.some((picked) => picked.id === card.id),
    );

    if (remainingCards.length === 0) {
      alert("모든 카드를 다 뽑았습니다!");
      return;
    }

    setIsRolling(true);
    setWinner(null);

    let count = 0; // 몇 번 돌았는지 추적
    const interval = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * (pokemonCards.length - pickedCards.length),
      );
      setCurrentName(pokemonCards[randomIndex].name);
      count++;

      // 일정 시간 후 멈추기
      if (count > 20) {
        clearInterval(interval);
        const selectedCard = remainingCards[randomIndex];
        setWinner(selectedCard); // 최종 당첨
        setPickedCards((prev) => [...prev, selectedCard]);
        setIsRolling(false);
      }
    }, 100); // 0.1초마다 업데이트
  };

  const copyPickedCards = () => {
    if (pickedCards.length === 0) {
      alert("뽑힌 카드가 없습니다.");
      return;
    }

    const textToCopy = pickedCards
      .map((card) => `${card.name} (${card.pack})`)
      .join("\n");

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("뽑힌 카드 목록이 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        alert("복사 중 문제가 발생했습니다.");
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start mt-8">
      <div className="text-center w-full md:w-2/3">
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
        <button
          className={`px-4 py-2 ml-2 text-white text-lg font-bold cursor-pointer bg-gray-400 rounded-md ${
            isRolling ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"
          }`}
          onClick={() => {
            setPickedCards([]);
          }}
        >
          {"초기화"}
        </button>
      </div>
      <div className="flex flex-col w-full md:w-1/3 mt-8 md:mt-0 md:ml-2 px-8 md:px-0">
        <div className={"flex mx-auto mb-2"}>
          <h2 className="text-xl font-bold text-center my-auto align-middle">
            뽑힌 카드
          </h2>
          <button
            onClick={copyPickedCards}
            className="px-4 py-2 ml-2 text-lg font-bold cursor-pointer bg-blue-400 rounded-md hover:bg-blue-500 text-white"
          >
            복사
          </button>
        </div>
        <div className="flex flex-col gap-4 items-center bg-gray-100 border rounded-lg p-4 shadow-md max-h-[420px] overflow-y-auto">
          {pickedCards.length > 0 ? (
            pickedCards.map((card) => (
              <div key={card.id} className={"flex"}>
                <p className="font-bold">{card.name}</p>
                <p className="font-bold ml-2 text-gray-400">{card.pack}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              아직 뽑힌 카드가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeCardRoulette;
