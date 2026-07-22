import { memo } from 'react';
import { ContactList } from './ContactList';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PdfExportButton } from './PdfExportButton';
import { useLanguage } from '../../hooks/useLanguage';

function TopBarComponent() {
  const { content } = useLanguage();

  return (
    <div className="page-topbar">
      <div className="section-inner topbar-inner">
        <ContactList contacts={content.hero.contacts} className="contact-list" />
        <div className="topbar-actions">
          <PdfExportButton />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export const TopBar = memo(TopBarComponent);
