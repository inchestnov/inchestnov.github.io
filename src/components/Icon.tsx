import { memo } from 'react';
import { iconMarkup } from '../icons/iconMarkup';

interface IconProps {
  /** Icon lookup key. May not match any entry (e.g. a roadmap item without a
   *  brand icon yet) — renders nothing in that case, matching the old
   *  name-only fallback. */
  id: string;
  className?: string;
}

function IconComponent({ id, className }: IconProps) {
  const markup = (iconMarkup as Record<string, string>)[id];
  if (!markup) return null;

  return (
    <span
      className={className}
      aria-hidden="true"
      // Markup is static, defined in our own source (src/icons/iconMarkup.ts),
      // never user/network input — the safe case for dangerouslySetInnerHTML.
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export const Icon = memo(IconComponent);
