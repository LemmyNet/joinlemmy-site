export interface LinkedSponsor {
  name: string;
  link: string;
}

export interface GoldSponsor {
  name: string;
  link: string;
  avatar?: string;
}

export const GOLD_SPONSORS: GoldSponsor[] = [
  {
    name: "Erlend Sogge Heggen",
    link: "https://liberapay.com/~1776198/",
    avatar:
      "https://seccdn.libravatar.org/gravatarproxy/69fda0df8b4878fb6a18deffa972d26a?s=160&default=404",
  },
  {
    name: "Justen Burdette",
    link: "https://liberapay.com/~1825274/",
    avatar:
      "https://seccdn.libravatar.org/avatar/1939404ede3cf8d4ccd41e1f78faa104?s=160&d=404",
  },
  {
    name: "#spacehost",
    link: "https://www.patreon.com/user?u=98115693",
  },
  {
    name: "Numair Faraz",
    link: "https://www.patreon.com/user?u=7214767",
  },
];

export const LATINUM_SPONSORS: GoldSponsor[] = [
  {
    name: "NLnet",
    link: "https://nlnet.nl",
    avatar: "https://nlnet.nl/image/logo_nlnet.svg",
  },
];

export const SILVER_SPONSORS: LinkedSponsor[] = [
  {
    name: "Eric Betts",
    link: "https://www.patreon.com/bettse",
  },
  {
    name: "Mastodon.world Admins",
    link: "https://www.patreon.com/mastodonworld",
  },
  {
    name: "Rob Bradley",
    link: "https://www.patreon.com/user?u=35339207",
  },
  {
    name: "SaltyIceteaMaker",
    link: "https://www.patreon.com/user?u=95322653",
  },
];

export const HIGHLIGHTED_SPONSORS = [
  "lazynooblet",
  "anachronist",
  "jbonomi",
  "Adam Honse",
  "Cassandra Comar",
  "Chris Lam",
  "Dew",
  "Jams Hounshell",
  "OliverLost",
  "THE-DIESEL999",
];
export const GENERAL_SPONSORS = [
  "0ti.me",
  "Alex Wasserman",
  "Alexander Bierbaumer",
  "alexx henry",
  "Amir Zaidi",
  "Andi",
  "Andre Hoffmann",
  "Andre Vallestero",
  "Anthony",
  "Remi Rampin",
  "Cameron C",
  "Vegard",
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
  { name: "phiresky", link: "https://github.com/phiresky" },
  { name: "SleeplessOne1917", link: "https://github.com/SleeplessOne1917" },
  { name: "asonix", link: "https://github.com/asonix" },
  { name: "dullbananas", link: "https://github.com/dullbananas" },
  { name: "sunaurus", link: "https://github.com/sunaurus" },
  { name: "shilangyu", link: "https://github.com/shilangyu" },
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

interface FundingPlatform {
  supporterCount: number;
  monthlyEUR: number;
}

// Updated 2023-10-11
// Monthly counts in EUR
const liberapay: FundingPlatform = {
  supporterCount: 294,
  monthlyEUR: 358.71 * 4.35,
};

const patreon: FundingPlatform = {
  supporterCount: 473,
  monthlyEUR: 1513.57,
};

const openCollective: FundingPlatform = {
  supporterCount: 275,
  monthlyEUR: 10585 / 12,
};

const fundingPlatforms = [liberapay, patreon, openCollective];

export const TOTAL_RECURRING_MONTHLY_EUR = fundingPlatforms
  .map(f => f.monthlyEUR)
  .reduce((a, b) => a + b, 0);

export const TOTAL_SUPPORTERS = fundingPlatforms
  .map(f => f.supporterCount)
  .reduce((a, b) => a + b, 0);

// From https://www.developersalary.com
export const MEDIAN_DEV_SALARY = 50_000;
export const MEDIAN_DEV_MONTHLY_EUR = MEDIAN_DEV_SALARY / 12;

// Number of devs funded off of recurring
export const FUNDED_DEVS = TOTAL_RECURRING_MONTHLY_EUR / MEDIAN_DEV_MONTHLY_EUR;

//  Goal
export const FUNDED_DEV_GOAL = 4;

export const END_FUNDRAISER_DATE = new Date("2024-12-01");
