export interface IpersonalInfo {
  fullName: string
  email: string
  profession: string
  address: string
  countryCode: string
  mobile: string
  state: string
  dob: Date | string
  birthPlace: string
  bio: string
}

export interface Iexperience {
  companyName: string
  jobTitle: string
  startDate: string
  endDate: string
  id: string
  checkboxWorkingStatus: boolean
  checkboxVolunteering: boolean
  checkboxInternship: boolean
  description: string,
  competences:string[]
}

export interface Ieducation {
  schoolName: string
  degree: string
  speciality: string
  startDate: string
  endDate: string
  id: string,
  checkboxPursuing:boolean
}
export interface Icontact {
  linkedIn: string
  twitter: string
  github: string
  portfolio: string
}

export interface Ilanguages {
  language: string
  strength: string
}

export interface Iprojects {
  projectName: string
  projectUrl: string
  description: string
  id: string
}

export interface Iachievements {
  value: string
}
