import Cookies from "js-cookie";

// playerSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface
import { ISingleTeamProps } from "../../interfaces/team";
import { IPlayerProps } from "../../interfaces/player";

interface IPlayerTeamIdsInterface {
  playerId: number;
  teamId: number | undefined;
}

interface IPlayerSliceProps {
  players: IPlayerTeamIdsInterface[];
}

const initialState: IPlayerSliceProps = {
  players: Cookies.get("_players") ? JSON.parse(Cookies.get("_players")!) : [],
};

// Redux Toolkit slice
export const playerSlice = createSlice({
  name: "player",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPlayerToTeam: (
      state,
      action: PayloadAction<{
        player: IPlayerProps;
        team: ISingleTeamProps | null;
      }>
    ) => {
      const player = action.payload.player;
      const team = action.payload.team;

      const index = state.players.findIndex(
        (item) => item.playerId === player.id
      );

      if (index === -1) {
        const tempPlayer = {
          playerId: player.id,
          teamId: team?.id,
        };
        state.players.push(tempPlayer);
      } else {
        state.players.map((item: IPlayerTeamIdsInterface) => {
          if (item.playerId === player.id) {
            item.teamId = team?.id;
          }
          return item;
        });
      }

      Cookies.set("_players", JSON.stringify(state.players), { expires: 1 });
    },
    removePlayer: (state, action: PayloadAction<{ playerId: number }>) => {
      const playerId = action.payload.playerId;
      const index = state.players.findIndex(
        (item) => item.playerId === playerId
      );
      state.players.splice(index, 1);

      Cookies.set("_players", JSON.stringify(state.players), { expires: 1 });
    },
    removePlayersFromTeam: (
      state,
      action: PayloadAction<{ players: IPlayerTeamIdsInterface[] }>
    ) => {
      state.players = action.payload.players;

      Cookies.set("_players", JSON.stringify(state.players), { expires: 1 });
    },
  },
});

export const { addPlayerToTeam, removePlayer, removePlayersFromTeam } =
  playerSlice.actions;
export default playerSlice.reducer;
