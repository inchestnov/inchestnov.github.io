import { memo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../types';

interface LanguageButtonProps {
  lang: Language;
  label: string;
  active: boolean;
  onSelect: (lang: Language) => void;
}

const LanguageButton = memo(function LanguageButton({ lang, label, active, onSelect }: LanguageButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      className="language-button"
      data-lang={lang}
      aria-pressed={active}
      onClick={() => onSelect(lang)}
    >
      {active && (
        <motion.span
          className="language-button-pill"
          layoutId={shouldReduceMotion ? undefined : 'language-active-pill'}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <span className="language-button-label">{label}</span>
    </button>
  );
});

function LanguageSwitcherComponent() {
  const { language, setLanguage, content } = useLanguage();

  const handleSelect = useCallback(
    (lang: Language) => {
      setLanguage(lang);
    },
    [setLanguage]
  );

  return (
    <div className="language-switcher" role="group" aria-label={content.languageSwitcher.ariaLabel}>
      <LanguageButton lang="ru" label="RU" active={language === 'ru'} onSelect={handleSelect} />
      <LanguageButton lang="en" label="EN" active={language === 'en'} onSelect={handleSelect} />
    </div>
  );
}

export const LanguageSwitcher = memo(LanguageSwitcherComponent);
