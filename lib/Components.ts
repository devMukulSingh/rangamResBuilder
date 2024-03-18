import dynamic from 'next/dynamic'
const AchievementsForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/achievements/AchievementsForm'),{ssr:false})
const EducationForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/education/EducationForm'),{ssr:false})
const ExperienceForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/experience/ExperienceForm'),{ssr:false})
const LanguageForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/language/LanguageForm'),{ssr:false})
const PersonalForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/personal/PersonalForm'),{ssr:false})
const ProjectsForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/projects/ProjectsForm'),{ssr:false})
const SocialForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/social/SocialForm'),{ssr:false})
const SkillsForm = dynamic( () => import('@/app/(root)/builder/[templateId]/components/skills/SkillsForm'),{ssr:false})



export const Components: any = {
  'Personal Information': PersonalForm,
  'Experience': ExperienceForm,
  'Skills': SkillsForm,
  'Education': EducationForm,
  'Social Links': SocialForm,
  'Projects': ProjectsForm,
  'Achievements': AchievementsForm,
  'Language': LanguageForm
}
