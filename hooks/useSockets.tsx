import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const useSockets = () => {
  const [roomCode, setRoomCode] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [joinedRoom, setJoinedRoom] = useState(false);

  useEffect(() => {
    // 소켓 서버에 연결
    const skt = io(process.env.NEXT_PUBLIC_SERVER_URL);

    skt.on("roomCreated", (code: string) => {
      setRoomCode(code);
      setJoinedRoom(true);
    });

    skt.on("joinedRoom", (code: string) => {
      setRoomCode(code);
      setJoinedRoom(true);
    });

    skt.on(
      "chat",
      ({ sender, message }: { sender: string; message: string }) => {
        setMessages((prev) => [...prev, { sender, message }]);
      },
    );

    setSocket(skt);

    // 컴포넌트가 언마운트 될 때 소켓 연결 해제
    return () => {
      skt.disconnect();
    };
  }, []);

  const createRoom = useCallback(() => {
    console.log("create room");
    socket.emit("createRoom");
  }, [socket]);

  const joinRoom = useCallback(() => {
    socket.emit("joinRoom", roomCode);
  }, [socket, roomCode]);

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (message.trim() && socket) {
        socket.emit("chat", { roomCode, message });
        setMessage("");
      }
    },
    [message, socket, roomCode],
  );

  return {
    roomCode,
    setRoomCode,
    message,
    setMessage,
    messages,
    sendMessage,
    createRoom,
    joinRoom,
    joinedRoom,
  };
};

export default useSockets;
