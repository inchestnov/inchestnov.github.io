import type { ProjectItem } from '../../types';
import { Icon } from '../Icon';

interface ProjectMarkProps {
  project: ProjectItem;
}

// The project's own mark when it has one (scauta, marko), otherwise a
// generic GitHub badge (sensitive-go, and any future project without an
// icon yet) — shared between ProjectCard and ProjectDetailModal so both
// stay in sync automatically.
export function ProjectMark({ project }: ProjectMarkProps) {
  if (project.icon) {
    return (
      <span className="project-mark">
        <Icon id={project.icon} className="project-mark-icon" />
      </span>
    );
  }

  return (
    <span className="project-card-badge">
      <Icon id="github" className="project-card-badge-icon" />
    </span>
  );
}
