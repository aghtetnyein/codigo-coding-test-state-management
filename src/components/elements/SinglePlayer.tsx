import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { Button } from "../forms";
import { AddPlayerToTeamModal } from ".";

// reducers
import { removePlayer } from "../../redux/features/playerSlice";
import { updatePlayerCount } from "../../redux/features/teamSlice";

// interfaces
import { IPlayerProps } from "../../interfaces/player";
interface IPlayerTeamIdsInterface {
  playerId: number;
  teamId: number | undefined;
}

const SinglePlayer = ({
  id,
  first_name,
  last_name,
  height_feet,
  height_inches,
  weight_pounds,
  position,
  team,
}: IPlayerProps) => {
  const dispatch = useDispatch();
  const players = useSelector((state: any) => state.player.players);
  // states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // functions
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleRemove = () => {
    dispatch(
      removePlayer({
        playerId: id,
      })
    );
    if (team) {
      let selectedTeamsCount =
        players.filter(
          (player: IPlayerTeamIdsInterface) => player.teamId === team.id
        ).length - 1;
      dispatch(
        updatePlayerCount({ teamId: team.id, playerCount: selectedTeamsCount })
      );
    }
  };

  return (
    <>
      <div className="w-full bg-white border border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <p className="text-md font-bold">
            {first_name} {last_name}
          </p>
          <p className="text-sm text-red font-bold">{position}</p>
        </div>

        <div className="mt-1">
          <p className="text-sm text-gray-500">
            Height:{" "}
            {height_feet ? (
              <span>{height_feet} feet</span>
            ) : (
              <span>- feet</span>
            )}{" "}
            ,{" "}
            {height_feet ? (
              <span>{height_inches} inches</span>
            ) : (
              <span>- inches</span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Weight:{" "}
            {weight_pounds ? (
              <span>{weight_pounds} lb</span>
            ) : (
              <span>- lb</span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Team:{" "}
            <span className="text-primary font-bold">
              {team ? team?.name : "No team"}
            </span>
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-1 items-center justify-between">
          {team ? (
            <Button
              variant={"bordered"}
              type={"button"}
              disabled={false}
              label={"Remove from team"}
              handleClick={handleRemove}
            />
          ) : (
            <Button
              variant={"primary"}
              type={"button"}
              disabled={false}
              label={"Add to team"}
              handleClick={() => setIsAddModalOpen(true)}
            />
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddPlayerToTeamModal
          player={{
            id,
            first_name,
            last_name,
            height_feet,
            height_inches,
            weight_pounds,
            position,
            team,
          }}
          closeAddModal={closeAddModal}
        />
      )}
    </>
  );
};

export default SinglePlayer;
