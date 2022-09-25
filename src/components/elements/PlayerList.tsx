import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// components
import { SinglePlayer } from "./";

// interface
import { IPlayerProps } from "../../interfaces/player";
import { ISingleTeamProps } from "../../interfaces/team";
interface IPlayerTeamIdsInterface {
  playerId: number;
  teamId: number | undefined;
}

const PlayerList = () => {
  // redux - states
  const playersFromRedux = useSelector((state: any) => state.player.players);
  const teamsFromRedux = useSelector((state: any) => state.team.teams);
  // states
  const [finalPlayers, setFinalPlayers] = useState<IPlayerProps[]>([]);

  const checkPlayers = (tempPlayers: IPlayerProps[]) => {
    if (playersFromRedux.length > 0) {
      const temp = tempPlayers.map((player: IPlayerProps) => {
        const playerFromRedux = playersFromRedux.find(
          (p: IPlayerTeamIdsInterface) => p.playerId === player.id
        );

        const tempTeam = teamsFromRedux.find(
          (team: ISingleTeamProps) => team.id === playerFromRedux?.teamId
        );

        if (playerFromRedux) {
          player.team = tempTeam;
        } else {
          player.team = null;
        }
        return player;
      });
      return temp;
    } else {
      const temp = tempPlayers.map((player: IPlayerProps) => {
        player.team = null;
        return player;
      });
      return temp;
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch("https://www.balldontlie.io/api/v1/players", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
      });
      const resJson = await res.json();
      return resJson;
    };

    fetchPlayers().then((res) => {
      const playersToFinalized = res.data.map((player: IPlayerProps) => {
        return { ...player, team: null };
      });
      setFinalPlayers(checkPlayers(playersToFinalized));
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFinalPlayers(checkPlayers(finalPlayers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersFromRedux]);

  return (
    <div>
      <h3 className="h-12 text-lg font-bold">Player List</h3>
      <div className="h-[75vh] overflow-scroll mt-4 p-4 grid grid-cols-2 gap-4">
        {finalPlayers.map((player: IPlayerProps, index: number) => (
          <React.Fragment key={index}>
            <SinglePlayer
              id={player.id}
              first_name={player.first_name}
              last_name={player.last_name}
              position={player.position}
              team={player.team}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
