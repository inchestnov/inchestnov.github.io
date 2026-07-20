import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { iconMarkup } from '../../icons/iconMarkup';

interface RoadmapNodeProps {
  id: string;
  name: string;
}

export function RoadmapNode({ id, name }: RoadmapNodeProps) {
  const hasIcon = id in iconMarkup;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      className="roadmap-node"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {hasIcon && (
        <span className="roadmap-node-icon">
          <Icon id={id} />
        </span>
      )}
      <span className="roadmap-node-name">{name}</span>
    </motion.li>
  );
}
