import i18next, { i18nTyped } from "i18next";

// Languages
import { en } from "./translations/en";
import { ru } from "./translations/ru";
import { zh } from "./translations/zh";
import { es } from "./translations/es";

// https://github.com/nimbusec-oss/inferno-i18next/blob/master/tests/T.test.js#L66
const resources = {
  en,
  ru,
  zh,
  es,
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
