import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A thin accent line pinned to the very top edge of the viewport whose
 * horizontal scale tracks reading progress down the page. Purely decorative
 * (aria-hidden); the spring smooths the raw scroll value so it eases rather
 * than snaps. Hidden entirely under prefers-reduced-motion.
 */
export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  if (shouldReduceMotion) return null;

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
