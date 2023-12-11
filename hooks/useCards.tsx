import { useEffect, useState } from "react";

const useCards = () => {
  const [attackers, setAttackers] = useState<string[]>([]);
  const [balances, setBalances] = useState<string[]>([]);
  const [defences, setDefences] = useState<string[]>([]);
  const [speeders, setSpeeders] = useState<string[]>([]);
  const [supports, setSupports] = useState<string[]>([]);

  const getCards = async (category: string) => {
    const response = await fetch(`/api/image?category=${category}`);
    return response.json();
  };

  useEffect(() => {
    const setCards = async () => {
      setAttackers(await getCards("attacker"));
      setBalances(await getCards("balance"));
      setDefences(await getCards("defence"));
      setSpeeders(await getCards("speeder"));
      setSupports(await getCards("support"));
    };
    setCards();
  }, []);
  return { attackers, balances, defences, speeders, supports };
};

export default useCards;
