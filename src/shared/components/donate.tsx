import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { translators } from "../translations/translators";
import { languagesAll, countries } from "countries-list";
import { isBrowser } from "../utils";
import { Badge, SupportDonateBlock, gradientTextClasses } from "./common";
import {
  CODERS,
  GOLD_SPONSORS,
  HIGHLIGHTED_SPONSORS,
  LATINUM_SPONSORS,
  SILVER_SPONSORS,
  SPONSORS,
  Translation,
} from "./donate-definitions";
import classNames from "classnames";
import { Icon } from "./icon";

const avatarSize = 40;
const bannerWidth = 240;
const bannerHeight = 101;

const SectionTitle = ({ title }) => (
  <div className="text-2xl mb-3">{title}</div>
);

const ContributorsBlock = () => (
  <div>
    <SectionTitle title={i18n.t("contributers")} />
    <p class="text-sm text-gray-300 mb-3">{i18n.t("thanks_coders")}</p>
    <CodersBlock />
    <p class="text-sm text-gray-300 mt-6 mb-3">
      {i18n.t("thanks_translators")}
    </p>
    <TranslatorsBlock />
  </div>
);

const CodersBlock = () => (
  <div className="card card-bordered bg-neutral-900 shadow-xl">
    <div className="card-body p-4">
      <PersonBadges persons={CODERS} />
    </div>
  </div>
);

const TranslatorsBlock = () => (
  <div className="card card-bordered bg-neutral-900 shadow-xl">
    <div className="card-body p-4">
      <table>
        {convertTranslators().map(t => (
          <tr>
            <td>
              <div className="text-secondary">
                <span>{languagesAll[t.lang].native}</span>
                {t.country && <span> {countries[t.country].native}</span>}
                <span>:</span>
              </div>
            </td>
            <td>
              <PersonBadges persons={t.translators} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  </div>
);

interface PersonBadgeData {
  name: string;
  link?: string;
  greenOutline?: boolean;
  greenAt?: boolean;
}

interface PersonBadgeProps {
  person: PersonBadgeData;
}

const PersonBadge = ({ person }: PersonBadgeProps) =>
  person.link ? (
    <a href={person.link}>
      <PersonBadgeInternal person={person} />
    </a>
  ) : (
    <PersonBadgeInternal person={person} />
  );

const PersonBadgeInternal = ({ person }: PersonBadgeProps) => (
  <Badge
    content={
      <div>
        <Icon
          icon="at-sign"
          classes={classNames("fill-current text-gray-600", {
            "text-primary": person.greenAt,
          })}
        />
        <span
          className={classNames("ml-1", {
            [`${gradientTextClasses}`]: person.link,
          })}
        >
          {person.name}
        </span>
      </div>
    }
  />
);

interface PersonBadgesProps {
  persons: PersonBadgeData[];
}

const PersonBadges = ({ persons }: PersonBadgesProps) => (
  <div className="flex flex-row flex-wrap gap-2 mb-2">
    {persons.map(p => (
      <PersonBadge person={p} />
    ))}
  </div>
);

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
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <SupportDonateBlock />
        <div className="mb-16" />
        <ContributorsBlock />

        <div class="container">
          <div class="text-center">
            <h1>{i18n.t("support_lemmy")}</h1>
          </div>

          <hr />
          <div class="text-center">
            <h2>{i18n.t("contributers")}</h2>
            {this.codersLine()}
            {this.translatorsLine()}
          </div>
          <div class="text-center">
            <h2>{i18n.t("sponsors")}</h2>
            {LATINUM_SPONSORS.length > 0 && (
              <div>
                <p>{i18n.t("gold_pressed_latinum_sponsors_desc")}</p>
                <div class="row is-horizontal-align">
                  {LATINUM_SPONSORS.map(s => (
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
            {GOLD_SPONSORS.length > 0 && (
              <div>
                <p>{i18n.t("gold_sponsors_desc")}</p>
                <div class="row is-horizontal-align">
                  {GOLD_SPONSORS.map(s => (
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
            {SILVER_SPONSORS.length > 0 && (
              <div>
                <p>{i18n.t("silver_sponsors_desc")}</p>
                <div class="row is-horizontal-align">
                  {SILVER_SPONSORS.map(s => (
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
              {HIGHLIGHTED_SPONSORS.map(s => (
                <div class="col">
                  <div class="button outline primary">{s}</div>
                </div>
              ))}
              {SPONSORS.map(s => (
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
          {CODERS.map((coder, i) => (
            <span>
              {coder.link ? (
                <a href={coder.link}>{coder.name}</a>
              ) : (
                <span>{coder.name}</span>
              )}
              <span>{i != CODERS.length - 1 ? ", " : "  "}</span>
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
