import { memo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { formatJobDuration } from '../../utils/jobDuration';
import { TimelineItem } from './TimelineItem';

function ExperienceSectionComponent() {
  const { content, language } = useLanguage();
  const { jobs, title, currentLabel } = content.experience;
  const { education } = content;

  return (
    <section className="experience-section" id="experience-section" aria-label={title}>
      <ol className="experience-timeline">
        {jobs.map((job) => (
          <TimelineItem
            key={job.company}
            period={job.period}
            duration={formatJobDuration(job.startDate, job.endDate, language)}
            company={job.company}
            role={job.role}
            points={job.points}
            technologies={job.technologies}
            icon={job.icon}
            isCurrent={job.endDate === null}
            currentLabel={currentLabel}
          />
        ))}
        <TimelineItem
          period={education.period}
          company={education.institution}
          role={education.degree}
          points={education.description}
          icon={education.icon}
          dividerLabel={education.dividerLabel}
        />
      </ol>
    </section>
  );
}

export const ExperienceSection = memo(ExperienceSectionComponent);
