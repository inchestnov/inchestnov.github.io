import { memo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { RoadmapNode } from './RoadmapNode';

function RoadmapSectionComponent() {
  const { content } = useLanguage();
  const { groups, title } = content.roadmap;

  return (
    <section className="roadmap-section" id="roadmap-section" aria-label={title}>
      <div className="roadmap-inner">
        <div className="roadmap">
          {groups.map((group) => (
            <div className="roadmap-group" key={group.name}>
              <div className="roadmap-group-marker" aria-hidden="true" />
              <h3 className="roadmap-group-title">{group.name}</h3>
              <ul className="roadmap-nodes">
                {group.items.map((item) => (
                  <RoadmapNode key={item.id} id={item.id} name={item.name} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const RoadmapSection = memo(RoadmapSectionComponent);
