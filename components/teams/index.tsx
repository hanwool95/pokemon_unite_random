import Image from "next/image";
import { Team } from "../cards";

const Teams = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="ml-auto mr-32 mt-10">
      {teams.map((team, index) => {
        return (
          <div className="flex text-2xl py-2" key={index}>
            <p className={team.point === 0 ? "text-red-500" : "text-blue-500"}>
              {team.point}
            </p>
            <p className="ml-4">{team.name}</p>
            <div className="ml-8 flex">
              {team.currentPokemon.map((pokemonUrl, urlIndex) => {
                return (
                  <Image
                    className="mx-0.5"
                    key={index.toString() + urlIndex.toString()}
                    src={pokemonUrl}
                    alt={pokemonUrl}
                    width={50}
                    height={50}
                    unoptimized
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Teams;
