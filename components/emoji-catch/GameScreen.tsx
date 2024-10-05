import ScoreBoard from "@/components/ScoreBoard";
import Button from "@/components/button";
import { useState } from "react";

const GameScreen = ({
  nicknames,
  scores,
  currentImage,
  currentHint,
  currentTurn,
  submitGuess,
  addHint,
  isMyTurn,
}: {
  nicknames: string[];
  scores: number[];
  currentImage: string;
  currentHint: string;
  currentTurn: string;
  submitGuess: (guess: string) => void;
  addHint: (hint: string) => void;
  isMyTurn: boolean;
}) => {
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("");

  return (
    <div className="flex w-full h-full py-8">
      <ScoreBoard nicknames={nicknames} scores={scores} />
      <div className={"flex flex-col mx-auto"}>
        <div className="p-4 bg-gray-100">
          <h2>현재 차례: {currentTurn}</h2>
          {isMyTurn && (
            <div>
              <img src={currentImage} alt="포켓몬" className="w-full" />
            </div>
          )}
          <p className={"py-16 text-2xl"}>힌트: {currentHint}</p>
          {isMyTurn && (
            <div className={"mt-2"}>
              <input
                className="p-2 border"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                autoComplete="off"
              />
              <Button
                className={"ml-2"}
                onClick={() => {
                  addHint(hint);
                }}
              >
                힌트 추가
              </Button>
            </div>
          )}
        </div>
        <div className="w-full p-4">
          <input
            className="p-2 border w-full"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="정답 입력"
          />
          <Button className={"w-full mt-2"} onClick={() => submitGuess(guess)}>
            정답 제출
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
