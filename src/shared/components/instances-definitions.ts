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
export interface Topic {
  name: string;
  icon: string;
}

export const All_TOPIC: Topic = {
  name: "all_topics",
  icon: "TBD",
};

export const SPORTS: Topic = {
  name: "sports",
  icon: "TBD",
};

export const TECH: Topic = {
  name: "tech",
  icon: "TBD",
};

export const TOPICS: Topic[] = [All_TOPIC, TECH, SPORTS];

export interface RecommendedInstance {
  domain: string;
  languages: string[];
  topics: Topic[];
}

// TODO fix these up
export const RECOMMENDED_INSTANCES: RecommendedInstance[] = [
  {
    domain: "lemmy.ml",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "lemmy.world",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "lemmy.fmhy.ml",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "lemm.ee",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "reddthat.com",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "discuss.online",
    languages: ["en"],
    topics: [TECH],
  },
  {
    domain: "feddit.dk",
    languages: ["da"],
    topics: [TECH],
  },
  {
    domain: "feddit.de",
    languages: ["de"],
    topics: [TECH],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["de"],
    topics: [TECH],
  },
  {
    domain: "feddit.nl",
    languages: ["nl"],
    topics: [TECH],
  },

  {
    domain: "lemmy.pt",
    languages: ["pt"],
    topics: [TECH],
  },

  {
    domain: "lemmy.eus",
    languages: ["eu"],
    topics: [TECH],
  },

  {
    domain: "tabinezumi.net",
    languages: ["ja"],
    topics: [TECH],
  },

  {
    domain: "lm.korako.me",
    languages: ["ja"],
    topics: [TECH],
  },

  {
    domain: "feddit.it",
    languages: ["it"],
    topics: [TECH],
  },
];
