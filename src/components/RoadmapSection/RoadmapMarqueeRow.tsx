import { Icon } from '../Icon';
import { iconMarkup } from '../../icons/iconMarkup';
import type { RoadmapItem } from '../../types';

interface RoadmapMarqueeRowProps {
  items: RoadmapItem[];
  reverse: boolean;
}

// Repeats a short group's items enough times that a single block is always
// comfortably wider than the row's container (max-width 1120px) — without
// this, the -50% seamless-loop trick exposes blank space for groups with
// only 3-4 items, since one un-repeated copy of them isn't wide enough to
// fill the row before the loop resets.
const MIN_ITEMS_PER_BLOCK = 16;

function buildBlock(items: RoadmapItem[]): RoadmapItem[] {
  const repeatCount = Math.max(3, Math.ceil(MIN_ITEMS_PER_BLOCK / items.length));
  return Array.from({ length: repeatCount }, () => items).flat();
}

function MarqueeChips({ items, ariaHidden }: { items: RoadmapItem[]; ariaHidden?: boolean }) {
  return (
    <div className="roadmap-marquee-group" aria-hidden={ariaHidden}>
      {items.map((item, index) => (
        <span className="roadmap-marquee-item" key={`${item.id}-${index}`}>
          <span className="roadmap-marquee-chip">
            {item.id in iconMarkup && (
              <span className="roadmap-marquee-chip-icon">
                <Icon id={item.id} />
              </span>
            )}
            <span className="roadmap-marquee-chip-name">{item.name}</span>
          </span>
          <span className="roadmap-marquee-separator">•</span>
        </span>
      ))}
    </div>
  );
}

export function RoadmapMarqueeRow({ items, reverse }: RoadmapMarqueeRowProps) {
  const block = buildBlock(items);
  const duration = `${block.length * 4}s`;

  return (
    <div className={reverse ? 'roadmap-marquee-row roadmap-marquee-row--reverse' : 'roadmap-marquee-row'}>
      <div className="roadmap-marquee-track" style={{ animationDuration: duration }}>
        <MarqueeChips items={block} />
        <MarqueeChips items={block} ariaHidden />
      </div>
    </div>
  );
}
