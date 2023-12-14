import Image from "next/image";
import { Team } from "../cards";

const Teams = ({
  teams,
  selectedTeamIndex,
  setSelectedTeamIndex,
}: {
  teams: Team[];
  selectedTeamIndex: number;
  setSelectedTeamIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="ml-auto mr-32 mt-10">
      {teams.map((team, index) => {
        return (
          <div
            className={`flex text-2xl p-2 rounded-lg ${
              selectedTeamIndex === index ? "border border-blue-600" : ""
            } `}
            key={index}
            onClick={() => {
              setSelectedTeamIndex(index);
            }}
          >
            <p
              className={
                team.point <= 0
                  ? "text-red-500 my-auto"
                  : "text-blue-500 my-auto"
              }
            >
              {team.point}
            </p>
            <p className="ml-4 my-auto">{team.name}</p>
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
