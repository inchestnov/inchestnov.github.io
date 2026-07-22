import { memo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { RoadmapMarqueeRow } from './RoadmapMarqueeRow';

function RoadmapSectionComponent() {
  const { content } = useLanguage();
  const { groups, title } = content.roadmap;

  return (
    <section className="roadmap-section" id="roadmap-section" aria-label={title}>
      <div className="roadmap-inner">
        <div className="roadmap-marquee-list">
          {groups.map((group, index) => (
            <RoadmapMarqueeRow key={group.name} items={group.items} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const RoadmapSection = memo(RoadmapSectionComponent);
