import { memo } from 'react';
import { ContactList } from './ContactList';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../../hooks/useLanguage';

function TopBarComponent() {
  const { content } = useLanguage();

  return (
    <div className="page-topbar">
      <div className="section-inner topbar-inner">
        <ContactList contacts={content.hero.contacts} className="contact-list" />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export const TopBar = memo(TopBarComponent);
