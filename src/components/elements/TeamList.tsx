// redux
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { SingleTeam, TeamModal } from "./";
import { Button } from "../forms";

// interfaces
import { ISingleTeamProps } from "../../interfaces/team";

// reducers
import { openTeamModal } from "../../redux/features/teamModalSlice";

const TeamList = () => {
  // redux - states
  const dispatch = useDispatch();
  const teams = useSelector((state: any) => state.team.teams);
  const isTeamModalOpen = useSelector((state: any) => state.teamModal.isOpen);

  return (
    <>
      <div>
        <div className="h-12 flex items-center justify-between">
          <h3 className="w-full text-lg font-bold">Team List</h3>
          <div className="w-40">
            <Button
              variant={"primary"}
              type={"button"}
              disabled={false}
              label={"New team"}
              handleClick={() =>
                dispatch(
                  openTeamModal({
                    isOpen: true,
                    formType: "create",
                    team: null,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="overflow-scroll mt-4 p-4 grid grid-cols-2 gap-4">
          {teams.length > 0 ? (
            <>
              {teams.map((team: ISingleTeamProps, index: number) => (
                <React.Fragment key={index}>
                  <SingleTeam
                    id={team.id}
                    name={team.name}
                    playerCount={team.playerCount}
                    region={team.region}
                    country={team.country}
                  />
                </React.Fragment>
              ))}
            </>
          ) : (
            <p className="text-md text-red">No team created.</p>
          )}
        </div>
      </div>

      {isTeamModalOpen && <TeamModal />}
    </>
  );
};

export default TeamList;
