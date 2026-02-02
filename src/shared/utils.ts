import { default as MarkdownIt } from "markdown-it";
import markdown_it_container from "markdown-it-container";
import markdown_it_bidi from "markdown-it-bidi";
import markdown_it_footnote from "markdown-it-footnote";
import markdown_it_ruby from "markdown-it-ruby";
import markdown_it_sub from "markdown-it-sub";
import markdown_it_sup from "markdown-it-sup";

const SHORTNUM_SI_FORMAT = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
  compactDisplay: "short",
});

export function numToSI(value: any) {
  return SHORTNUM_SI_FORMAT.format(value);
}

export function isBrowser() {
  return typeof window !== "undefined";
}

const spoilerConfig = {
  validate: (params: string) => {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },

  render: (tokens: any, idx: any) => {
    const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      const summary = mdToHtmlInline(md.utils.escapeHtml(m[1])).__html;
      return `<details><summary> ${summary} </summary>\n`;
    } else {
      // closing tag
      return "</details>\n";
    }
  },
};

// Zero disables all rules.
// Only explicitly allow a limited set of rules safe for use in post titles.
export const mdLimited: MarkdownIt = new MarkdownIt("zero").enable([
  "emphasis",
  "backticks",
  "strikethrough",
]);

export function mdToHtmlInline(text: string) {
  return { __html: mdLimited.renderInline(text) };
}

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdown_it_sub)
  .use(markdown_it_sup)
  .use(markdown_it_footnote)
  .use(markdown_it_container, "spoiler", spoilerConfig)
  .use(markdown_it_ruby)
  .use(markdown_it_bidi);

export function mdToHtml(text: string) {
  return { __html: md.render(text) };
}

export function getQueryParams(): URLSearchParams {
  if (isBrowser()) {
    return new URLSearchParams(window.location.search);
  } else {
    return new URLSearchParams();
  }
}

export const NUMBER_FORMAT = new Intl.NumberFormat("en", {
  maximumFractionDigits: 0,
});

export function monthsBetween(startDate: Date, endDate: Date) {
  // The number of milliseconds in one day
  const oneMonth = (1000 * 60 * 60 * 24 * 365) / 12;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(startDate.getTime() - endDate.getTime());

  // Convert back to days and return
  return Math.round(differenceMs / oneMonth);
}

export function sortRandom<T>(list: T[]): T[] {
  return list
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function uniqueEntries<T>(list: T[]): T[] {
  return [...new Set(list)];
}

export type QueryParams<T extends Record<string, any>> = {
  [key in keyof T]?: string;
};

export function getQueryString<T extends Record<string, string | undefined>>(
  obj: T,
) {
  const searchParams = new URLSearchParams();
  Object.entries(obj)
    .filter(
      ([, val]) =>
        val !== undefined &&
        val !== null &&
        !val.includes("all") &&
        val !== "random",
    )
    .forEach(([key, val]) => searchParams.set(key, val ?? ""));
  const params = searchParams.toString();
  if (params) {
    return "?" + params;
  }
  return "";
}
