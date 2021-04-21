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
};

function format(value: any, format: any): any {
  return format === "uppercase" ? value.toUpperCase() : value;
}

i18next.init({
  debug: false,
  // load: 'languageOnly',
  // initImmediate: false,
  lng: "en", // This is changed later
  fallbackLng: "en",
  resources,
  interpolation: { format },
});

export const i18n = i18next as i18nTyped;

export { resources };
