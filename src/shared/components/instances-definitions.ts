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

export interface Topic {
  name: string;
  icon: string;
}

export const All_TOPIC: Topic = {
  name: "all_topics",
  icon: "folder",
};

const GENERAL: Topic = {
  name: "general",
  icon: "box",
};

const TECHNOLOGY: Topic = {
  name: "technology",
  icon: "smartphone",
};

const POLITICS: Topic = {
  name: "politics",
  icon: "hammer2",
};

const RELIGION: Topic = {
  name: "religion",
  icon: "david-star",
};

const LGBTQ: Topic = {
  name: "lgbtq",
  icon: "transgender-alt",
};

const ART: Topic = {
  name: "art",
  icon: "edit",
};

const LITERATURE: Topic = {
  name: "literature",
  icon: "book",
};

const MUSIC: Topic = {
  name: "music",
  icon: "music",
};

const HOBBIES: Topic = {
  name: "hobbies",
  icon: "home",
};

const GAMING: Topic = {
  name: "gaming",
  icon: "videogame_asset",
};

const SPORTS: Topic = {
  name: "sports",
  icon: "futbol-o",
};

export const TOPICS: Topic[] = [
  All_TOPIC,
  GENERAL,
  TECHNOLOGY,
  POLITICS,
  RELIGION,
  LGBTQ,
  ART,
  LITERATURE,
  MUSIC,
  HOBBIES,
  GAMING,
  SPORTS,
];

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
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemmy.world",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemmy.fmhy.ml",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemm.ee",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "reddthat.com",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "discuss.online",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "feddit.dk",
    languages: ["da"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "feddit.de",
    languages: ["de"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["de"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "feddit.nl",
    languages: ["nl"],
    topics: [TECHNOLOGY],
  },

  {
    domain: "lemmy.pt",
    languages: ["pt"],
    topics: [TECHNOLOGY],
  },

  {
    domain: "lemmy.eus",
    languages: ["eu"],
    topics: [TECHNOLOGY],
  },

  {
    domain: "tabinezumi.net",
    languages: ["ja"],
    topics: [TECHNOLOGY],
  },

  {
    domain: "lm.korako.me",
    languages: ["ja"],
    topics: [TECHNOLOGY],
  },

  {
    domain: "feddit.it",
    languages: ["it"],
    topics: [TECHNOLOGY],
  },
];
