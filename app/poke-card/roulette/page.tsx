import EmojiCatchContainer from "@/components/emoji-catch";
import Roulette from "@/components/poke-card/roulette";

export default function Home() {
  return (
    <div className={"flex flex-col w-full max-w-2xl mx-auto pb-12"}>
      <Roulette />
    </div>
  );
}
