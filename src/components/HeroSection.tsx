import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import avatarPlaceholder from '../assets/avatar-placeholder.svg';

function HeroSectionComponent() {
  const { content } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-section" id="hero-section">
      <motion.div
        className="hero-inner"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="hero-avatar-wrapper">
          <img
            className="hero-avatar"
            src={avatarPlaceholder}
            alt={content.hero.avatarAlt}
            width={128}
            height={128}
          />
        </div>
        <div className="hero-details">
          <div className="hero-heading">
            <h1 className="hero-name">{content.hero.name}</h1>
            <span className="hero-heading-separator" aria-hidden="true">·</span>
            <p className="hero-role">{content.hero.role}</p>
          </div>
          <p className="about-text">{content.about.text}</p>
        </div>
      </motion.div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);
