import { memo } from 'react';
import { ContactList } from './ContactList';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PdfExportButton } from './PdfExportButton';
import { SectionNav } from './SectionNav';
import { useLanguage } from '../../hooks/useLanguage';

function TopBarComponent() {
  const { content } = useLanguage();

  return (
    <div className="page-topbar">
      <div className="section-inner topbar-inner">
        <SectionNav />
        <div className="topbar-actions">
          <PdfExportButton />
          <LanguageSwitcher />
          <ContactList contacts={content.hero.contacts} className="contact-list" />
        </div>
      </div>
    </div>
  );
}

export const TopBar = memo(TopBarComponent);
