import i18next, { InitOptions, Resource } from "i18next";

// Languages
import { bg } from "./translations/bg";
import { da } from "./translations/da";
import { de } from "./translations/de";
import { el } from "./translations/el";
import { en } from "./translations/en";
import { eo } from "./translations/eo";
import { es } from "./translations/es";
import { eu } from "./translations/eu";
import { fa } from "./translations/fa";
import { fi } from "./translations/fi";
import { fr } from "./translations/fr";
import { gl } from "./translations/gl";
import { id } from "./translations/id";
import { it } from "./translations/it";
import { ja } from "./translations/ja";
import { ko } from "./translations/ko";
import { nb_NO } from "./translations/nb_NO";
import { nn } from "./translations/nn";
import { nl } from "./translations/nl";
import { pl } from "./translations/pl";
import { pt } from "./translations/pt";
import { pt_BR } from "./translations/pt_BR";
import { ru } from "./translations/ru";
import { zh } from "./translations/zh";

export const LANGUAGES = [
  { resource: bg, code: "bg", name: "Български" },
  { resource: da, code: "da", name: "Dansk" },
  { resource: de, code: "de", name: "Deutsch" },
  { resource: el, code: "el", name: "Ελληνικά" },
  { resource: en, code: "en", name: "English" },
  { resource: eo, code: "eo", name: "Esperanto" },
  { resource: es, code: "es", name: "Español" },
  { resource: eu, code: "eu", name: "Euskara" },
  { resource: fa, code: "fa", name: "فارسی" },
  { resource: fi, code: "fi", name: "Suomi" },
  { resource: fr, code: "fr", name: "Français" },
  { resource: gl, code: "gl", name: "Galego" },
  { resource: id, code: "id", name: "Bahasa Indonesia" },
  { resource: it, code: "it", name: "Italiano" },
  { resource: ja, code: "ja", name: "日本語" },
  { resource: ko, code: "ko", name: "한국어" },
  { resource: nb_NO, code: "nb-NO", name: "Norsk (bokmål)" },
  { resource: nn, code: "nn", name: "nynorsk" },
  { resource: nl, code: "nl", name: "Nederlands" },
  { resource: pl, code: "pl", name: "Polski" },
  { resource: pt, code: "pt", name: "Português" },
  { resource: pt_BR, code: "pt-BR", name: "Português (Brasil)" },
  { resource: ru, code: "ru", name: "Русский" },
  { resource: zh, code: "zh", name: "中文" },
];

const resources: Resource = {};
LANGUAGES.forEach(l => (resources[l.code] = l.resource));

function format(value: string, format: string): string {
  return format === "uppercase" ? value.toUpperCase() : value;
}

export let i18n = i18next;

export { resources };

export async function initI18n() {
  const options: InitOptions = {
    debug: false,
    // load: 'languageOnly',
    // initImmediate: false,
    fallbackLng: "en",
    resources,
    interpolation: { format },
  };

  const i18nI = i18next.createInstance(options);
  await i18nI.init();
  i18n = i18nI;

  return i18nI;
}

// https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca
export function getLanguageFromCookie(cookies?: string): string | undefined {
  const key = "lang=";
  return cookies
    ?.split(";")
    .map(c => c.trim())
    .filter(cookie => cookie.substring(0, key.length) === key)
    .map(cookie => cookie.substring(key.length))[0];
}
