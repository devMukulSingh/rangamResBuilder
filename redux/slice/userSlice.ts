import {
  Iachievements,
  Icontact,
  Ieducation,
  Iexperience,
  Ilanguages,
  IpersonalInfo,
  Iprojects,
} from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'

export interface IinitialState {
  personalInfo: IpersonalInfo
  experience: Iexperience[] | null
  technicalSkills: string[] 
  education: Ieducation[] | null
  contact: Icontact | null
  achievements: Iachievements[] | null
  languages: Ilanguages[] | null
  projects: Iprojects[] | null
  progress: number
  sidebar: boolean
  aiSuggestedSkills: string[]
  aiSuggestedBio: string[]
}

const initialState: IinitialState = {
  personalInfo: {
    fullName: '',
    email: '',
    profession: '',
    address: '',
    countryCode: '',
    mobile: '',
    state: '',
    dob: '',
    birthPlace: '',
    bio: ''
  },
  experience: [
    {
      companyName: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      id: '',
      checkboxWorkingStatus: false,
      checkboxVolunteering: false,
      checkboxInternship: false,
      selectedSkills: [],
      description: '',
    }
  ],
  technicalSkills: [],
  education: null,
  contact: null,
  achievements: null,
  languages: null,
  projects: null,
  progress: 10,
  sidebar: true,
  aiSuggestedSkills: [],
  aiSuggestedBio: []
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload
    },
    setExperience: (state, action) => {
      state.experience = action.payload
    },
    setTechnicalSkills: (state, action) => {
      state.technicalSkills = action.payload;
      // if (action.payload.aiGenSkills) {
      //   state.technicalSkills.aiGenSkills = action.payload.aiGenSkills
      // } else {
      //   state.technicalSkills.customSkills = action.payload.customSkills
      // }
    },
    setEducation: (state, action) => {
      state.education = action.payload
    },
    setContact: (state, action) => {
      state.contact = action.payload
    },
    setAchievements: (state, action) => {
      state.achievements = action.payload
    },
    setLanguages: (state, action) => {
      state.languages = action.payload
    },
    setProjects: (state, action) => {
      state.projects = action.payload
    },

    setProgress: state => {
      const singleProgress = Math.floor(100 / 8)
      state.progress = state.progress + singleProgress
    },
    resetForm: state => {
      state.progress = 10
      ;(state.achievements = initialState.achievements),
        (state.contact = initialState.contact),
        (state.education = initialState.education),
        (state.experience = initialState.experience),
        (state.languages = initialState.languages),
        (state.personalInfo = initialState.personalInfo),
        (state.projects = initialState.projects),
        (state.technicalSkills = initialState.technicalSkills),
        (state.aiSuggestedSkills = initialState.aiSuggestedSkills),
        (state.aiSuggestedBio = initialState.aiSuggestedBio)
    },
    setAiSuggestedSkills: (state, action) => {
      state.aiSuggestedSkills = action.payload
    },
    setAiSuggestedBio: (state, action) => {
      state.aiSuggestedBio = action.payload
    },
    setSelectedBio: (state, action) => {
      state.personalInfo.bio = action.payload
    }
  }
})

export default userSlice.reducer

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
  setAiSuggestedSkills,
  setAiSuggestedBio,
  setSelectedBio
} = userSlice.actions
