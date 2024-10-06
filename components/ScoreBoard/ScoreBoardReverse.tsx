import { useEffect, useState } from "react";

const ScoreBoardReverse = ({
  nicknames,
  scores,
  messages,
  currentTurn,
}: {
  nicknames: string[];
  scores: number[];
  messages: { sender: string; message: string }[];
  currentTurn?: string;
}) => {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]); // 각 사용자의 말풍선 상태 관리

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1]; // 최신 메시지 가져오기
      setVisibleMessages((prev) => [...prev, latestMessage.sender]); // 메시지 발신자의 말풍선 표시

      // 3초 후에 말풍선 사라지게 설정
      const timer = setTimeout(() => {
        setVisibleMessages((prev) =>
          prev.filter((sender) => sender !== latestMessage.sender),
        );
      }, 3000);

      // 타이머가 리렌더링 시 중복되지 않도록 정리
      return () => clearTimeout(timer);
    }
  }, [messages]); // 메시지가 변경될 때마다 실행

  return (
    <div className="flex flex-col w-[120px] h-full whitespace-nowrap gap-4">
      {nicknames.map((name, idx) => (
        <div
          key={idx}
          className={`w-1/8 p-4 border relative rounded-xl ${currentTurn === name ? "border-4 border-black" : ""} }`}
        >
          <h2 className="text-lg font-bold truncate">{name}</h2>
          <p>점수: {scores[idx]}</p>
          {visibleMessages.includes(name) && (
            <div className="absolute -left-16 top-10 bg-gray-200 text-black p-2 rounded-md shadow-lg">
              {
                messages.filter((msg) => msg.sender === name).slice(-1)[0]
                  .message
              }{" "}
              {/* 최신 메시지만 표시 */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreBoardReverse;
