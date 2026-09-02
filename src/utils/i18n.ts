import enUS from '../content/i18n/en-US.json';

export type TranslationKey = keyof typeof enUS;

/**
 * Type-safe translation helper for native.cloud ontology and site strings.
 * Falls back to en-US dictionary when current locale string is unavailable.
 */
export function useI18n(_lang?: string) {
  // Currently default dictionary is en-US
  const dict: Record<string, string> = enUS;

  return {
    t: (key: string, fallback?: string): string => {
      if (key in dict) {
        return dict[key];
      }
      return fallback !== undefined ? fallback : key;
    },
    format: (key: string, params: Record<string, string | number>): string => {
      let str = dict[key] || key;
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`{{\\s*\\.?${k}\\s*}}`, 'g'), String(v));
      }
      return str;
    },
  };
}
