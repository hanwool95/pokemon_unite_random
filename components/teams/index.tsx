import { Team } from "../cards";

const Teams = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="ml-auto mt-10">
      {teams.map((team, index) => {
        return <p key={index}>{team.name}</p>;
      })}
    </div>
  );
};

export default Teams;
