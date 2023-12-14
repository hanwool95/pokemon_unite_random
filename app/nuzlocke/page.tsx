import Cards from "@/components/cards";
import React from "react";

const FIRST_COTEST_TEAMS = [
  "Droplet",
  "망할것들",
  "카레낀도르",
  "벵키시",
  "술값이",
  "조별과제",
  "Oyasumi",
  "SF",
  "참지마요",
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
