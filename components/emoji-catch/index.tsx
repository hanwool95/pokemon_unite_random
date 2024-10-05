"use client";

import useSockets from "@/hooks/useSockets";
import Button from "@/components/button";
import GameScreen from "@/components/emoji-catch/GameScreen";

const EmojiCatchContainer = () => {
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
    scores,
    nicknames,
    currentImage,
    currentHint,
    currentTurn,
    submitGuess,
    addHint,
  } = useSockets();

  if (gameStarted) {
    return (
      <GameScreen
        nicknames={nicknames}
        scores={scores}
        currentImage={currentImage}
        currentHint={currentHint}
        currentTurn={currentTurn}
        submitGuess={submitGuess}
        addHint={addHint}
      />
    );
  }

  return (
    <div className="flex mx-auto w-[720px] mt-20">
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-blue-500">닉네임 리스트</h2>
        <ul>
          {nicknames.map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <h1>포켓몬 캐치마인드</h1>
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
              <Button className="mt-5 w-full" onClick={startGame}>
                게임 시작하기
              </Button>
            )}
          </>
        ) : (
          <div>
            <div>
              <input
                type="text"
                className="border p-2"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 입력"
              />
            </div>
            <Button className="my-5 border p-2 rounded-xl" onClick={createRoom}>
              방 만들기
            </Button>
            <div>
              <input
                type="text"
                className="border p-2"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="방 코드 입력"
              />
              <Button className="border ml-2 p-2 rounded-xl" onClick={joinRoom}>
                방 참가하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiCatchContainer;
