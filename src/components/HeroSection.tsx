import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import photo from '../assets/photo.jpeg';

function HeroSectionComponent() {
  const { content } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-section" id="hero-section">
      <motion.div
        className="hero-inner"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16, filter: 'blur(10px)' }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="hero-avatar-wrapper"
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.05 }}
        >
          <img
            className="hero-avatar"
            src={photo}
            alt={content.hero.avatarAlt}
            width={148}
            height={148}
          />
        </motion.div>
        <div className="hero-details">
          <div className="hero-heading">
            <h1 className="hero-name">{content.hero.name}</h1>
            <span className="hero-heading-separator" aria-hidden="true">·</span>
            <p className="hero-role">{content.hero.role}</p>
          </div>
          {content.about.paragraphs.map((paragraph, index) => (
            <p className="about-text" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);
