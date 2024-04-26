export interface IpersonalInfo {
  fullName: string;
  email: string;
  profession: string;
  countryCode: string;
  phone: string;
  bio: string;
  state?: string | undefined;
  address?: string | undefined;
  dob?: string | undefined;
  birthPlace?: string | undefined;
  city?: string | undefined;
}

export interface Iexperience {
  companyName: string;
  jobTitle: string;
  startDate: Date | string;
  endDate: Date | string;
  id: string;
  checkboxWorkingStatus: boolean;
  checkboxVolunteering: boolean;
  checkboxInternship: boolean;
  description: string;
  competences: {
    description: string;
    isSelected: boolean;
    name: string;
    id: number;
  }[];
  address?: string;
  employer?: string;
}
export interface Ieducation {
  schoolName: string;
  degree: string;
  speciality: string;
  startDate: any;
  endDate?: any | undefined;
  id: string;
  checkboxPursuing: boolean;
  schoolLocation?: string | undefined;
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
