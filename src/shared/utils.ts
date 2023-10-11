import markdown_it from "markdown-it";

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

export function getQueryParams<T extends Record<string, any>>(processors: {
  [K in keyof T]: (param: string) => T[K];
}): T {
  if (isBrowser()) {
    const searchParams = new URLSearchParams(window.location.search);

    return Array.from(Object.entries(processors)).reduce(
      (acc, [key, process]) => ({
        ...acc,
        [key]: process(searchParams.get(key)),
      }),
      {} as T,
    );
  }

  return {} as T;
}
