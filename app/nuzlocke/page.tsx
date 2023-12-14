import Cards from "@/components/cards";
import React from "react";

const FIRST_COTEST_TEAMS = [
  "술값이안던지면이김",
  "조별과제",
  "Oyasumi makuro",
  "SF",
  "참지마요 사각김밥",
  "슈팅스타",
  "Team UB",
  "버스트콜",
  "일레이나",
  "은하의바람",
  "조조좃",
];

const NuzlockePage = () => {
  return <Cards teams={FIRST_COTEST_TEAMS} />;
};

export default NuzlockePage;
