import { memo, useCallback } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

function LanguageSwitcherComponent() {
  const { language, setLanguage, content } = useLanguage();

  const handleToggle = useCallback(() => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  }, [language, setLanguage]);

  return (
    <button
      type="button"
      className="language-switcher"
      aria-label={content.languageSwitcher.ariaLabel}
      onClick={handleToggle}
    >
      <span className={`language-switcher-option${language === 'ru' ? ' language-switcher-option--active' : ''}`}>RU</span>
      <span className="language-switcher-divider" aria-hidden="true">
        /
      </span>
      <span className={`language-switcher-option${language === 'en' ? ' language-switcher-option--active' : ''}`}>EN</span>
    </button>
  );
}

export const LanguageSwitcher = memo(LanguageSwitcherComponent);
