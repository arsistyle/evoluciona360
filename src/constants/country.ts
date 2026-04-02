export const DEFAULT_LOCALE = 'es';

export const LOCALES = {
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇨🇱',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
} as const;

export type LocaleCode = keyof typeof LOCALES;

export interface Country {
  code: string;
  name: string;
  locale: LocaleCode;
  hostname: string;
}

export const COUNTRIES: Country[] = [
  {
    code: 'cl',
    name: 'Chile',
    locale: 'es',
    hostname: 'evoluciona360.cl',
  },
  {
    code: 'us',
    name: 'United States',
    locale: 'en',
    hostname: 'evoluciona360.com',
  },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

export function getCountryByLocale(locale: LocaleCode): Country {
  return COUNTRIES.find((c) => c.locale === locale) || DEFAULT_COUNTRY;
}

export function getLocaleFromUrl(url: URL): LocaleCode {
  const pathLocale = url.pathname.split('/')[1];
  if (pathLocale && pathLocale in LOCALES) {
    return pathLocale as LocaleCode;
  }
  return DEFAULT_LOCALE;
}

export function getCountryFromRequest(request: Request): {
  country: Country;
  locale: LocaleCode;
  url: URL;
} {
  const url = new URL(request.url);
  const locale = getLocaleFromUrl(url);
  const country = getCountryByLocale(locale);

  return {
    country,
    locale,
    url,
  };
}