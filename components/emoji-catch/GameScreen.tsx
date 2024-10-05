import ScoreBoard from "@/components/ScoreBoard";

const GameScreen = ({
  nicknames,
  scores,
}: {
  nicknames: string[];
  scores: number[];
}) => {
  return (
    <div className="w-full h-full py-8">
      <ScoreBoard nicknames={nicknames} scores={scores} />
    </div>
  );
};

export default GameScreen;
