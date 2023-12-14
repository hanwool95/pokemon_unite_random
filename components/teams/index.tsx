import { Team } from "../cards";

const Teams = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="ml-auto mt-10">
      {teams.map((team, index) => {
        return (
          <div className="flex text-2xl py-2" key={index}>
            <p className={team.point === 0 ? "text-red-500" : "text-blue-500"}>
              {team.point}
            </p>
            <p className="ml-4">{team.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Teams;
