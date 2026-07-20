export type Language = 'ru' | 'en';

export interface ContactInfo {
  label: string;
  value: string;
  href: string;
}

export interface HeroContacts {
  telegram: ContactInfo;
  linkedin: ContactInfo;
  github: ContactInfo;
  email: ContactInfo;
}

export interface SkillItem {
  id: string;
  name: string;
}

export interface RoadmapItem {
  id: string;
  name: string;
}

export interface RoadmapGroup {
  name: string;
  items: RoadmapItem[];
}

export interface ExperienceJob {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export interface EducationEntry {
  period: string;
  institution: string;
  degree: string;
  description: string;
}

export interface ResumeContent {
  meta: {
    pageTitle: string;
  };
  hero: {
    name: string;
    role: string;
    avatarAlt: string;
    contacts: HeroContacts;
  };
  languageSwitcher: {
    ariaLabel: string;
  };
  skills: {
    title: string;
    rows: SkillItem[][];
  };
  about: {
    text: string;
  };
  experience: {
    title: string;
    jobs: ExperienceJob[];
  };
  education: EducationEntry;
  roadmap: {
    title: string;
    groups: RoadmapGroup[];
  };
  footer: {
    copyrightText: string;
  };
}
