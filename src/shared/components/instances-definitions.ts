export interface InstanceHelper {
  name: string;
  link: string;
}

export const INSTANCE_HELPERS: InstanceHelper[] = [
  {
    name: "Lemmy Community Explorer",
    link: "https://lemmyverse.net/communities",
  },
  {
    name: "lemmy.fediverse.observer",
    link: "https://lemmy.fediverse.observer/list",
  },
  {
    name: "Awesome-Lemmy-Instances on GitHub",
    link: "https://github.com/maltfield/awesome-lemmy-instances",
  },
  {
    name: "The-Federation.info Lemmy Instances Page",
    link: "https://the-federation.info/platform/73",
  },
  {
    name: "Feddit's Lemmymap",
    link: "https://lemmymap.feddit.de/",
  },
  {
    name: "Feddit's Lemmy Community Browser",
    link: "https://browse.feddit.de/",
  },
];

// TODO add i18n strings, Icons
export enum InstanceCategory {
  Tech,
  Sports,
}

export interface RecommendedInstance {
  domain: string;
  languages: string[];
  categories: InstanceCategory[];
}

// TODO fix these up
export const RECOMMENDED_INSTANCES: RecommendedInstance[] = [
  {
    domain: "lemmy.fmhy.ml",
    languages: ["en"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["en"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "lemm.ee",
    languages: ["en"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "reddthat.com",
    languages: ["en"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "discuss.online",
    languages: ["en"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "feddit.dk",
    languages: ["da"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "feddit.de",
    languages: ["de"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "discuss.tchncs.de",
    languages: ["de"],
    categories: [InstanceCategory.Tech],
  },
  {
    domain: "feddit.nl",
    languages: ["nl"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "lemmy.pt",
    languages: ["pt", "pt-PT", "pt-BR"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "lemmy.pt",
    languages: ["pt", "pt-PT", "pt-BR"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "lemmy.eus",
    languages: ["eu"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "tabinezumi.net",
    languages: ["ja"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "lm.korako.me",
    languages: ["ja"],
    categories: [InstanceCategory.Tech],
  },

  {
    domain: "feddit.it",
    languages: ["it"],
    categories: [InstanceCategory.Tech],
  },
];
