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
  /** ISO 'YYYY-MM' start month, used to compute the displayed tenure duration. */
  startDate: string;
  /** ISO 'YYYY-MM' end month, or null for an ongoing job (duration computed against the current date). */
  endDate: string | null;
  points: string[];
  technologies: SkillItem[];
  icon: string;
}

export interface EducationEntry {
  period: string;
  institution: string;
  degree: string;
  description: string[];
  icon: string;
  /** Label shown on the divider line separating education from work experience in the merged timeline. */
  dividerLabel: string;
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
    paragraphs: string[];
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
  pdfExport: {
    buttonLabel: string;
    downloadLabel: string;
    fileName: string;
    /** PDF's own /Title metadata — distinct from fileName; a viewer's own "Save As" dialog suggests a name from this metadata field, not from any wrapper HTML around it. */
    documentTitle: string;
  };
}
