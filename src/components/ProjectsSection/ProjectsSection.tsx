import { memo, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import type { ProjectItem } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';

function ProjectsSectionComponent() {
  const { content } = useLanguage();
  const { title, items } = content.projects;
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <section className="projects-section" id="projects-section" aria-label={title}>
      <div className="projects-inner">
        <div className="project-grid">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </div>
      {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

export const ProjectsSection = memo(ProjectsSectionComponent);
