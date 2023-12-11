"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

function Cards() {
  const [attackers, setAttackers] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/image?category=attacker")
      .then((res) => res.json())
      .then((data) => {
        setAttackers(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
    </div>
  );
}

export default Cards;
