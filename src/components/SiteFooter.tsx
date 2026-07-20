import { memo, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ContactList } from './TopBar/ContactList';

function SiteFooterComponent() {
  const { content } = useLanguage();

  const copyrightText = useMemo(
    () => content.footer.copyrightText.replace('{year}', String(new Date().getFullYear())),
    [content.footer.copyrightText]
  );

  return (
    <footer className="site-footer">
      <div className="section-inner">
        <ContactList contacts={content.hero.contacts} className="footer-contact-list" />
        <p className="footer-copyright">{copyrightText}</p>
      </div>
    </footer>
  );
}

export const SiteFooter = memo(SiteFooterComponent);
