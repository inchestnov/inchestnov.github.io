import { motion, useReducedMotion } from 'framer-motion';
import type { SkillItem } from '../../types';
import { Icon } from '../Icon';

interface TimelineItemProps {
  period: string;
  duration?: string;
  company: string;
  role: string;
  points: string[];
  technologies?: SkillItem[];
  icon: string;
}

export function TimelineItem({ period, duration, company, role, points, technologies, icon }: TimelineItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      className="timeline-item"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="timeline-marker" aria-hidden="true" />
      <motion.div className="timeline-content" whileHover={shouldReduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.2 }}>
        <p className="timeline-period">
          {period}
          {duration ? <span className="timeline-duration"> ({duration})</span> : null}
        </p>
        <div className="timeline-heading">
          <Icon id={icon} className="timeline-icon" />
          <h3 className="timeline-company">{company}</h3>
        </div>
        <p className="timeline-role">{role}</p>
        <ul className="timeline-points">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        {technologies && technologies.length > 0 ? (
          <ul className="timeline-tech-list">
            {technologies.map((tech) => (
              <li key={tech.id} className="timeline-tech-tag">
                <Icon id={tech.id} className="timeline-tech-icon" />
                {tech.name}
              </li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    </motion.li>
  );
}
