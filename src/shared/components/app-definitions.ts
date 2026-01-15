export interface ToolDetails {
  name: string;
  link: string;
  description: string;
}

export enum SourceType {
  Closed,
  Open,
}

export enum Platform {
  All = "all_platforms",
  Desktop = "desktop",
  Android = "android",
  IOS = "ios",
  Web = "web",
  CLI = "cli",
}

export interface AppDetails {
  name: string;
  description: string;
  link: string;
  icon?: string;
  banner?: string;
  links: AppLink;
  sourceType: SourceType;
  platforms: Platform[];
}

export interface AppLink {
  web?: string;
  appleinc?: string;
  googleplay?: string;
  fdroid?: string;
  desktop?: string;
  github?: string;
}

export const API_LIBRARIES: ToolDetails[] = [
  {
    name: "lemmy-js-client",
    link: "https://github.com/LemmyNet/lemmy-js-client",
    description: "a javascript / typescript client.",
  },
  {
    name: "LemmyBackwardsCompatibleAPI",
    link: "https://github.com/MV-GH/LemmyBackwardsCompatibleAPI",
    description: "a Kotlin multiplatform Backward compatible Lemmy API.",
  },
  {
    name: "lemmy-client-rs",
    link: "https://github.com/SleeplessOne1917/lemmy-client-rs",
    description: "a Rust client for Lemmy.",
  },
  {
    name: "lemmy_api_client",

    link: "https://github.com/thunder-app/lemmy_api_client",
    description: "a Dart / Flutter client.",
  },
  {
    name: "go-lemmy",
    link: "https://github.com/Arsen6331/go-lemmy",
    description: "a Go client.",
  },
  {
    name: "Pythörhead",
    link: "https://github.com/db0/pythorhead",
    description: "a Python client.",
  },
];

export const MODERATION_TOOLS: ToolDetails[] = [
  {
    name: "Fediseer",
    link: "https://gui.fediseer.com",
    description:
      "This service provides an REST API which can be used to retrieve various information about Fediverse instances, particularly focused on detecting and countering bad actors.",
  },
  {
    name: "LemmyAutomod",
    link: "https://github.com/RikudouSage/LemmyAutomod",
    description:
      "LemmyAutomod is a tool for Lemmy that allows instance admins to set rules that will take action in certain scenarios.",
  },
  {
    name: "threativore",
    link: "https://github.com/db0/threativore",
    description: "A Thrediverse bot fight against spam",
  },
  {
    name: "lemmy-bouncer",
    link: "https://github.com/SleeplessOne1917/lemmy-bouncer",
    description:
      "Lemmy automod bot to prevent unvetted users from posting or commenting in a community.",
  },
];

const BLORP: AppDetails = {
  name: "Blorp",
  description: "A Threadiverse client for web, iOS, MacOS, and Android",
  link: "https://blorpblorp.xyz",
  icon: "/static/assets/images/blorp.png",
  banner: "/static/assets/images/blorp_screen.webp",
  links: {
    appleinc:
      "https://apps.apple.com/us/app/blorp-for-lemmy/id6739925430?platform=iphone",
    googleplay:
      "https://play.google.com/store/apps/details?id=xyz.blorpblorp.app",
    desktop: "https://github.com/christianjuth/blorp/releases/latest",
    github: "https://github.com/christianjuth/blorp",
    web: "https://blorpblorp.xyz",
  },
  sourceType: SourceType.Open,
  platforms: [Platform.Desktop, Platform.IOS, Platform.Web],
};

const ECHO: AppDetails = {
  name: "Echo",
  description: "A fully native Lemmy Client for iOS",
  link: "https://echo.rrainn.com",
  icon: "/static/assets/images/echo.webp",
  banner: "/static/assets/images/echo_screen.webp",
  links: {
    appleinc: "https://apps.apple.com/us/app/echo-for-lemmy/id6450902296",
  },

  sourceType: SourceType.Closed,
  platforms: [Platform.IOS],
};

const VOYAGER: AppDetails = {
  name: "Voyager",
  description: "A Lemmy Client for iOS, Android and the web",
  link: "https://getvoyager.app",
  icon: "/static/assets/images/voyager.png",
  banner: "/static/assets/images/voyager_screen.webp",
  links: {
    appleinc:
      "https://apps.apple.com/us/app/voyager-for-lemmy/id6451429762?platform=iphone",
    fdroid: "https://f-droid.org/en/packages/app.vger.voyager",
    googleplay:
      "https://play.google.com/store/apps/details?id=app.vger.voyager",
    github: "https://github.com/aeharding/voyager",
    web: "https://vger.app/",
  },
  sourceType: SourceType.Open,
  platforms: [Platform.Android, Platform.IOS, Platform.Web],
};

const THUNDER: AppDetails = {
  name: "Thunder",
  description:
    "An open-source cross-platform Lemmy client for iOS and Android built with Flutter",
  link: "https://github.com/thunder-app/thunder",
  icon: "/static/assets/images/thunder_logo.webp",
  banner: "/static/assets/images/thunder_screen.webp",
  links: {
    fdroid: "https://apt.izzysoft.de/fdroid/index/apk/com.hjiangsu.thunder",

    appleinc: "https://apps.apple.com/iq/app/thunder-for-lemmy/id6450518497",

    googleplay:
      "https://play.google.com/store/apps/details?id=com.hjiangsu.thunder",

    github: "https://github.com/thunder-app/thunder",
  },
  sourceType: SourceType.Open,
  platforms: [Platform.Android, Platform.IOS],
};

const JERBOA: AppDetails = {
  name: "Jerboa",
  description: "A native Android app made by Lemmy's developers",
  link: "https://github.com/LemmyNet/jerboa",
  icon: "/static/assets/images/jerboa.svg",
  banner: "/static/assets/images/jerboa_screen.webp",
  links: {
    fdroid: "https://f-droid.org/en/packages/com.jerboa",

    googleplay: "https://play.google.com/store/apps/details?id=com.jerboa",

    github: "https://github.com/LemmyNet/jerboa",
  },
  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const ETERNITY: AppDetails = {
  name: "Eternity",
  description: "A Lemmy client for Android written in Java.",
  link: "https://codeberg.org/Bazsalanszky/Eternity",
  icon: "/static/assets/images/eternity_icon.webp",
  banner: "/static/assets/images/eternity_screen.webp",
  links: {
    fdroid: "https://f-droid.org/en/packages/eu.toldi.infinityforlemmy",

    googleplay:
      "https://play.google.com/store/apps/details?id=eu.toldi.infinityforlemmy",

    github: "https://codeberg.org/Bazsalanszky/Eternity",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const BOOST: AppDetails = {
  name: "Boost for Lemmy",
  description: "A smooth app for Lemmy.",
  link: "https://play.google.com/store/apps/details?id=com.rubenmayayo.lemmy",
  icon: "/static/assets/images/boost_icon.webp",
  banner: "/static/assets/images/boost_screen.webp",
  links: {
    googleplay:
      "https://play.google.com/store/apps/details?id=com.rubenmayayo.lemmy",
  },

  sourceType: SourceType.Closed,
  platforms: [Platform.Android],
};

const SYNC: AppDetails = {
  name: "Sync for Lemmy",
  description: "A full-featured app for browsing Lemmy on the go.",
  link: "https://play.google.com/store/apps/details?id=io.syncapps.lemmy_sync",
  icon: "/static/assets/images/sync_icon.webp",
  banner: "/static/assets/images/sync_screen.webp",
  links: {
    googleplay:
      "https://play.google.com/store/apps/details?id=io.syncapps.lemmy_sync",
  },

  sourceType: SourceType.Closed,
  platforms: [Platform.Android],
};

const MLEM: AppDetails = {
  name: "Mlem",
  description: "An open-source Lemmy client for iOS, written in Swift.",
  link: "https://github.com/mlemgroup/mlem",
  icon: "/static/assets/images/mlem.png",
  banner: "/static/assets/images/mlem_screen.webp",
  links: {
    appleinc: "https://apps.apple.com/us/app/mlem-for-lemmy/id6450543782",

    github: "https://github.com/mlemgroup/mlem",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.IOS],
};

const PHOTON: AppDetails = {
  name: "Photon",
  description: "A fully-featured, intuitive and clean web app for Lemmy.",
  link: "https://github.com/Xyphyn/photon",
  banner: "/static/assets/images/photon.webp",
  icon: "/static/assets/images/photon-logo.svg",
  links: {
    web: "https://phtn.app/",
    github: "https://github.com/Xyphyn/photon",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.Web],
};

const ALEXANDRITE: AppDetails = {
  name: "Alexandrite",
  description:
    "A beautiful and convenient desktop-first alternate web UI for Lemmy.",
  link: "https://github.com/sheodox/alexandrite",
  icon: "/static/assets/images/alexandrite_logo.svg",
  banner: "/static/assets/images/alexandrite_screen.webp",
  links: {
    github: "https://github.com/sheodox/alexandrite",
    web: "https://a.lemmy.world/lemmy.world",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.Web],
};

const MLMYM: AppDetails = {
  name: "mlmym",
  description: "A familiar desktop experience for lemmy",
  link: "https://github.com/rystaf/mlmym",
  banner: "/static/assets/images/mlmym_screen.webp",
  links: {
    github: "https://github.com/rystaf/mlmym",
    web: "https://old.lemmy.world/",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.Web],
};

const NEONMODEM: AppDetails = {
  name: "neonmodem",
  description: "BBS-style TUI client",
  link: "https://github.com/mrusme/neonmodem",
  banner: "/static/assets/images/neonmodem.webp",
  links: {
    github: "https://github.com/mrusme/neonmodem",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.CLI],
};

const SUMMIT: AppDetails = {
  name: "Summit",
  description: "A Lemmy Client for Android.",
  link: "https://play.google.com/store/apps/details?id=com.idunnololz.summit",
  icon: "/static/assets/images/summit_logo.svg",
  banner: "/static/assets/images/summit_screen.webp",
  links: {
    googleplay:
      "https://play.google.com/store/apps/details?id=com.idunnololz.summit",

    github: "https://github.com/idunnololz/summit",
  },

  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const ARCTIC: AppDetails = {
  name: "Arctic",
  description: "A free and native iOS client, written in Swift.",
  link: "https://lemmy.world/c/arctic",
  icon: "/static/assets/images/arctic_icon.webp",
  banner: "/static/assets/images/arctic_screen.webp",
  links: {
    appleinc: "https://apps.apple.com/us/app/arctic-for-lemmy/id6457925837",
  },

  sourceType: SourceType.Closed,
  platforms: [Platform.IOS],
};

export const APP_LIST: AppDetails[] = [
  ECHO,
  JERBOA,
  ETERNITY,
  MLEM,
  VOYAGER,
  THUNDER,
  PHOTON,
  ALEXANDRITE,
  MLMYM,
  NEONMODEM,
  BOOST,
  SYNC,
  SUMMIT,
  ARCTIC,
  BLORP,
];
