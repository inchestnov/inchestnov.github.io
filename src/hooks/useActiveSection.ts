import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids currently sits in a thin band near
 * the vertical center of the viewport (a standard scrollspy technique) —
 * used to highlight the matching link in SectionNav as the page scrolls.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const firstId = sectionIds[0] ?? '';
  const [activeId, setActiveId] = useState(firstId);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = visible[0];
        if (topEntry) setActiveId(topEntry.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
