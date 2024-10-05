import ScoreBoard from "@/components/ScoreBoard";
import Button from "@/components/button";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { BottomArrow } from "@/components/svgs";

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
}) => {
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true); // 채팅창이 열려있는지 상태를 관리

  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setHint(emojiObject.emoji); // 이모티콘을 입력 필드에 설정
    setShowPicker(false); // 선택 후 이모티콘 선택기 닫기
  };

  const chatEndRef = useRef<HTMLDivElement | null>(null); // 채팅 끝 위치를 참조할 ref

  // messages가 변경될 때마다 자동으로 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {showPicker && !gameMessage && (
        <div
          className={
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          }
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
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
        className="flex w-full h-full py-8"
        onClick={() => {
          if (showPicker) setShowPicker(false);
        }}
      >
        <ScoreBoard nicknames={nicknames} scores={scores} messages={messages} />
        <div className={"flex flex-col mx-auto"}>
          <div className="p-4 bg-gray-100 w-[320px]">
            <h2>현재 차례: {currentTurn}</h2>
            {isMyTurn && (
              <div>
                <img src={currentImage} alt="포켓몬" className="w-full" />
              </div>
            )}
            <p className={"py-8 text-3xl"}>힌트: {currentHint}</p>
            {isMyTurn && currentHint.length < 6 && (
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
          {!isMyTurn && (
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
          )}
        </div>
        {/* 채팅창 */}
        <div className="absolute bottom-0 right-0 w-[300px] bg-white shadow-lg p-4 border">
          {/* 채팅창 접기 버튼 */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">채팅방</h3>
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
