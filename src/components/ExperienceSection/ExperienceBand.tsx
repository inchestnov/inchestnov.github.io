import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SkillItem } from '../../types';
import { Icon } from '../Icon';

interface ExperienceBandProps {
  period: string;
  duration?: string;
  company: string;
  role: string;
  summary?: string;
  points: string[];
  technologies?: SkillItem[];
  icon: string;
  /** Optional per-band accent color, applied as the `--band-accent` custom
   *  property that the gradient wash derives from. */
  accent?: string;
  isCurrent?: boolean;
  currentLabel?: string;
}

export function ExperienceBand({
  period,
  duration,
  company,
  role,
  summary,
  points,
  technologies,
  icon,
  accent,
  isCurrent,
  currentLabel
}: ExperienceBandProps) {
  const shouldReduceMotion = useReducedMotion();
  const startYear = period.match(/\d{4}/)?.[0];

  const markerClassName = isCurrent
    ? `xp-marker ${shouldReduceMotion ? 'xp-marker--current-static' : 'xp-marker--current'}`
    : 'xp-marker';

  // `--band-accent` is a valid custom property but not in CSSProperties' typed
  // keys; cast keeps strict TS happy without `any`.
  const bandStyle = accent ? ({ '--band-accent': accent } as CSSProperties) : undefined;

  return (
    <li className="xp-band" style={bandStyle}>
      <motion.div
        className="xp-band-inner"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28, filter: 'blur(6px)' }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={markerClassName} aria-hidden="true" />
        {startYear ? (
          <span className="xp-year" aria-hidden="true">
            {startYear}
          </span>
        ) : null}

        <div className="xp-identity">
          <div className="xp-heading">
            <Icon id={icon} className="xp-icon" />
            <h3 className="xp-company">{company}</h3>
            {isCurrent && currentLabel ? <span className="visually-hidden">{currentLabel}</span> : null}
          </div>
          <p className="xp-role">{role}</p>
          <p className="xp-period">
            {period}
            {duration ? <span className="xp-duration"> ({duration})</span> : null}
          </p>
        </div>

        <div className="xp-detail">
          {summary ? <p className="xp-summary">{summary}</p> : null}
          {points.length > 0 ? (
            <ul className="xp-points">
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : null}
          {technologies && technologies.length > 0 ? (
            <ul className="xp-tech-list">
              {technologies.map((tech) => (
                <li key={tech.id} className="xp-tech-tag">
                  <Icon id={tech.id} className="xp-tech-icon" />
                  {tech.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </motion.div>
    </li>
  );
}
