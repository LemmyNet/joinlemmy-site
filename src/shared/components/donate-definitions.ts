import { donation_stats } from "../donation_stats";

export interface Coder {
  name: string;
  link?: string;
}

export interface LinkedSponsor {
  name: string;
  link: string;
}

export interface GoldSponsor {
  name: string;
  link: string;
  avatar?: string;
}

export interface Translation {
  lang: string;
  country?: string;
  translators: Translator[];
}

export interface Translator {
  name: string;
  link?: string;
}

interface FundingPlatform {
  supporterCount: number;
  monthlyEUR: number;
}

export const CODERS: Coder[] = [
  { name: "dessalines", link: "https://github.com/dessalines" },
  { name: "Nutomic", link: "https://github.com/nutomic" },
  { name: "phiresky", link: "https://github.com/phiresky" },
  { name: "SleeplessOne1917", link: "https://github.com/SleeplessOne1917" },
  { name: "asonix", link: "https://github.com/asonix" },
  { name: "MV-GH", link: "https://github.com/MV-GH" },
  { name: "dullbananas", link: "https://github.com/dullbananas" },
  { name: "sunaurus", link: "https://github.com/sunaurus" },
  { name: "shilangyu", link: "https://github.com/shilangyu" },
  { name: "eiknat", link: "https://github.com/eiknat" },
  { name: "ernestwisniewski", link: "https://github.com/ernestwisniewski" },
  { name: "zacanger", link: "https://github.com/zacanger" },
  { name: "iav", link: "https://github.com/iav" },
];

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
    avatar: "/static/assets/images/logo_nlnet.svg",
  },
  {
    name: "Copie Publique",
    link: "https://copiepublique.fr/",
    avatar: "/static/assets/images/logo_copiepublique.svg",
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

// Don't do these until its automated
export const GENERAL_SPONSORS = [];

// Monthly counts in EUR
const liberapay: FundingPlatform = {
  supporterCount: donation_stats[0].patrons,
  monthlyEUR: donation_stats[0].amount,
};

const openCollective: FundingPlatform = {
  supporterCount: donation_stats[1].patrons,
  monthlyEUR: donation_stats[1].amount,
};

const patreon: FundingPlatform = {
  supporterCount: donation_stats[2].patrons,
  monthlyEUR: donation_stats[2].amount,
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
export const FUNDED_DEV_GOAL = 3;

// End fundraiser date
export const END_FUNDRAISER_DATE = new Date("2024-12-01");
