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
  /** Short prose overview of the role, rendered above `points` — a readable summary, not a duplicate of the bullet list. */
  summary: string;
  points: string[];
  technologies: SkillItem[];
  icon: string;
  /** Optional per-company accent (hex/rgb) driving that band's gradient wash.
   *  Unset → the band falls back to the site accent. Per-company identity
   *  colors are a deferred follow-up; the hook lands now. */
  accent?: string;
}

export interface SectionNavItem {
  href: string;
  label: string;
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
  sectionNav: {
    ariaLabel: string;
    items: SectionNavItem[];
  };
  contactList: {
    /** Shown as a transient toast after the email contact link is clicked (see ContactList's copy-to-clipboard handling). */
    emailCopiedLabel: string;
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
    /** Screen-reader-only label marking the job whose endDate is null as the current one (see TimelineItem). */
    currentLabel: string;
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
