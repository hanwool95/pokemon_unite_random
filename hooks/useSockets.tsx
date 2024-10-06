import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";

const useSockets = () => {
  const [nickname, setNickname] = useState<string>("");
  const [roomCode, setRoomCode] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [currentPokemonName, setCurrentPokemonName] = useState("");
  const [currentImage, setCurrentImage] = useState<string>(""); // 포켓몬 이미지 URL
  const [currentHint, setCurrentHint] = useState<string>(""); // 현재 힌트
  const [currentTurn, setCurrentTurn] = useState<string>(""); // 현재 차례인 사용자
  const [gameMessage, setGameMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [timeLeft, setTimeLeft] = useState(timer); // 30초 타이머
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tickSound = useRef<HTMLAudioElement | null>(null); // 사운드 재생을 위한 Ref

  const [isLoading, setIsLoading] = useState(false);

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
      setScores((prev) => [...prev, 0]);
      setJoinedRoom(true);
    });

    skt.on(
      "chat",
      ({ sender, message }: { sender: string; message: string }) => {
        setMessages((prev) => [...prev, { sender, message }]);
      },
    );

    skt.on("error", (errorMessage: string) => {
      alert(errorMessage);
      setIsLoading(false);
    });

    skt.on("addHint", ({ hint }: { hint: string }) => {
      setCurrentHint(hint);
    });

    skt.on("updateUsers", (updatedNicknames: string[]) => {
      setNicknames(updatedNicknames);
    });

    skt.on("updateScores", (updatedScores: number[]) => {
      setScores(updatedScores);
    });

    skt.on("gameMessage", ({ message }: { message: string }) => {
      setGameMessage(message);
      setTimeout(() => {
        setGameMessage("");
      }, 3000);
    });

    skt.on("newHost", (hostId: string) => {
      setIsHost(skt.id === hostId);
    });

    skt.on(
      "gameStarted",
      ({ scores, timer: initTimer }: { scores: number[]; timer: number }) => {
        setScores(scores); // 초기 점수 설정
        setTimer(initTimer);
        setTimeLeft(initTimer);
        setGameStarted(true); // 게임 시작
      },
    );

    skt.on(
      "pokemonImage",
      ({
        image,
        name,
        timer: initTimer,
      }: {
        image: string;
        name: string;
        timer: number;
      }) => {
        setCurrentImage(image);
        setCurrentPokemonName(name);
        setCurrentHint("");
        setTimer(initTimer);
        setTimeLeft(initTimer);
      },
    );

    skt.on("yourTurn", (currentNickname: string) => {
      setCurrentTurn(currentNickname);
    });

    setSocket(skt);

    return () => {
      skt.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      if (isMyTurn) skipRound(); // 시간이 끝나면 다음 차례로 넘어감
    }

    // 10초 남았을 때부터 사운드 재생
    if (timeLeft === 7 && tickSound.current) {
      tickSound.current.play();
    }

    return () => clearTimeout(timerRef.current!);
  }, [timeLeft, gameStarted]);

  const createRoom = useCallback(() => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    socket.emit("createRoom", { nickname });
  }, [socket, nickname]);

  const joinRoom = useCallback(() => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    socket.emit("joinRoom", { roomCode, nickname });
  }, [socket, roomCode, nickname]);

  const startGame = useCallback(() => {
    socket.emit("startGame", { roomCode, timer });
  }, [socket, roomCode, timer]);

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

  const skipRound = useCallback(() => {
    socket.emit("skipRound", { roomCode });
  }, [socket, roomCode]);

  const submitGuess = useCallback(
    (guess: string) => {
      socket.emit("submitGuess", { roomCode, guess });
      socket.emit("chat", { roomCode, message: `정답! ${guess}`, nickname });
    },
    [socket, roomCode, nickname],
  );

  const addHint = useCallback(
    (hint: string) => {
      socket.emit("addHint", { roomCode, hint });
    },
    [socket, roomCode],
  );

  const isMyTurn = useMemo(() => {
    return nickname === currentTurn;
  }, [nickname, currentTurn]);

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
    startGame,
    joinedRoom,
    isHost,
    gameStarted,
    scores,
    nicknames,
    currentImage,
    currentHint,
    setCurrentHint,
    currentTurn,
    submitGuess,
    addHint,
    isMyTurn,
    gameMessage,
    currentPokemonName,
    skipRound,
    isLoading,
    timer,
    setTimer,
    timeLeft,
    setTimeLeft,
    tickSound,
  };
};

export default useSockets;
