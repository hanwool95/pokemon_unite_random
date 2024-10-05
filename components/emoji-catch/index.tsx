"use client";

import useSockets from "@/hooks/useSockets";
import Button from "@/components/button";
import GameScreen from "@/components/emoji-catch/GameScreen";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EmojiCatchContainer = () => {
  const props = useSockets();
  const {
    roomCode,
    setRoomCode,
    nickname,
    setNickname,
    message,
    setMessage,
    messages,
    sendMessage,
    joinRoom,
    createRoom,
    startGame,
    joinedRoom,
    isHost,
    gameStarted,
    nicknames,
    isLoading,
  } = props;

  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 roomCode 가져오기
  useEffect(() => {
    const queryRoomCode = searchParams.get("code");
    if (queryRoomCode) {
      setRoomCode(queryRoomCode as string); // roomCode 자동 설정
    }
  }, [searchParams, setRoomCode]);

  // 닉네임 입력 후 방 참가
  const handleJoinRoom = () => {
    if (nickname.trim()) {
      joinRoom();
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };

  if (gameStarted) {
    return <GameScreen {...props} />;
  }

  return (
    <div className="flex mx-auto w-[720px] mt-20">
      {joinedRoom && (
        <div className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-blue-500">참여자 리스트</h2>
          <ul>
            {nicknames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="w-3/4 p-4">
        <h1 className={"text-xl"}>포켓몬 캐치마인드</h1>
        {joinedRoom ? (
          <>
            <h2>Room Code: {roomCode}</h2>
            <ul className="mt-5">
              {messages.map((msg, idx) => (
                <li key={idx}>
                  {msg.sender}: {msg.message}
                </li>
              ))}
            </ul>
            <form onSubmit={sendMessage}>
              <input
                className="p-2 border"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
              />
              <Button className="ml-2" type="submit">
                전송하기
              </Button>
            </form>
            {isHost && (
              <Button
                disabled={nicknames.length < 2}
                className="mt-5 w-full"
                onClick={startGame}
              >
                게임 시작하기
              </Button>
            )}
          </>
        ) : (
          <div>
            <div>
              <h2 className={"mt-2"}>{"닉네임을 입력해주세요"}</h2>
              <input
                type="text"
                className="border p-2"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 입력"
              />
              {roomCode && (
                <Button
                  disabled={isLoading}
                  className="mt-4 w-full"
                  onClick={handleJoinRoom}
                >
                  방 참가하기
                </Button>
              )}
            </div>
            {!roomCode && (
              <div className={"mt-4"}>
                <input
                  type="text"
                  className="border p-2"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="방 코드 입력"
                />
                <Button
                  disabled={isLoading}
                  className="border ml-2 p-2 rounded-xl"
                  onClick={joinRoom}
                >
                  방 참가하기
                </Button>
              </div>
            )}
            {!roomCode && (
              <Button
                disabled={isLoading}
                className="my-5 border p-2 rounded-xl"
                onClick={createRoom}
              >
                방 만들기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiCatchContainer;
