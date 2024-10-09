import ScoreBoard from "@/components/ScoreBoard";
import Button from "@/components/button";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SetStateAction,
  useMemo,
} from "react";
import { BottomArrow } from "@/components/svgs";
import ScoreBoardReverse from "@/components/ScoreBoard/ScoreBoardReverse";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { unifiedStringToEmoji } from "@/libs/simple_functions";
import i18n from "@emoji-mart/data/i18n/ko.json";

const GameScreen = ({
  nicknames,
  scores,
  currentImage,
  currentHint,
  currentTurn,
  submitGuess,
  addHint,
  isMyTurn,
  gameMessage,
  messages,
  sendMessage,
  message,
  setMessage,
  currentPokemonName,
  skipRound,
  timer,
  timeLeft,
  tickSound,
}: {
  nicknames: string[];
  scores: number[];
  currentImage: string;
  currentHint: string;
  currentTurn: string;
  submitGuess: (guess: string) => void;
  addHint: (hint: string) => void;
  isMyTurn: boolean;
  gameMessage: string;
  messages: { sender: string; message: string }[];
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  currentPokemonName: string;
  skipRound: () => void;
  timer: number;
  timeLeft: number;
  tickSound: React.MutableRefObject<HTMLAudioElement | null>;
}) => {
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null); // 채팅 끝 위치를 참조할 ref

  const splitCurrentHints = useMemo(() => {
    return currentHint ? currentHint.split(" ") : [];
  }, [currentHint]);

  const onEmojiClick = (
    emojiObject: {
      id: string;
      keywords: string[];
      name: string;
      native: string;
      unified: string;
    },
    event: MouseEvent,
  ) => {
    setHint(emojiObject.unified);
    setShowPicker(false);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const onSubmitGuess = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submitGuess(guess);
      setGuess(""); // 제출 후 입력 필드 초기화
    },
    [guess, setGuess, submitGuess],
  );

  return (
    <>
      {/* 타이머 진행 바 */}
      <div className="relative w-full h-6 bg-gray-300 mt-4">
        <div
          className="absolute left-0 top-0 h-full bg-green-500 transition-all"
          style={{ width: `${(timeLeft / timer) * 100}%` }}
        />
        <p className="absolute left-1/2 top-0 transform -translate-x-1/2 text-white font-bold">
          {timeLeft}초 남음
        </p>
      </div>

      {/* 사운드 파일 로드 */}
      <audio ref={tickSound} src="/tick-tock-sound.mp3" loop={false} />

      {showPicker && !gameMessage && (
        <div
          className={
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          }
        >
          <Picker data={data} i18n={i18n} onEmojiSelect={onEmojiClick} />
        </div>
      )}
      {!!gameMessage && (
        <div
          className={
            "border border-black bg-white p-5 text-xl w-fit min-w-[320px] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-50 whitespace-pre-wrap text-center"
          }
        >
          {gameMessage}
        </div>
      )}
      <div
        className="flex w-full h-full py-8 px-4 max-lg mx-auto"
        onClick={() => {
          if (showPicker) setShowPicker(false);
        }}
      >
        {nicknames && scores && nicknames.length > 0 && scores.length > 0 && (
          <ScoreBoard
            nicknames={nicknames?.slice(0, 4)}
            scores={scores?.slice(0, 4)}
            messages={messages}
            currentTurn={currentTurn}
          />
        )}
        <div className={"flex flex-col mx-auto w-full ml-2"}>
          <div className="p-4 bg-gray-100 w-full max-w-[320px] mx-auto">
            <h2>현재 차례: {currentTurn}</h2>
            {isMyTurn && (
              <div>
                <img src={currentImage} alt="포켓몬" className="w-full" />
                <p className={"text-center text-2xl"}>{currentPokemonName}</p>
              </div>
            )}
            <p className={"py-8 text-3xl text-center"}>
              {splitCurrentHints.length > 0
                ? splitCurrentHints.map((hint) => unifiedStringToEmoji(hint))
                : "출제자 힌트 입력중"}
            </p>
            {isMyTurn && splitCurrentHints.length < 3 && (
              <div className={"mt-2 w-full flex flex-col"}>
                <input
                  className="p-2 border"
                  value={unifiedStringToEmoji(hint)}
                  onClick={(event) => {
                    event.preventDefault();
                    setShowPicker(!showPicker);
                  }}
                  readOnly
                  maxLength={1}
                />
                <Button
                  className={"ml-2 mx-auto mt-4"}
                  onClick={() => {
                    addHint(hint);
                    setHint("");
                  }}
                >
                  힌트 추가
                </Button>
              </div>
            )}
            {isMyTurn && splitCurrentHints.length === 3 && (
              <Button className={"w-full"} onClick={skipRound}>
                {"패스!"}
              </Button>
            )}
          </div>
          {!isMyTurn && (
            <form className="flex flex-col w-full p-4" onSubmit={onSubmitGuess}>
              <input
                className="p-2 border w-full max-w-[320px] mx-auto"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="정답 입력"
              />
              <Button
                type="submit"
                className={"w-full mt-2 max-w-[320px] mx-auto"}
              >
                정답 제출
              </Button>
            </form>
          )}
        </div>
        {nicknames.length >= 5 && scores.length >= 5 && (
          <ScoreBoardReverse
            nicknames={nicknames?.slice(4, 8)}
            scores={scores?.slice(4, 8)}
            messages={messages}
            currentTurn={currentTurn}
          />
        )}

        <div
          className={`absolute bottom-0 right-0 ${
            isChatOpen ? "w-[300px]" : "w-[50px]"
          } bg-white shadow-lg p-4 border`}
        >
          <div className="flex justify-between items-center mb-2">
            {isChatOpen && <h3 className="font-bold">채팅방</h3>}
            <BottomArrow
              onClick={() => setIsChatOpen(!isChatOpen)}
              isRotated={!isChatOpen}
            />
          </div>

          {/* 채팅 메시지 영역 */}
          {isChatOpen && (
            <>
              <div className="h-[300px] overflow-y-auto mb-2">
                <ul className="mt-5">
                  {messages.map((msg, idx) => (
                    <li key={idx} className="mb-1">
                      <strong>{msg.sender}</strong>: {msg.message}
                    </li>
                  ))}
                  <div ref={chatEndRef} />
                </ul>
              </div>
              {/* 채팅 입력 폼 */}
              <form
                onSubmit={(e) => {
                  sendMessage(e);
                  setMessage("");
                }}
                className="flex items-center"
              >
                <input
                  className="p-2 border flex-grow"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="off"
                />
                <Button className="ml-2" type="submit">
                  전송
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GameScreen;
