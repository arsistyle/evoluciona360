import es from './es.json';
import en from './en.json';

export const languages = {
  es: 'Español',
  en: 'English'
} as const;

export type Language = keyof typeof languages;

const translations = { es, en };

export function getLangFromUrl(url: URL): Language {
  const pathParts = url.pathname.split('/');
  const lang = pathParts.find(p => p === 'es' || p === 'en');
  if (lang && lang in translations) return lang as Language;
  return 'es';
}

export function useTranslations(lang: Language) {
  return translations[lang];
}

export function getTranslationFile(lang: Language) {
  return translations[lang];
}