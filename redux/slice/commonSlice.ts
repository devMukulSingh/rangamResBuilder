import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  sidebar: boolean;
  formComp: string | null;
  bioLoading: boolean;
  skillsLoading: boolean;
  competenceLoading: boolean;
}

const initialState: IinitialState = {
  sidebar: true,
  formComp: "Personal Information",
  bioLoading: false,
  skillsLoading: false,
  competenceLoading: false,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setFormComp: (state, action) => {
      state.formComp = action.payload;
    },
    setBioLoading: (state, action) => {
      state.bioLoading = action.payload;
    },
    setSkillsLoading: (state, action) => {
      state.skillsLoading = action.payload;
    },
    setCompLoading: (state, action) => {
      state.competenceLoading = action.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export default commonSlice.reducer;

export const {
  toggleSidebar,
  setSidebar,
  setFormComp,
  setBioLoading,
  setSkillsLoading,
  setCompLoading,
} = commonSlice.actions;
