import { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// reducers
import { addPlayerToTeam } from "../../redux/features/playerSlice";
import { updatePlayerCount } from "../../redux/features/teamSlice";

// components
import { Button, Select } from "../forms";

// icons
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

// interfaces
import { ISingleTeamProps } from "../../interfaces/team";
import { IPlayerProps } from "../../interfaces/player";

interface IAddPlayerToTeamModalProps {
  player: IPlayerProps;
  closeAddModal: () => void;
}
interface IPlayerTeamIdsInterface {
  playerId: number;
  teamId: number | undefined;
}

const AddPlayerToTeamModalProps = ({
  player,
  closeAddModal,
}: IAddPlayerToTeamModalProps) => {
  // redux
  const dispatch = useDispatch();
  const teams = useSelector((state: any) => state.team.teams);
  const players = useSelector((state: any) => state.player.players);

  const [selectedTeam, setSelectedTeam] = useState<ISingleTeamProps | null>(
    teams.length > 0 ? teams[0] : null
  );

  // functions
  const handleSelectTeam = (teamId: number) => {
    const team = teams.find((team: ISingleTeamProps) => team.id === teamId);
    setSelectedTeam(team);
  };

  const handleAdd = () => {
    if (selectedTeam) {
      dispatch(addPlayerToTeam({ player, team: selectedTeam }));

      let selectedTeamsCount =
        players.filter(
          (player: IPlayerTeamIdsInterface) => player.teamId === selectedTeam.id
        ).length + 1;
      dispatch(
        updatePlayerCount({
          teamId: selectedTeam.id,
          playerCount: selectedTeamsCount,
        })
      );
      closeAddModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-dark/70 flex items-center justify-center p-2">
      <div className="w-96 bg-white p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Select Team</h3>
          <Button
            type="button"
            variant="icon"
            disabled={false}
            icon={<CloseIcon className="w-4 h-4" />}
            handleClick={closeAddModal}
          />
        </div>
        <div className="mt-8 mb-2">
          {teams.length > 0 ? (
            <Select
              value={selectedTeam?.id ?? 0}
              options={teams}
              handleSelectTeam={handleSelectTeam}
            />
          ) : (
            <p className="mb-2 text-md text-red">No teams available</p>
          )}
        </div>
        {teams.length > 0 && (
          <Button
            variant={"primary"}
            type={"button"}
            disabled={false}
            label={"Add to team"}
            handleClick={handleAdd}
          />
        )}
      </div>
    </div>
  );
};

export default AddPlayerToTeamModalProps;
