import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import type { HeroContacts } from '../../types';

interface ContactListProps {
  contacts: HeroContacts;
  className: string;
}

function ContactListComponent({ contacts, className }: ContactListProps) {
  const shouldReduceMotion = useReducedMotion();
  const contactKeys = Object.keys(contacts) as (keyof HeroContacts)[];

  return (
    <ul className={className}>
      {contactKeys.map((contactKey) => {
        const contact = contacts[contactKey];
        const isExternal = contact.href.indexOf('http') === 0;
        return (
          <li className="contact-item" key={contactKey}>
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
          </li>
        );
      })}
    </ul>
  );
}

export const ContactList = memo(ContactListComponent);
