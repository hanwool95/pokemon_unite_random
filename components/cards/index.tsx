"use client";

import useCards from "@/hooks/useCards";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";

function shuffleArray(array: string[]) {
  // Fisher-Yates (Durstenfeld)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleZigzag(
  attackers: string[],
  balances: string[],
  defences: string[],
  speeders: string[],
  supports: string[]
) {
  // 결과를 저장할 새 배열 생성
  let result = [];
  let index = 0;

  while (
    supports.length > index ||
    balances.length > index ||
    attackers.length > index ||
    defences.length > index ||
    speeders.length > index
  ) {
    if (supports.length > index) {
      result.push(supports[index]);
    }
    if (balances.length > index) {
      result.push(balances[index]);
    }
    if (attackers.length > index) {
      result.push(attackers[index]);
    }
    if (defences.length > index) {
      result.push(defences[index]);
    }
    if (speeders.length > index) {
      result.push(speeders[index]);
    }
    index++;
  }

  return result;
}

const Cards = () => {
  const { attackers, balances, defences, speeders, supports } = useCards();

  const shuffledCards = useMemo(() => {
    const shuffledAttackers = shuffleArray(attackers);
    const shuffledBalances = shuffleArray(balances);
    const shuffledDefences = shuffleArray(defences);
    const shuffledSpeeders = shuffleArray(speeders);
    const shuffledSupports = shuffleArray(supports);

    return shuffleZigzag(
      shuffledAttackers,
      shuffledBalances,
      shuffledDefences,
      shuffledSpeeders,
      shuffledSupports
    );
  }, [attackers, balances, defences, speeders, supports]);

  return (
    <div>
      {shuffledCards.map((imgPath, index) => (
        <Image
          key={index}
          src={imgPath}
          alt="Attacker"
          width={300}
          height={300}
        />
      ))}
    </div>
  );
};

export default Cards;
