import { memo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { TimelineItem } from './TimelineItem';

function ExperienceSectionComponent() {
  const { content } = useLanguage();
  const { jobs, title } = content.experience;
  const { education } = content;

  return (
    <section className="experience-section" id="experience-section" aria-label={title}>
      <ol className="experience-timeline">
        {jobs.map((job) => (
          <TimelineItem
            key={job.company}
            period={job.period}
            company={job.company}
            role={job.role}
            points={job.points}
            icon={job.icon}
          />
        ))}
        <TimelineItem
          period={education.period}
          company={education.institution}
          role={education.degree}
          points={education.description}
          icon={education.icon}
        />
      </ol>
    </section>
  );
}

export const ExperienceSection = memo(ExperienceSectionComponent);
