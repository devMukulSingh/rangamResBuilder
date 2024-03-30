export interface IpersonalInfo {
  fullName: string;
  email: string;
  profession: string;
  countryCode: string;
  mobile: string;
  bio: string;
  state?: string;
  address?: string;
  dob?: string;
  birthPlace?: string;
  city?: string;
}

export interface Iexperience {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  id: string;
  checkboxWorkingStatus: boolean;
  checkboxVolunteering: boolean;
  checkboxInternship: boolean;
  description: string;
  competences: {
    isSelected:boolean,
    name:string
  }[];
  address?: string;
  employer?: string;
}

export interface Ieducation {
  schoolName: string;
  degree: string;
  speciality: string;
  startDate: string;
  endDate: string;
  id: string;
  checkboxPursuing: boolean;
  schoolLocation?: string;
}
export interface Icontact {
  linkedIn: string;
  twitter: string;
  github: string;
  portfolio: string;
}

export interface Ilanguages {
  language: string;
  strength: string;
}

export interface Iprojects {
  projectName: string;
  projectUrl: string;
  description: string;
  id: string;
}

export interface Iachievements {
  value: string;
}
// export interface IaisuggestedComp{
//   data:string[];
//   isLoading:boolean;
//   error:string | null
// }
