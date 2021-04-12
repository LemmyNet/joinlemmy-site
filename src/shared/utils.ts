let DOCS_LANGUAGES = ["en", "es", "fr"];

export function getDocsLanguage(lang: string): string {
  return DOCS_LANGUAGES.includes(lang) ? lang : "en";
}
