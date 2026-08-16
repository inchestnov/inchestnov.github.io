import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../hooks/useLanguage';
import type { ProjectItem } from '../../types';
import { Icon } from '../Icon';

interface ProjectDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
}

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div className="project-detail-code">
      <div className="project-detail-code-tab">{filename}</div>
      <pre className="project-detail-code-content">{code}</pre>
    </div>
  );
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { content } = useLanguage();
  const { featuresTitle, viewOnGithubLabel, closeLabel } = content.projects.detail;
  const repoPath = project.repoUrl.replace(/^https?:\/\//, '');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Portal to <body>: this modal can be triggered from inside a `.glass`
  // `.project-card`, whose `backdrop-filter` would otherwise become the
  // containing block for this `position: fixed` overlay (same reasoning as
  // PdfPreviewModal's own portal).
  return createPortal(
    <div className="project-detail-backdrop" onClick={onClose}>
      <div className="project-detail-panel glass" onClick={(event) => event.stopPropagation()}>
        <div className="project-detail-header">
          <div className="project-detail-heading">
            <span className="project-card-badge">
              <Icon id="github" className="project-card-badge-icon" />
            </span>
            <h3 className="project-detail-name">{project.name}</h3>
          </div>
          <button type="button" className="project-detail-close" onClick={onClose} aria-label={closeLabel}>
            ✕
          </button>
        </div>

        <div className="project-detail-body">
          <div className="project-detail-info">
            <p className="project-detail-description">{project.description}</p>

            <h4 className="project-detail-features-title">{featuresTitle}</h4>
            <ul className="project-detail-features">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

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
          </div>

          <div className="project-detail-media">
            {project.media.kind === 'image' ? (
              <div className="project-detail-media-frame">
                <img src={project.media.src} alt={project.media.alt} />
              </div>
            ) : (
              <CodeBlock filename={project.media.filename} code={project.media.code} />
            )}
          </div>
        </div>

        <div className="project-detail-footer">
          <span className="project-detail-repo-path">{repoPath}</span>
          <a
            className="project-detail-cta"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon id="github" className="project-detail-cta-icon" />
            {viewOnGithubLabel}
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
