"use client";

import useSockets from "@/hooks/useSockets";
import Button from "@/components/button";
import GameScreen from "@/components/emoji-catch/GameScreen";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const EmojiCatchContainer = () => {
  const props = useSockets();
  const {
    roomCode,
    setRoomCode,
    nickname,
    setNickname,
    joinRoom,
    createRoom,
    startGame,
    joinedRoom,
    isHost,
    gameStarted,
    nicknames,
    isLoading,
    timer,
    setTimer,
    setTimeLeft,
  } = props;

  const searchParams = useSearchParams();
  const [joinByRoomCode, setJoinByRoomCode] = useState(false);

  // 쿼리 파라미터에서 roomCode 가져오기
  useEffect(() => {
    const queryRoomCode = searchParams.get("code");
    if (queryRoomCode) {
      setRoomCode(queryRoomCode as string); // roomCode 자동 설정
      setJoinByRoomCode(true);
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

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setTime = parseInt(e.target.value, 10);
    setTimer(setTime);
    setTimeLeft(setTime);
  };

  if (gameStarted) {
    return <GameScreen {...props} />;
  }

  return (
    <div className="flex mx-auto w-fit min-w-[360px] h-fit">
      {joinedRoom && (
        <div className="w-1/4 p-4 bg-gray-100 mt-4">
          <h2 className="text-blue-500">참여자</h2>
          <ul>
            {nicknames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4 bg-gray-100 mt-4 mx-auto">
        {joinedRoom ? (
          <>
            <div className={"flex"}>
              <h2 className={"align-middle my-auto"}>방 코드: {roomCode}</h2>
              <Button
                className={"ml-2"}
                onClick={() => {
                  const inviteLink = `${window.location.href}?code=${roomCode}`;
                  navigator.clipboard
                    .writeText(inviteLink)
                    .then(() => {
                      alert("초대 링크가 복사되었습니다!");
                    })
                    .catch((err) => {
                      console.error("초대 링크 복사 중 오류 발생:", err);
                    });
                }}
              >
                초대 링크 복사
              </Button>
            </div>
            {isHost && (
              <div>
                <div className="mt-5">
                  <label
                    htmlFor="timerSlider"
                    className="block text-lg font-bold"
                  >
                    게임 타이머 설정: {timer}초
                  </label>
                  <input
                    id="timerSlider"
                    type="range"
                    min={10}
                    max={180}
                    value={timer}
                    onChange={handleTimerChange}
                    className="w-full mt-2"
                  />
                </div>
                <Button
                  disabled={nicknames.length < 2}
                  className="mt-5 w-full"
                  onClick={startGame}
                >
                  게임 시작하기
                </Button>
              </div>
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
              {joinByRoomCode && (
                <Button
                  disabled={isLoading}
                  className="mt-4 w-full"
                  onClick={handleJoinRoom}
                >
                  방 참가하기
                </Button>
              )}
            </div>
            {!joinByRoomCode && (
              <div className={"mt-4"}>
                <input
                  type="text"
                  className="border p-2 w-32"
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
            {!joinByRoomCode && (
              <Button
                disabled={isLoading}
                className="my-5 border p-2 rounded-xl !bg-black w-full"
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
