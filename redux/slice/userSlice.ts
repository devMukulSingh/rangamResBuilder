import {
  Iachievements,
  Icontact,
  Ieducation,
  Iexperience,
  Ilanguages,
  IpersonalInfo,
  Iprojects,
} from "@/lib/types/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IresumeData extends IinitialState {}

export interface IinitialState {
  userId: string;
  personalInfo: IpersonalInfo;
  experience: Iexperience[] | [];
  technicalSkills: string[];
  education: Ieducation[] | [];
  contact: Icontact | null;
  achievements: Iachievements[] | [];
  languages: Ilanguages[] | [];
  projects: Iprojects[] | [];
  progress: number;
  sidebar: boolean;
  aiSuggestedBio: string[];
  aiSuggestedComp: string[];
  goal: string;
  aiSuggestedCompDesc: string[];
  description: {
    value: string;
    index: number;
  }[];
}

const initialState: IinitialState = {
  userId: "",
  personalInfo: {
    fullName: "",
    email: "",
    profession: "",
    address: "",
    countryCode: "",
    phone: "",
    state: "",
    dob: "",
    birthPlace: "",
    bio: "",
  },
  experience: [],
  technicalSkills: [],
  education: [],
  contact: null,
  achievements: [],
  languages: [],
  projects: [],
  progress: 10,
  sidebar: true,
  aiSuggestedBio: [],
  aiSuggestedComp: [],
  goal: "",
  aiSuggestedCompDesc: [],
  description: [
    {
      index: 0,
      value: "",
    },
  ],
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
    setAiSuggestedCompDesc: (state, action) => {
      state.aiSuggestedCompDesc.push(action.payload);
    },
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    resetCompetences: (state) => {
      state.aiSuggestedComp = initialState.aiSuggestedComp;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
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
  setGoal,
  resetCompetences,
  setAiSuggestedCompDesc,
  setDescription,
  setUserId,
} = userSlice.actions;
