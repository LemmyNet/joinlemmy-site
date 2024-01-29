export interface ApiLibrary {
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

export const API_LIBRARIES: ApiLibrary[] = [
  {
    name: "lemmy-js-client",
    link: "https://github.com/LemmyNet/lemmy-js-client",
    description: "a javascript / typescript client.",
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
    description: "Python SDK",
  },
];

const VOYAGER: AppDetails = {
  name: "Voyager",
  description: "A Lemmy Client for iOS, Android and the web",
  link: "https://github.com/aeharding/voyager",
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
  link: "https://github.com/dessalines/jerboa",
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
      link: "https://github.com/dessalines/jerboa",
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
      link: "https://apt.izzysoft.de/fdroid/index/apk/eu.toldi.infinityforlemmy",
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

const COMBUSTIBLE: AppDetails = {
  name: "Combustible",
  description: "An Open-Source Lemmy Client For Android",
  link: "https://github.com/TheBrokenRail/Combustible",
  icon: "/static/assets/images/combustible_logo.webp",
  banner: "/static/assets/images/combustible_screen.webp",
  links: [
    {
      link: "https://apt.izzysoft.de/fdroid/index/apk/com.thebrokenrail.combustible",
      icon: "f-droid",
    },
    {
      link: "https://github.com/TheBrokenRail/Combustible",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Android],
};

const LIFTOFF: AppDetails = {
  name: "LiftOff!",
  description: "A mobile client for lemmy",
  link: "https://github.com/liftoff-app/liftoff",
  icon: "/static/assets/images/liftoff_icon.svg",
  banner: "/static/assets/images/liftoff_screen.webp",
  links: [
    {
      link: "https://apt.izzysoft.de/fdroid/index/apk/com.liftoffapp.liftoff",
      icon: "f-droid",
    },
    {
      link: "https://play.google.com/store/apps/details?id=com.liftoffapp.liftoff&pli=1",
      icon: "googleplay",
    },
    {
      link: "https://github.com/liftoff-app/liftoff",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.Android, Platform.IOS],
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
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.IOS],
};

const LUNAR: AppDetails = {
  name: "Lunar",
  description: "A Lemmy Client for iOS written in Swift and SwiftUI",
  link: "https://github.com/mani-sh-reddy/Lunar",
  icon: "/static/assets/images/lunar_logo.webp",
  banner: "/static/assets/images/lunar_screen.webp",
  links: [
    {
      link: "https://testflight.apple.com/join/GEFCCQTb",
      icon: "appleinc",
    },
    {
      link: "https://github.com/mani-sh-reddy/Lunar",
      icon: "github",
    },
  ],
  sourceType: SourceType.Open,
  platforms: [Platform.IOS],
};

const MEMMY: AppDetails = {
  name: "Memmy",
  description:
    "A Lemmy Client built in React Native for iOS available on the App Store.",
  link: "https://github.com/Memmy-App/memmy",
  icon: "/static/assets/images/memmy_icon.png",
  banner: "/static/assets/images/memmy_banner.webp",
  links: [
    {
      link: "https://apps.apple.com/us/app/memmy-for-lemmy/id6450204299?platform=iphone",
      icon: "appleinc",
    },
    {
      link: "https://github.com/Memmy-App/memmy",
      icon: "github",
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
  description: "A sleek lemmy web UI.",
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

const LEMMYBB: AppDetails = {
  name: "lemmyBB",
  description: "A lemmy frontend based on phpBB.",
  link: "https://github.com/LemmyNet/lemmyBB",
  banner: "/static/assets/images/lemmybb_2.webp",
  links: [
    {
      link: "https://github.com/LemmyNet/lemmyBB",
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
  ],
  sourceType: SourceType.Closed,
  platforms: [Platform.Android],
};

export const APP_LIST: AppDetails[] = [
  JERBOA,
  ETERNITY,
  COMBUSTIBLE,
  LIFTOFF,
  MLEM,
  LUNAR,
  MEMMY,
  LEMMY_UI,
  VOYAGER,
  THUNDER,
  PHOTON,
  ALEXANDRITE,
  MLMYM,
  LEMMYBB,
  NEONMODEM,
  BOOST,
  SYNC,
  SUMMIT,
];
