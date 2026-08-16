import type { KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectItem } from '../../types';
import { Icon } from '../Icon';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpen: () => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      className="project-card glass"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      <div className="project-card-heading">
        <span className="project-card-badge">
          <Icon id="github" className="project-card-badge-icon" />
        </span>
        <h3 className="project-card-name">{project.name}</h3>
        <span className="project-card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      <p className="project-card-description">{project.description}</p>

      {project.tech.length > 0 ? (
        <ul className="project-tech-list">
          {project.tech.map((tech) => (
            <li key={tech.id} className="project-tech-tag">
              <Icon id={tech.id} className="project-tech-icon" />
              {tech.name}
            </li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}
