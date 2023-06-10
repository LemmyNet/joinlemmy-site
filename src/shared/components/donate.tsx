import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { DonateLines } from "./donate-lines";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { translators } from "../translations/translators";
import { languagesAll, countries } from "countries-list";
import { isBrowser } from "../utils";

const avatarSize = 40;
const bannerWidth = 240;
const bannerHeight = 101;

interface LinkedSponsor {
  name: string;
  link: string;
}

interface GoldSponsor {
  name: string;
  link: string;
  avatar: string;
}

let goldSponsors: GoldSponsor[] = [];

let latinumSponsors: GoldSponsor[] = [
  {
    name: "NLnet",
    link: "https://nlnet.nl",
    avatar: "https://nlnet.nl/image/logo_nlnet.svg",
  },
];

let silverSponsors: LinkedSponsor[] = [];

let highlightedSponsors = ["DQW", "John Knapp"];
let sponsors = [
  "Anthony",
  "Remi Rampin",
  "Cameron C",
  "Vegard",
  "0ti.me",
  "Brendan",
  "mexicanhalloween .",
  "Arthur Nieuwland",
  "Forrest Weghorst",
  "Luke Black",
  "Brandon Abbott",
  "Eon Gattignolo",
];

export interface Coder {
  name: string;
  link?: string;
}

let coders: Coder[] = [
  { name: "dessalines", link: "https://mastodon.social/@dessalines" },
  { name: "Nutomic", link: "https://lemmy.ml/u/nutomic" },
  { name: "asonix", link: "https://github.com/asonix" },
  { name: "krawieck", link: "https://github.com/krawieck" },
  { name: "shilangyu", link: "https://github.com/shilangyu" },
  { name: "uuttff8", link: "https://github.com/uuttff8" },
  { name: "eiknat", link: "https://github.com/eiknat" },
  { name: "ernestwisniewski", link: "https://github.com/ernestwisniewski" },
  { name: "zacanger", link: "https://github.com/zacanger" },
  { name: "iav", link: "https://github.com/iav" },
];

export interface Translation {
  lang: string;
  country?: string;
  translators: Translator[];
}

export interface Translator {
  name: string;
  link?: string;
}

export class Donate extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const title = i18n.t("support_title");
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <div class="text-center">
            <h1>{i18n.t("support_lemmy")}</h1>
            <DonateLines />
          </div>

          <hr />
          <div class="text-center">
            <h2>{i18n.t("contributers")}</h2>
            {this.codersLine()}
            {this.translatorsLine()}
          </div>
          <div class="text-center">
            <h2>{i18n.t("sponsors")}</h2>
            {latinumSponsors.length > 0 && (
              <div>
                <p>{i18n.t("gold_pressed_latinum_sponsors_desc")}</p>
                <div class="row is-horizontal-align">
                  {latinumSponsors.map(s => (
                    <div class="col-6">
                      <a class="button outline" href={s.link}>
                        <img
                          src={s.avatar}
                          width={bannerWidth}
                          height={bannerHeight}
                        />
                        <div>{s.name}</div>
                      </a>
                    </div>
                  ))}
                </div>
                <br />
              </div>
            )}
            {goldSponsors.length > 0 && (
              <div>
                <p>{i18n.t("gold_sponsors_desc")}</p>
                <div class="row is-horizontal-align">
                  {goldSponsors.map(s => (
                    <div class="col">
                      <a class="button outline gold" href={s.link}>
                        <img
                          class="is-rounded"
                          src={s.avatar}
                          width={avatarSize}
                          height={avatarSize}
                        />
                        <div>{s.name}</div>
                      </a>
                    </div>
                  ))}
                </div>
                <br />
              </div>
            )}
            {silverSponsors.length > 0 && (
              <div>
                <p>{i18n.t("silver_sponsors_desc")}</p>
                <div class="row is-horizontal-align">
                  {silverSponsors.map(s => (
                    <div class="col">
                      <a class="button outline primary" href={s.link}>
                        💎 {s.name}
                      </a>
                    </div>
                  ))}
                </div>
                <br />
              </div>
            )}
            <p>{i18n.t("general_sponsors_desc")}</p>
            <div class="row is-horizontal-align">
              {highlightedSponsors.map(s => (
                <div class="col">
                  <div class="button outline primary">{s}</div>
                </div>
              ))}
              {sponsors.map(s => (
                <div class="col">
                  <div class="button outline">{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div class="text-center">
            <h1>Crypto</h1>
            <table>
              <tr>
                <td>bitcoin</td>
                <td>
                  <code>1Hefs7miXS5ff5Ck5xvmjKjXf5242KzRtK</code>
                </td>
              </tr>
              <tr>
                <td>ethereum</td>
                <td>
                  <code>0x400c96c96acbC6E7B3B43B1dc1BB446540a88A01</code>
                </td>
              </tr>
              <tr>
                <td>monero</td>
                <td>
                  <code>
                    41taVyY6e1xApqKyMVDRVxJ76sPkfZhALLTjRvVKpaAh2pBd4wv9RgYj1tSPrx8wc6iE1uWUfjtQdTmTy2FGMeChGVKPQuV
                  </code>
                </td>
              </tr>
              <tr>
                <td>cardano</td>
                <td>
                  <code>
                    addr1q858t89l2ym6xmrugjs0af9cslfwvnvsh2xxp6x4dcez7pf5tushkp4wl7zxfhm2djp6gq60dk4cmc7seaza5p3slx0sakjutm
                  </code>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }

  translatorsLine() {
    return (
      <div>
        <p>
          <span>{i18n.t("thanks_translators")}</span>
          {convertTranslators().map(t => (
            <span>
              <span class="text-error">{languagesAll[t.lang].native}</span>
              {t.country && (
                <span class="text-error"> {countries[t.country].native}</span>
              )}
              <span>: </span>
              {t.translators.map((translator, i) => (
                <span>
                  {translator.link ? (
                    <a href={translator.link}>{translator.name}</a>
                  ) : (
                    <span>{translator.name}</span>
                  )}
                  <span>{i != t.translators.length - 1 ? ", " : "  "}</span>
                </span>
              ))}
            </span>
          ))}
        </p>
        <p>
          <T i18nKey="add_weblate">
            #<a href="https://weblate.join-lemmy.org/projects/lemmy/">#</a>
          </T>
        </p>
      </div>
    );
  }

  codersLine() {
    return (
      <div>
        <p>
          <span>{i18n.t("thanks_coders")}</span>
          {coders.map((coder, i) => (
            <span>
              {coder.link ? (
                <a href={coder.link}>{coder.name}</a>
              ) : (
                <span>{coder.name}</span>
              )}
              <span>{i != coders.length - 1 ? ", " : "  "}</span>
            </span>
          ))}
        </p>
      </div>
    );
  }
}

function convertTranslators(): Translation[] {
  let trans: Translation[] = [];
  for (const [key, value] of Object.entries(translators)) {
    let split = key.split("_");
    let lang = split[0];
    let country = split[1] !== undefined ? split[1].toUpperCase() : undefined;

    let t: Translation = {
      lang,
      country,
      translators: value,
    };
    trans.push(t);
  }
  return trans;
}
