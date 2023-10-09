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
// DO this as an interface and const list

export interface Category {
  name: string;
  icon: string;
}

export const All_CATEGORY: Category = {
  name: "all",
  icon: "TBD",
};

export const SPORTS: Category = {
  name: "sports",
  icon: "TBD",
};

export const TECH: Category = {
  name: "tech",
  icon: "TBD",
};

export const CATEGORIES: Category[] = [All_CATEGORY, TECH, SPORTS];

export interface RecommendedInstance {
  domain: string;
  languages: string[];
  categories: Category[];
}

// TODO fix these up
export const RECOMMENDED_INSTANCES: RecommendedInstance[] = [
  {
    domain: "lemmy.ml",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "lemmy.world",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "lemmy.fmhy.ml",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "lemm.ee",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "reddthat.com",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "discuss.online",
    languages: ["en"],
    categories: [TECH],
  },
  {
    domain: "feddit.dk",
    languages: ["da"],
    categories: [TECH],
  },
  {
    domain: "feddit.de",
    languages: ["de"],
    categories: [TECH],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["de"],
    categories: [TECH],
  },
  {
    domain: "feddit.nl",
    languages: ["nl"],
    categories: [TECH],
  },

  {
    domain: "lemmy.pt",
    languages: ["pt"],
    categories: [TECH],
  },

  {
    domain: "lemmy.eus",
    languages: ["eu"],
    categories: [TECH],
  },

  {
    domain: "tabinezumi.net",
    languages: ["ja"],
    categories: [TECH],
  },

  {
    domain: "lm.korako.me",
    languages: ["ja"],
    categories: [TECH],
  },

  {
    domain: "feddit.it",
    languages: ["it"],
    categories: [TECH],
  },
];
