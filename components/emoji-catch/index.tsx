"use client";

import useSockets from "@/hooks/useSockets";

const EmojiCatchContainer = () => {
  const {
    roomCode,
    setRoomCode,
    message,
    setMessage,
    messages,
    sendMessage,
    joinRoom,
    createRoom,
    joinedRoom,
  } = useSockets();

  return (
    <div>
      <h1>Catch Mind Game</h1>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
        </>
      ) : (
        <>
          <button onClick={createRoom}>Create Room</button>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter room code"
          />
          <button onClick={joinRoom}>Join Room</button>
        </>
      )}
    </div>
  );
};

export default EmojiCatchContainer;
