import { memo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { formatJobDuration } from '../../utils/jobDuration';
import { ExperienceBand } from './ExperienceBand';
import { EducationCard } from './EducationCard';

function ExperienceSectionComponent() {
  const { content, language } = useLanguage();
  const { jobs, title, currentLabel } = content.experience;

  return (
    <>
      <section className="experience-section" id="experience-section" aria-label={title}>
        <ol className="experience-bands">
          {jobs.map((job) => (
            <ExperienceBand
              key={job.company}
              period={job.period}
              duration={formatJobDuration(job.startDate, job.endDate, language)}
              company={job.company}
              role={job.role}
              summary={job.summary}
              points={job.points}
              technologies={job.technologies}
              icon={job.icon}
              accent={job.accent}
              isCurrent={job.endDate === null}
              currentLabel={currentLabel}
            />
          ))}
        </ol>
      </section>
      <EducationCard />
    </>
  );
}

export const ExperienceSection = memo(ExperienceSectionComponent);
