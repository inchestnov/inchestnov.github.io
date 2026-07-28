import { memo, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { useLanguage } from '../../hooks/useLanguage';
import type { ContactInfo, HeroContacts } from '../../types';

interface ContactListProps {
  contacts: HeroContacts;
  className: string;
}

function ContactListComponent({ contacts, className }: ContactListProps) {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useLanguage();
  const contactKeys = Object.keys(contacts) as (keyof HeroContacts)[];
  const [copiedKey, setCopiedKey] = useState<keyof HeroContacts | null>(null);

  const handleEmailClick = useCallback((contact: ContactInfo) => {
    navigator.clipboard.writeText(contact.value).then(() => {
      setCopiedKey('email');
      window.setTimeout(() => setCopiedKey(null), 1600);
    });
  }, []);

  return (
    <ul className={className}>
      {contactKeys.map((contactKey) => {
        const contact = contacts[contactKey];
        const isEmail = contactKey === 'email';
        const isExternal = contact.href.indexOf('http') === 0;
        const copiedToast =
          isEmail && copiedKey === 'email' ? (
            <span
              className={shouldReduceMotion ? 'contact-copied-toast' : 'contact-copied-toast contact-copied-toast--animated'}
              role="status"
            >
              {content.contactList.emailCopiedLabel}
            </span>
          ) : null;

        return (
          <li className="contact-item" key={contactKey}>
            {isEmail ? (
              <motion.button
                type="button"
                className="contact-link"
                aria-label={contact.label}
                onClick={() => handleEmailClick(contact)}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <span className="contact-icon">
                  <Icon id={contactKey} />
                </span>
                <span className="contact-value">{contact.value}</span>
                {copiedToast}
              </motion.button>
            ) : (
              <motion.a
                className="contact-link"
                href={contact.href}
                aria-label={contact.label}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <span className="contact-icon">
                  <Icon id={contactKey} />
                </span>
                <span className="contact-value">{contact.value}</span>
              </motion.a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export const ContactList = memo(ContactListComponent);
