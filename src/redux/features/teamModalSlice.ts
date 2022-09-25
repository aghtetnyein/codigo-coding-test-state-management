// teamModalSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface
import { ISingleTeamProps } from "../../interfaces/team";

interface ITeamModalInterface {
  isOpen: boolean;
  formType: "create" | "update" | null;
  team?: ISingleTeamProps | null;
}

const initialState: ITeamModalInterface = {
  isOpen: false,
  formType: null,
  team: null,
};

// Redux Toolkit slice
export const teamModalSlice = createSlice({
  name: "teamModal",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openTeamModal: (state, action: PayloadAction<ITeamModalInterface>) => {
      state.isOpen = true;
      state.formType = action.payload.formType;
      state.team = action.payload.team;
    },
    closeTeamModal: (state) => {
      state.isOpen = false;
      state.formType = null;
      state.team = undefined;
    },
  },
});

export const { openTeamModal, closeTeamModal } = teamModalSlice.actions;
export default teamModalSlice.reducer;
