import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { Icon } from '../Icon';

/**
 * Education as a distinct closing "coda" — deliberately off the work-experience
 * timeline: a short section-break rule, an explicit "Education" label, then a
 * centered text block on the page background (no card/frame). Uses the site's
 * display face + mono metadata so it still reads as one system.
 */
function EducationCardComponent() {
  const { content } = useLanguage();
  const { education } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="education-section" aria-label={education.dividerLabel}>
      <motion.div
        className="education-content"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(6px)' }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="education-label">{education.dividerLabel}</p>
        <span className="education-emblem">
          <Icon id={education.icon} />
        </span>
        <h3 className="education-degree">{education.degree}</h3>
        <p className="education-institution">{education.institution}</p>
        <p className="education-period">{education.period}</p>
      </motion.div>
    </section>
  );
}

export const EducationCard = memo(EducationCardComponent);
