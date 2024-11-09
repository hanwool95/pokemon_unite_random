import EmojiCatchContainer from "@/components/emoji-catch";
import PokemonCardChallenge from "@/components/challenge/pokemon-card";

export default function PokeCardDeckChallengePage() {
  return (
    <div className={"flex flex-col w-full"}>
      <PokemonCardChallenge
        youtubeId={"G_EQvHPYLXs"}
        cardPack={"최강의유전자"}
      />
    </div>
  );
}
