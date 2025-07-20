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
  links: AppLink[];
  sourceType: SourceType;
  platforms: Platform[];
}

export interface AppLink {
  link: string;
  icon: string;
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
  links: [
    {
      link: "https://apps.apple.com/us/app/blorp-for-lemmy/id6739925430?platform=iphone",
      icon: "appleinc",
    },
    {
      link: "https://play.google.com/store/apps/details?id=xyz.blorpblorp.app",
      icon: "googleplay",
    },
    {
      link: "https://github.com/christianjuth/blorp/releases/latest",
      icon: "desktop",
    },
    {
      link: "https://github.com/christianjuth/blorp",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Desktop, Platform.IOS, Platform.Web],
};

const ECHO: AppDetails = {
  name: "Echo",
  description: "A fully native Lemmy Client for iOS",
  link: "https://echo.rrainn.com",
  icon: "/static/assets/images/echo.webp",
  banner: "/static/assets/images/echo_screen.webp",
  links: [
    {
      link: "https://apps.apple.com/us/app/echo-for-lemmy/id6450902296",
      icon: "appleinc",
    },
  ],
  sourceType: SourceType.Closed,
  platforms: [Platform.IOS],
};

const VOYAGER: AppDetails = {
  name: "Voyager",
  description: "A Lemmy Client for iOS, Android and the web",
  link: "https://getvoyager.app",
  icon: "/static/assets/images/voyager.png",
  banner: "/static/assets/images/voyager_screen.webp",
  links: [
    {
      link: "https://apps.apple.com/us/app/voyager-for-lemmy/id6451429762?platform=iphone",
      icon: "appleinc",
    },
    {
      link: "https://f-droid.org/en/packages/app.vger.voyager",
      icon: "f-droid",
    },
    {
      link: "https://play.google.com/store/apps/details?id=app.vger.voyager",
      icon: "googleplay",
    },
    {
      link: "https://github.com/aeharding/voyager",
      icon: "github",
    },
    {
      link: "https://www.patreon.com/voyagerapp",
      icon: "patreon",
    },
  ],
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
  links: [
    {
      link: "https://apt.izzysoft.de/fdroid/index/apk/com.hjiangsu.thunder",
      icon: "f-droid",
    },
    {
      link: "https://apps.apple.com/iq/app/thunder-for-lemmy/id6450518497",
      icon: "appleinc",
    },
    {
      link: "https://play.google.com/store/apps/details?id=com.hjiangsu.thunder",
      icon: "googleplay",
    },
    {
      link: "https://github.com/thunder-app/thunder",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Android, Platform.IOS],
};

const JERBOA: AppDetails = {
  name: "Jerboa",
  description: "A native Android app made by Lemmy's developers",
  link: "https://github.com/LemmyNet/jerboa",
  icon: "/static/assets/images/jerboa.svg",
  banner: "/static/assets/images/jerboa_screen.webp",
  links: [
    {
      link: "https://f-droid.org/en/packages/com.jerboa",
      icon: "f-droid",
    },
    {
      link: "https://play.google.com/store/apps/details?id=com.jerboa",
      icon: "googleplay",
    },
    {
      link: "https://github.com/LemmyNet/jerboa",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const ETERNITY: AppDetails = {
  name: "Eternity",
  description: "A Lemmy client for Android written in Java.",
  link: "https://codeberg.org/Bazsalanszky/Eternity",
  icon: "/static/assets/images/eternity_icon.webp",
  banner: "/static/assets/images/eternity_screen.webp",
  links: [
    {
      link: "https://f-droid.org/en/packages/eu.toldi.infinityforlemmy",
      icon: "f-droid",
    },
    {
      link: "https://play.google.com/store/apps/details?id=eu.toldi.infinityforlemmy",
      icon: "googleplay",
    },
    {
      link: "https://codeberg.org/Bazsalanszky/Eternity",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const BOOST: AppDetails = {
  name: "Boost for Lemmy",
  description: "A smooth app for Lemmy.",
  link: "https://play.google.com/store/apps/details?id=com.rubenmayayo.lemmy",
  icon: "/static/assets/images/boost_icon.webp",
  banner: "/static/assets/images/boost_screen.webp",
  links: [
    {
      link: "https://play.google.com/store/apps/details?id=com.rubenmayayo.lemmy",
      icon: "googleplay",
    },
  ],
  sourceType: SourceType.Closed,
  platforms: [Platform.Android],
};

const SYNC: AppDetails = {
  name: "Sync for Lemmy",
  description: "A full-featured app for browsing Lemmy on the go.",
  link: "https://play.google.com/store/apps/details?id=io.syncapps.lemmy_sync",
  icon: "/static/assets/images/sync_icon.webp",
  banner: "/static/assets/images/sync_screen.webp",
  links: [
    {
      link: "https://play.google.com/store/apps/details?id=io.syncapps.lemmy_sync",
      icon: "googleplay",
    },
  ],
  sourceType: SourceType.Closed,
  platforms: [Platform.Android],
};

const MLEM: AppDetails = {
  name: "Mlem",
  description: "An open-source Lemmy client for iOS, written in Swift.",
  link: "https://github.com/mlemgroup/mlem",
  icon: "/static/assets/images/mlem.png",
  banner: "/static/assets/images/mlem_screen.webp",
  links: [
    {
      link: "https://apps.apple.com/us/app/mlem-for-lemmy/id6450543782",
      icon: "appleinc",
    },
    {
      link: "https://github.com/mlemgroup/mlem",
      icon: "github",
    },
    {
      link: "https://opencollective.com/mlem",
      icon: "opencollective",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.IOS],
};

const LEMMY_UI: AppDetails = {
  name: "lemmy-ui",
  description: "The official web app for lemmy.",
  link: "https://github.com/LemmyNet/lemmy-ui",
  banner: "/static/assets/images/mobile_pic.webp",
  links: [
    {
      link: "https://github.com/LemmyNet/lemmy-ui",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Web],
};

const PHOTON: AppDetails = {
  name: "Photon",
  description: "A fully-featured, intuitive and clean web app for Lemmy.",
  link: "https://github.com/Xyphyn/photon",
  banner: "/static/assets/images/photon.webp",
  icon: "/static/assets/images/photon-logo.svg",
  links: [
    {
      link: "https://github.com/Xyphyn/photon",
      icon: "github",
    },
  ],
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
  links: [
    {
      link: "https://github.com/sheodox/alexandrite",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Web],
};

const MLMYM: AppDetails = {
  name: "mlmym",
  description: "A familiar desktop experience for lemmy",
  link: "https://github.com/rystaf/mlmym",
  banner: "/static/assets/images/mlmym_screen.webp",
  links: [
    {
      link: "https://github.com/rystaf/mlmym",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Web],
};

const NEONMODEM: AppDetails = {
  name: "neonmodem",
  description: "BBS-style TUI client",
  link: "https://github.com/mrusme/neonmodem",
  banner: "/static/assets/images/neonmodem.webp",
  links: [
    {
      link: "https://github.com/mrusme/neonmodem",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.CLI],
};

const SUMMIT: AppDetails = {
  name: "Summit",
  description: "A Lemmy Client for Android.",
  link: "https://play.google.com/store/apps/details?id=com.idunnololz.summit",
  icon: "/static/assets/images/summit_logo.svg",
  banner: "/static/assets/images/summit_screen.webp",
  links: [
    {
      link: "https://play.google.com/store/apps/details?id=com.idunnololz.summit",
      icon: "googleplay",
    },
    {
      link: "https://github.com/idunnololz/summit-for-lemmy",
      icon: "github",
    },
    {
      link: "https://github.com/idunnololz/summit",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const ARCTIC: AppDetails = {
  name: "Arctic",
  description: "A free and native iOS client, written in Swift.",
  link: "https://lemmy.world/c/arctic",
  icon: "/static/assets/images/arctic_icon.webp",
  banner: "/static/assets/images/arctic_screen.webp",
  links: [
    {
      link: "https://apps.apple.com/us/app/arctic-for-lemmy/id6457925837",
      icon: "appleinc",
    },
  ],
  sourceType: SourceType.Closed,
  platforms: [Platform.IOS],
};

export const APP_LIST: AppDetails[] = [
  ECHO,
  JERBOA,
  ETERNITY,
  MLEM,
  LEMMY_UI,
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
