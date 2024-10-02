import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const useSockets = () => {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // 소켓 서버에 연결
    const skt = io("http://localhost:4000");

    // 서버로부터 메시지를 받으면 messages 배열에 추가
    skt.on("chat", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    setSocket(skt);

    // 컴포넌트가 언마운트 될 때 소켓 연결 해제
    return () => {
      skt.disconnect();
    };
  }, []);

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (message.trim() && socket) {
        socket.emit("chat", message);
        setMessage("");
      }
    },
    [message, socket],
  );

  return { message, setMessage, messages, sendMessage };
};

export default useSockets;
