"use client";

import useCards from "@/hooks/useCards";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Cards = () => {
  const { attackers, balances, defences, speeders, supports } = useCards();

  if (!attackers) return <div>Loading...</div>;

  return (
    <div>
      {attackers &&
        attackers.map((imgPath, index) => (
          <Image
            key={index}
            src={imgPath}
            alt="Attacker"
            width={300}
            height={300}
          />
        ))}
      {defences &&
        defences.map((imgPath, index) => (
          <Image
            key={index}
            src={imgPath}
            alt="Defences"
            width={300}
            height={300}
          />
        ))}
    </div>
  );
};

export default Cards;
