import ScoreBoard from "@/components/ScoreBoard";
import Button from "@/components/button";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

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

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setHint(emojiObject.emoji); // 이모티콘을 입력 필드에 설정
    setShowPicker(false); // 선택 후 이모티콘 선택기 닫기
  };

  return (
    <>
      {showPicker && (
        <div
          className={
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          }
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <div
        className="flex w-full h-full py-8"
        onClick={() => {
          if (showPicker) setShowPicker(false);
        }}
      >
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
                  onClick={(event) => {
                    event.preventDefault();
                    setShowPicker(!showPicker);
                  }}
                  readOnly
                  maxLength={1}
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
            <Button
              className={"w-full mt-2"}
              onClick={() => submitGuess(guess)}
            >
              정답 제출
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
