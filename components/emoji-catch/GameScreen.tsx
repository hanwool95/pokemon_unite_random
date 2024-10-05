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
}: {
  nicknames: string[];
  scores: number[];
  currentImage: string;
  currentHint: string;
  currentTurn: string;
  submitGuess: (guess: string) => void;
  addHint: (hint: string) => void;
}) => {
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("");

  return (
    <div className="flex w-full h-full py-8">
      <ScoreBoard nicknames={nicknames} scores={scores} />
      <div className={"flex flex-col mx-auto"}>
        <div className="p-4 bg-gray-100">
          <h2>현재 차례: {currentTurn}</h2>
          <h3>포켓몬 사진:</h3>
          <img src={currentImage} alt="포켓몬" className="w-full" />
          <p>힌트: {currentHint}</p>
          <input
            className="p-2 border"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            autoComplete="off"
          />
          <Button
            onClick={() => {
              addHint(hint);
            }}
          >
            힌트 추가
          </Button>
        </div>
        <div className="w-3/4 p-4">
          <h2>정답 입력</h2>
          <input
            className="p-2 border"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="정답 입력"
          />
          <Button onClick={() => submitGuess(guess)}>정답 제출</Button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
