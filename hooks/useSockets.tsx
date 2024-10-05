import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const useSockets = () => {
  const [nickname, setNickname] = useState<string>("");
  const [roomCode, setRoomCode] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [nicknames, setNicknames] = useState<string[]>([]); // 닉네임 리스트 추가
  const [joinedRoom, setJoinedRoom] = useState(false);

  useEffect(() => {
    const skt = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });

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

    skt.on("updateUsers", (updatedNicknames: string[]) => {
      setNicknames(updatedNicknames); // 닉네임 리스트 업데이트
    });

    skt.on("error", (errorMessage: string) => {
      alert(errorMessage);
    });

    setSocket(skt);

    return () => {
      skt.disconnect();
    };
  }, []);

  const createRoom = useCallback(() => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    socket.emit("createRoom", { nickname });
  }, [socket, nickname]);

  const joinRoom = useCallback(() => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    socket.emit("joinRoom", { roomCode, nickname });
  }, [socket, roomCode, nickname]);

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (message.trim() && socket) {
        socket.emit("chat", { roomCode, message, nickname });
        setMessage("");
      }
    },
    [message, socket, roomCode, nickname],
  );

  return {
    roomCode,
    setRoomCode,
    nickname,
    setNickname,
    message,
    setMessage,
    messages,
    sendMessage,
    createRoom,
    joinRoom,
    joinedRoom,
    nicknames, // 닉네임 리스트 반환
  };
};

export default useSockets;
