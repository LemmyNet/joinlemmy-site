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
    name: "Lemmy Fediverse Observer",
    link: "https://lemmy.fediverse.observer/list",
  },
  {
    name: "Awesome-Lemmy-Instances on GitHub",
    link: "https://github.com/maltfield/awesome-lemmy-instances",
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

export const ALL_TOPIC: Topic = {
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
  ALL_TOPIC,
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

export const RECOMMENDED_INSTANCES: RecommendedInstance[] = [
  {
    domain: "lemmy.ml",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY, POLITICS],
  },
  {
    domain: "toast.ooo",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY, GAMING],
  },
  {
    domain: "lemmy.today",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "slrpnk.net",
    languages: ["en"],
    topics: [TECHNOLOGY, POLITICS],
  },
  {
    domain: "lemmy.zip",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY, GAMING],
  },
  {
    domain: "lemmy.nz",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "mander.xyz",
    languages: ["en"],
    topics: [ART, TECHNOLOGY, POLITICS],
  },
  {
    domain: "infosec.pub",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemmygrad.ml",
    languages: ["en"],
    topics: [GENERAL, POLITICS, LGBTQ],
  },
  {
    domain: "sopuli.xyz",
    languages: ["en", "fi"],
    topics: [GENERAL],
  },
  {
    domain: "lemmy.sdf.org",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "lemmy.sdfeu.org",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "pawb.social",
    languages: ["en"],
    topics: [LGBTQ],
  },
  {
    domain: "lemmy.blahaj.zone",
    languages: ["en"],
    topics: [GENERAL, LGBTQ],
  },
  {
    domain: "lemmy.dbzer0.com",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "programming.dev",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemmy.ca",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "beehaw.org",
    languages: ["en"],
    topics: [GENERAL, POLITICS, GAMING],
  },
  {
    domain: "hexbear.net",
    languages: ["en"],
    topics: [GENERAL, POLITICS, LGBTQ],
  },
  {
    domain: "midwest.social",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "lemmy.world",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "startrek.website",
    languages: ["en"],
    topics: [TECHNOLOGY, ART, POLITICS],
  },
  {
    domain: "lemmy.fmhy.ml",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["en", "de"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "lemm.ee",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "reddthat.com",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "discuss.online",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemmy.one",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "links.dartboard.social",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "poptalk.scrubbles.tech",
    languages: ["en"],
    topics: [MUSIC],
  },
  {
    domain: "aiparadise.moe",
    languages: ["en"],
    topics: [TECHNOLOGY, ART],
  },
  {
    domain: "jlai.lu",
    languages: ["fr"],
    topics: [GENERAL],
  },
  {
    domain: "kerala.party",
    languages: ["ml"],
    topics: [GENERAL],
  },
  {
    domain: "monero.town",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "mujico.org",
    languages: ["es"],
    topics: [GENERAL],
  },
  {
    domain: "partizle.com",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "sub.wetshaving.social",
    languages: ["en"],
    topics: [HOBBIES],
  },
  {
    domain: "iusearchlinux.fyi",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "feddit.dk",
    languages: ["da"],
    topics: [GENERAL],
  },
  {
    domain: "feddit.nu",
    languages: ["sv"],
    topics: [GENERAL],
  },
  {
    domain: "mtgzone.com",
    languages: ["en"],
    topics: [HOBBIES],
  },
  {
    domain: "lemmy.run",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "rblind.com",
    languages: ["en"],
    topics: [GENERAL, TECHNOLOGY],
  },
  {
    domain: "tucson.social",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "lemmyonline.com",
    languages: ["en"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "lemmy.wtf",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "thelemmy.club",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "bookwormstory.social",
    languages: ["en"],
    topics: [ART, LITERATURE],
  },
  {
    domain: "lib.lgbt",
    languages: ["en"],
    topics: [LGBTQ],
  },
  {
    domain: "suppo.fi",
    languages: ["en", "fi"],
    topics: [GENERAL],
  },
  {
    domain: "lemmy.studio",
    languages: ["en"],
    topics: [MUSIC, HOBBIES, ART],
  },
  {
    domain: "lemmy.radio",
    languages: ["en"],
    topics: [MUSIC, HOBBIES],
  },
  {
    domain: "feddit.ch",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "preserve.games",
    languages: ["en"],
    topics: [GAMING],
  },
  {
    domain: "lemmy.my.id",
    languages: ["id"],
    topics: [GENERAL],
  },
  {
    domain: "lemmyfly.org",
    languages: ["en"],
    topics: [HOBBIES],
  },
  {
    domain: "lemmy.spacestation14.com",
    languages: ["en"],
    topics: [GAMING],
  },
  {
    domain: "eslemmy.es",
    languages: ["es"],
    topics: [GENERAL],
  },
  {
    domain: "dmv.social",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "feddit.ro",
    languages: ["ro"],
    topics: [GENERAL],
  },
  {
    domain: "feddit.de",
    languages: ["de"],
    topics: [GENERAL],
  },
  {
    domain: "lemmy.ninja",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "discuss.tchncs.de",
    languages: ["de"],
    topics: [TECHNOLOGY],
  },
  {
    domain: "sh.itjust.works",
    languages: ["en", "fr"],
    topics: [GENERAL, GAMING],
  },
  {
    domain: "feddit.nl",
    languages: ["nl"],
    topics: [GENERAL],
  },
  {
    domain: "aussie.zone",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "lemmy.pt",
    languages: ["pt"],
    topics: [GENERAL],
  },
  {
    domain: "lemmy.eco.br",
    languages: ["pt"],
    topics: [GENERAL],
  },
  {
    domain: "feddit.cl",
    languages: ["es"],
    topics: [GENERAL],
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
  {
    domain: "feddit.uk",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "lemmings.world",
    languages: ["en", "cs"],
    topics: [GENERAL, TECHNOLOGY, GAMING],
  },
  {
    domain: "dormi.zone",
    languages: ["en"],
    topics: [GAMING],
  },
  {
    domain: "lemmy.myserv.one",
    languages: ["en"],
    topics: [GENERAL],
  },
  {
    domain: "leminal.space",
    languages: ["en"],
    topics: [GENERAL, ART, MUSIC],
  },
  {
    domain: "lemmy.best",
    languages: ["en"],
    topics: [GENERAL],
  },
];
