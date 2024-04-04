import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  sidebar: boolean;
  formComp: string;
  bioLoading: boolean;
  skillsLoading: boolean;
  competenceLoading: boolean;
  compDescLoading: boolean;
  sidebarOptions: {
    name: string;
    isValidated: boolean;
    index: number;
  }[];
  showSidebarOptions:boolean
}

const initialState: IinitialState = {
  sidebar: true,
  formComp: "Personal Information",
  bioLoading: false,
  skillsLoading: false,
  competenceLoading: false,
  compDescLoading: false,
  sidebarOptions: [
    {
      index: 0,
      name: "Personal Information",
      isValidated: false,
    },
    {
      index: 1,
      name: "Experience",
      isValidated: true,
    },
    {
      index: 2,
      name: "Skills",
      isValidated: true,
    },
    {
      index: 3,
      name: "Education",
      isValidated: false,
    },
    {
      index: 4,
      name: "Social Links",
      isValidated: true,
    },
    {
      index: 5,
      name: "Projects",
      isValidated: true,
    },
    {
      index: 6,
      name: "Achievments",
      isValidated: true,
    },
    {
      index: 7,
      name: "Language",
      isValidated: true,
    },
  ],
  showSidebarOptions:false,
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
    setCompDescLoading: (state, action) => {
      state.compDescLoading = action.payload;
    },
    setValidatedOptions: (state, action) => {
      const filtered = state.sidebarOptions.filter(
        (item) => item.name !== action.payload.name,
      );
      state.sidebarOptions = [...filtered, action.payload];
    },
    setShowSidebarOptions : (state) => {
      state.showSidebarOptions = !state.showSidebarOptions;
    }
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
  setCompDescLoading,
  setValidatedOptions,
  setShowSidebarOptions
} = commonSlice.actions;
