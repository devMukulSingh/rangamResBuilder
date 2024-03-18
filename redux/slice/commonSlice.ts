import { createSlice } from "@reduxjs/toolkit";


export interface IinitialState {
    sidebar: boolean,
    formComp : string | null,
    bioLoading:boolean
    skillsLoading:boolean

  }
  
  const initialState: IinitialState = {
    sidebar: true,
    formComp: "Personal Information",
    bioLoading:false,
    skillsLoading:false
  }
  

const commonSlice = createSlice({
    name:'commonSlice',
    initialState,
    reducers:{
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar
          },
          setFormComp : (state,action ) => {
            state.formComp = action.payload;
          },
          setBioLoading : (state,action) => {
            state.bioLoading = action.payload;
          },
          setSkillsLoading : (state,action) => {
            state.skillsLoading = action.payload;
          }
    }
})

export default commonSlice.reducer

export const { toggleSidebar,setFormComp,setBioLoading,setSkillsLoading } =
  commonSlice.actions
