const GameScreen = ({
  nicknames,
  scores,
}: {
  nicknames: string[];
  scores: number[];
}) => {
  return (
    <div className="flex flex-col w-[120px] h-full whitespace-nowrap gap-4">
      {nicknames.map((name, idx) => (
        <div key={idx} className="w-1/8 p-4 border">
          <h2 className="text-lg font-bold">{name}</h2>
          <p>점수: {scores[idx]}</p>
        </div>
      ))}
    </div>
  );
};

export default GameScreen;
