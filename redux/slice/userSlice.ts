import {
  Iachievements,
  Icontact,
  Ieducation,
  Iexperience,
  Ilanguages,
  IpersonalInfo,
  Iprojects,
} from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  personalInfo: IpersonalInfo;
  experience: Iexperience[] | null;
  technicalSkills: string[];
  education: Ieducation[] | null;
  contact: Icontact | null;
  achievements: Iachievements[] | null;
  languages: Ilanguages[] | null;
  projects: Iprojects[] | null;
  progress: number;
  sidebar: boolean;
  aiSuggestedBio: string[];
  aiSuggestedComp: string[];
  aiSuggesedSkills: string[];
  goal : string;
}

const initialState: IinitialState = {
  personalInfo: {
    fullName: "",
    email: "",
    profession: "",
    address: "",
    countryCode: "",
    mobile: "",
    state: "",
    dob: "",
    birthPlace: "",
    bio: "",
 
  },
  experience: [
    {
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      id: "",
      checkboxWorkingStatus: false,
      checkboxVolunteering: false,
      checkboxInternship: false,
      description: "",
      competences: [],
      address: "",
      employer: "",
    },
  ],
  technicalSkills: [],
  education: [
    {
      schoolLocation: "",
      schoolName: "",
      degree: "",
      speciality: "",
      startDate: "",
      endDate: "",
      id: "",
      checkboxPursuing: false,
    },
  ],
  contact: null,
  achievements: null,
  languages: null,
  projects: null,
  progress: 10,
  sidebar: true,
  aiSuggestedBio: [],
  aiSuggestedComp: [],
  aiSuggesedSkills: [],
  goal: ""
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setTechnicalSkills: (state, action) => {
      state.technicalSkills = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setAchievements: (state, action) => {
      state.achievements = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    setProgress: (state) => {
      const singleProgress = Math.floor(100 / 8);
      state.progress = state.progress + singleProgress;
    },
    resetForm: (state) => {
      state.progress = 10;
      (state.achievements = initialState.achievements),
        (state.contact = initialState.contact),
        (state.education = initialState.education),
        (state.experience = initialState.experience),
        (state.languages = initialState.languages),
        (state.personalInfo = initialState.personalInfo),
        (state.projects = initialState.projects),
        (state.technicalSkills = initialState.technicalSkills),
        (state.aiSuggestedBio = initialState.aiSuggestedBio),
        (state.aiSuggestedComp = initialState.aiSuggestedComp);
    },

    setAiSuggestedBio: (state, action) => {
      state.aiSuggestedBio = action.payload;
    },
    setSelectedBio: (state, action) => {
      state.personalInfo.bio = action.payload;
    },
    setAiSuggestedComp: (state, action) => {
      state.aiSuggestedComp = action.payload;
    },
    setAiSuggestedSkills: (state, action) => {
      state.aiSuggesedSkills = action.payload;
    },
    setGoal : (state,action) => {
      state.goal = action.payload;
    }
  },
});

export default userSlice.reducer;

export const {
  setPersonalInfo,
  setExperience,
  setTechnicalSkills,
  setEducation,
  setContact,
  setAchievements,
  setLanguages,
  setProjects,
  setProgress,
  resetForm,
  setAiSuggestedBio,
  setSelectedBio,
  setAiSuggestedComp,
  setAiSuggestedSkills,
  setGoal
} = userSlice.actions;
