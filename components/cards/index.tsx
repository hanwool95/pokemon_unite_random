"use client";

import useCards from "@/hooks/useCards";
import Image from "next/image";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Teams from "../teams";

export type Team = {
  name: string;
  point: number;
  currentPokemon: string[];
};

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

type CardsProps = {
  teams: string[];
};

const Cards: React.FC<CardsProps> = ({ teams }) => {
  const { attackers, balances, defences, speeders, supports } = useCards();
  const [mainCards, setMainCards] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failRow, setFailRow] = useState(0);
  const [teamsStatus, setTeamsStatus] = useState<Team[]>([]);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState<number>();
  const [watingTeams, setWatingTeams] = useState<number[]>([]);

  useEffect(() => {
    const initTeamStatus: Team[] = teams.map((name) => {
      return {
        name,
        point: 100,
        currentPokemon: [],
      };
    });
    setTeamsStatus(initTeamStatus);
  }, []);

  useEffect(() => {
    console.log("current mainCards: ", mainCards);
  }, [mainCards]);
  const remainPokemon = useMemo(() => {
    return mainCards.length;
  }, [mainCards]);

  useEffect(() => {
    if (
      teamsStatus[selectedTeamIndex]?.point === 0 &&
      teamsStatus[selectedTeamIndex]?.currentPokemon.length < 5 &&
      !watingTeams.includes(selectedTeamIndex)
    ) {
      setWatingTeams((prevWatingTeams) => [
        ...prevWatingTeams,
        selectedTeamIndex,
      ]);
    }
  }, [teamsStatus]);

  const shuffleCards = useCallback(() => {
    const shuffledAttackers = shuffleArray(attackers);
    const shuffledBalances = shuffleArray(balances);
    const shuffledDefences = shuffleArray(defences);
    const shuffledSpeeders = shuffleArray(speeders);
    const shuffledSupports = shuffleArray(supports);

    setMainCards(
      shuffleZigzag(
        shuffledAttackers,
        shuffledBalances,
        shuffledDefences,
        shuffledSpeeders,
        shuffledSupports
      )
    );
  }, [attackers, balances, defences, speeders, supports]);

  const currentCard = useMemo(() => {
    if (mainCards.length === 0) return "셔플해주세요.";
    return (
      <Image
        className="mx-auto"
        src={mainCards[currentIndex]}
        alt="Card"
        width={300}
        height={300}
      />
    );
  }, [currentIndex, mainCards]);

  const isValidBid = useMemo(() => {
    if (currentBid === 0) return true;
    if (!currentBid) return false;
    return teamsStatus[selectedTeamIndex].point >= currentBid;
  }, [teamsStatus, currentBid, selectedTeamIndex]);

  const successBidButtonCallback = useCallback(() => {
    setTeamsStatus((prev) => {
      const newTeams = [...prev];
      newTeams[selectedTeamIndex] = {
        ...newTeams[selectedTeamIndex],
        currentPokemon: [
          ...newTeams[selectedTeamIndex].currentPokemon,
          mainCards[currentIndex],
        ],
        point: newTeams[selectedTeamIndex].point - (currentBid as number),
      };
      return newTeams;
    });
    setMainCards((prevCards) =>
      prevCards.filter((_, index) => index !== currentIndex)
    );
    setFailRow(0);
  }, [currentIndex, mainCards, currentBid, selectedTeamIndex]);

  const failBidButtonCallback = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // mainCards의 길이를 체크하여 인덱스를 업데이트합니다.
      // 배열의 길이보다 크거나 같은 경우에는 0으로 되돌립니다.
      return (prevIndex + 1) % mainCards.length;
    });
    setFailRow((prev) => prev + 1);
    if (watingTeams.length > 0) {
      const targetTeamIndex = watingTeams[0];
      setTeamsStatus((prev) => {
        const newTeams = [...prev];
        newTeams[targetTeamIndex] = {
          ...newTeams[targetTeamIndex],
          currentPokemon: [
            ...newTeams[targetTeamIndex].currentPokemon,
            mainCards[currentIndex],
          ],
          point: newTeams[targetTeamIndex].point,
        };
        return newTeams;
      });
    }
  }, [mainCards, watingTeams, setTeamsStatus, currentIndex]);

  return (
    <div className="relative w-full p-20">
      <div className="flex text-xl">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
          onClick={shuffleCards}
        >
          {"섞기"}
        </button>
        <div className="flex-col ml-auto">
          <p className="">{`현재 남은 포켓몬 ${remainPokemon}마리`}</p>
          <p className=" text-red-600">{`${failRow} 연속 유찰`}</p>
          <p>
            {"현재 유찰 대기목록: "}
            {watingTeams.map((teamIndex) => {
              return teamsStatus[teamIndex].name + ", ";
            })}
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <div className="mx-auto">
          <div className="flex w-full p-12">{currentCard}</div>
          <div className="flex w-full">
            <button
              className={`px-4 py-2 font-bold text-white ${
                isValidBid ? "bg-green-500" : "bg-gray-400"
              } rounded ml-auto mr-10`}
              onClick={successBidButtonCallback}
              disabled={!isValidBid}
            >
              {"낙찰"}
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded mr-auto ml-10"
              onClick={failBidButtonCallback}
            >
              {"유찰"}
            </button>
          </div>
          <div className="flex">
            <input
              className="mt-4 mx-auto border border-gray-600 text-center h-8"
              type="number"
              value={currentBid}
              onChange={(event) => {
                setCurrentBid(Number(event.target.value));
              }}
            ></input>
          </div>
        </div>
        <div>
          <Teams
            teams={teamsStatus}
            selectedTeamIndex={selectedTeamIndex}
            setSelectedTeamIndex={setSelectedTeamIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
