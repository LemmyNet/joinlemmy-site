export interface LinkedSponsor {
  name: string;
  link: string;
}

export interface GoldSponsor {
  name: string;
  link: string;
  avatar: string;
}

export const GOLD_SPONSORS: GoldSponsor[] = [];

export const LATINUM_SPONSORS: GoldSponsor[] = [
  {
    name: "NLnet",
    link: "https://nlnet.nl",
    avatar: "https://nlnet.nl/image/logo_nlnet.svg",
  },
];

export const SILVER_SPONSORS: LinkedSponsor[] = [];

export const HIGHLIGHTED_SPONSORS = ["DQW", "John Knapp"];
export const GENERAL_SPONSORS = [
  "Anthony",
  "Remi Rampin",
  "Cameron C",
  "Vegard",
  "0ti.me",
  "Brendan",
  "mexicanhalloween .",
  "Arthur Nieuwland",
  "Forrest Weghorst",
  "Luke Black",
  "Brandon Abbott",
  "Eon Gattignolo",
];

export interface Coder {
  name: string;
  link?: string;
}

export const CODERS: Coder[] = [
  { name: "dessalines", link: "https://mastodon.social/@dessalines" },
  { name: "Nutomic", link: "https://lemmy.ml/u/nutomic" },
  { name: "asonix", link: "https://github.com/asonix" },
  { name: "krawieck", link: "https://github.com/krawieck" },
  { name: "shilangyu", link: "https://github.com/shilangyu" },
  { name: "uuttff8", link: "https://github.com/uuttff8" },
  { name: "eiknat", link: "https://github.com/eiknat" },
  { name: "ernestwisniewski", link: "https://github.com/ernestwisniewski" },
  { name: "zacanger", link: "https://github.com/zacanger" },
  { name: "iav", link: "https://github.com/iav" },
];

export interface Translation {
  lang: string;
  country?: string;
  translators: Translator[];
}

export interface Translator {
  name: string;
  link?: string;
}

export interface Crypto {
  name: string;
  address: string;
}

export const CRYPTOS: Crypto[] = [
  {
    name: "bitcoin",
    address: "1Hefs7miXS5ff5Ck5xvmjKjXf5242KzRtK",
  },
  {
    name: "ethereum",
    address: "0x400c96c96acbC6E7B3B43B1dc1BB446540a88A01",
  },
  {
    name: "monero",
    address:
      "41taVyY6e1xApqKyMVDRVxJ76sPkfZhALLTjRvVKpaAh2pBd4wv9RgYj1tSPrx8wc6iE1uWUfjtQdTmTy2FGMeChGVKPQuV",
  },
  {
    name: "cardano",
    address:
      "addr1q858t89l2ym6xmrugjs0af9cslfwvnvsh2xxp6x4dcez7pf5tushkp4wl7zxfhm2djp6gq60dk4cmc7seaza5p3slx0sakjutm",
  },
];
