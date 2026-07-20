import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Language, ResumeContent } from '../types';
import { contentRu } from '../content/content.ru';
import { contentEn } from '../content/content.en';

const STORAGE_KEY = 'resumeSelectedLanguage';
const DEFAULT_LANGUAGE: Language = 'ru';

function getContentForLanguage(language: Language): ResumeContent {
  return language === 'en' ? contentEn : contentRu;
}

function getInitialLanguage(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' || stored === 'ru' ? stored : DEFAULT_LANGUAGE;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  content: ResumeContent;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const content = useMemo(() => getContentForLanguage(language), [language]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    document.title = content.meta.pageTitle;
  }, [content.meta.pageTitle]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, content }),
    [language, setLanguage, content]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
