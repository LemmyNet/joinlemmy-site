export interface ApiLibrary {
  name: string;
  link: string;
  description: string;
}

export interface AppDetails {
  name: string;
  description: string;
  link: string;
  icon?: string;
  banner?: string;
  links: AppLink[];
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
    name: "lemmy-dart client",

    link: "https://github.com/LemmurOrg/lemmy_api_client",
    description: "a dart / flutter client.",
  },
  {
    name: "go-lemmy",
    link: "https://github.com/Arsen6331/go-lemmy",
    description: "a Go client.",
  },
];

const voyagerApp: AppDetails = {
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
      link: "https://play.google.com/store/apps/details?id=app.vger.voyager",
      icon: "googleplay",
    },
    {
      link: "https://github.com/aeharding/voyager",
      icon: "github",
    },
  ],
};

export const ANDROID_APPS: AppDetails[] = [
  {
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
  },
  voyagerApp,
];

export const IOS_APPS: AppDetails[] = [
  {
    name: "Mlem",
    description: "A Lemmy Client for iOS.",
    link: "https://github.com/mormaer/Mlem",
    icon: "/static/assets/images/mlem.png",
    banner: "/static/assets/images/mlem_screen.webp",
    links: [
      {
        link: "https://testflight.apple.com/join/MelFP11Y",
        icon: "appleinc",
      },
      {
        link: "https://github.com/mlemgroup/mlem",
        icon: "github",
      },
    ],
  },
  voyagerApp,
  {
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
  },
  {
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
  },
];

export const WEB_APPS: AppDetails[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export const CLI_APPS: AppDetails[] = [
  {
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
  },
];
