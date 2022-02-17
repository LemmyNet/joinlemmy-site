import i18next, { i18nTyped } from "i18next";

// Languages
import { en } from "./translations/en";
import { ru } from "./translations/ru";
import { zh } from "./translations/zh";
import { es } from "./translations/es";
import { eu } from "./translations/eu";
import { bg } from "./translations/bg";
import { nl } from "./translations/nl";
import { fi } from "./translations/fi";
import { fr } from "./translations/fr";
import { el } from "./translations/el";
import { ko } from "./translations/ko";
import { pl } from "./translations/pl";
import { ar } from "./translations/ar";
import { eo } from "./translations/eo";
import { de } from "./translations/de";
import { gl } from "./translations/gl";
import { it } from "./translations/it";
import { ja } from "./translations/ja";
import { km } from "./translations/km";
import { nb_NO } from "./translations/nb_NO";
import { zh_Hant } from "./translations/zh_Hant";
import { fa } from "./translations/fa";
import { id } from "./translations/id";
import { mnc } from "./translations/mnc";
import { sv } from "./translations/sv";
import { vi } from "./translations/vi";
import { pt } from "./translations/pt";

// https://github.com/nimbusec-oss/inferno-i18next/blob/master/tests/T.test.js#L66
const resources = {
  en,
  ru,
  zh,
  es,
  eu,
  bg,
  nl,
  fi,
  fr,
  el,
  ko,
  pl,
  ar,
  eo,
  de,
  gl,
  it,
  ja,
  km,
  nb_NO,
  zh_Hant,
  fa,
  id,
  mnc,
  sv,
  vi,
  pt,
};

const languageNames = {
  en: "English",
  ru: "Русский",
  zh: "中文",
  es: "Español",
  eu: "Euskara",
  bg: "Български",
  nl: "Nederlands",
  fi: "Suomi",
  fr: "Français",
  el: "Ελληνικά",
  ko: "한국어",
  pl: "Polski",
  ar: "العربية",
  eo: "Esperanto",
  de: "Deutsch",
  gl: "Galego",
  it: "Italiano",
  ja: "日本語",
  km: "ភាសាខ្មែរ",
  nb_NO: "Norsk (Bokmål)",
  zh_Hant: "文言",
  fa: "فارسی",
  id: "Bahasa Indonesia",
  mnc: "ᠮᠠᠨᠵᡠ ᡤᡳᠰᡠᠨ",
  sv: "Svenska",
  vi: "Tiếng Việt",
  pt: "Português",
};

function format(value: any, format: any): any {
  return format === "uppercase" ? value.toUpperCase() : value;
}

i18next.init({
  debug: false,
  // load: 'languageOnly',
  // initImmediate: false,
  fallbackLng: "en",
  resources,
  interpolation: { format },
});

export const i18n = i18next as i18nTyped;

export { resources };

export function getLanguageName(key: string): string {
  return languageNames[key];
}

// https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca
export function getLanguageFromCookie(cookies?: string): string | null {
  if (cookies == null) {
    return null;
  }

  const key = "lang=";
  return (
    cookies
      .split(";")
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, key.length) === key)
      .map(cookie => cookie.substring(key.length))[0] || null
  );
}
