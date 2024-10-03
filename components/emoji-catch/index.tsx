"use client";

import useSockets from "@/hooks/useSockets";
import Button from "@/components/button";

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
    joinedRoom,
  } = useSockets();

  return (
    <div className={"mx-auto w-[360px] mt-20"}>
      <h1>포켓몬 캐치마인드</h1>
      {joinedRoom ? (
        <>
          <h2>Room Code: {roomCode}</h2>
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>
                {msg.sender}: {msg.message}
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage}>
            <input
              className={"p-2 border"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
            />
            <Button className={"ml-2"} type="submit">
              전송하기
            </Button>
          </form>
        </>
      ) : (
        <div>
          <div>
            <input
              type="text"
              className={"border p-2"}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 입력"
            />
          </div>
          <Button className={"my-5 border p-2 rounded-xl"} onClick={createRoom}>
            방 만들기
          </Button>
          <div>
            <input
              type="text"
              className={"border p-2"}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="방 코드 입력"
            />
            <Button className={"border ml-2 p-2 rounded-xl"} onClick={joinRoom}>
              방 참가하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiCatchContainer;
