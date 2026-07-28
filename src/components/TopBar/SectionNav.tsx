import { memo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useActiveSection } from '../../hooks/useActiveSection';

const SECTION_IDS = ['hero-section', 'skills-section', 'experience-section', 'roadmap-section'] as const;

function SectionNavComponent() {
  const { content } = useLanguage();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav className="section-nav" aria-label={content.sectionNav.ariaLabel}>
      {content.sectionNav.items.map((item) => {
        const isActive = item.href === `#${activeId}`;
        return (
          <a
            key={item.href}
            href={item.href}
            className={isActive ? 'section-nav-link section-nav-link--active' : 'section-nav-link'}
            aria-current={isActive ? 'true' : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export const SectionNav = memo(SectionNavComponent);
