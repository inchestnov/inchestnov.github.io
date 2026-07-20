import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';

interface TimelineItemProps {
  period: string;
  company: string;
  role: string;
  points: string[];
  icon: string;
}

export function TimelineItem({ period, company, role, points, icon }: TimelineItemProps) {
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
        <p className="timeline-period">{period}</p>
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
      </motion.div>
    </motion.li>
  );
}
