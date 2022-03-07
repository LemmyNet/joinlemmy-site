import markdown_it from "markdown-it";

let DOCS_LANGUAGES = ["en", "es", "fr"];

export function getDocsLanguage(lang: string): string {
  return DOCS_LANGUAGES.includes(lang) ? lang : "en";
}

let SHORTNUM_SI_FORMAT = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  //@ts-ignore
  notation: "compact",
  compactDisplay: "short",
});

export function numToSI(value: any) {
  return SHORTNUM_SI_FORMAT.format(value);
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export const md = new markdown_it({
  html: true,
  linkify: true,
  typographer: true,
});

export function mdToHtml(text: string) {
  return { __html: md.render(text) };
}
