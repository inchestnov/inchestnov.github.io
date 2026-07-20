import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { Icon } from './Icon';

function SkillsSectionComponent() {
  const { content } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="skills-banner" id="skills-section" aria-label={content.skills.title}>
      <div className="skills-banner-inner">
        <div className="skills-grid">
          {content.skills.rows.map((rowItems, rowIndex) => (
            <div className="skills-row" key={rowIndex}>
              {rowItems.map((skill) => (
                <motion.div
                  className="skill-card"
                  key={skill.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <span className="skill-icon">
                    <Icon id={skill.id} />
                  </span>
                  <span className="skill-name">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SkillsSection = memo(SkillsSectionComponent);
