import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { translators } from "../translations/translators";
import { languagesAll, countries } from "countries-list";
import { isBrowser } from "../utils";
import {
  Badge,
  BottomSpacer,
  SupportDonateBlock,
  TEXT_GRADIENT,
} from "./common";
import {
  CODERS,
  GOLD_SPONSORS,
  SILVER_SPONSORS,
  GoldSponsor,
  HIGHLIGHTED_SPONSORS,
  LATINUM_SPONSORS,
  GENERAL_SPONSORS,
  Translation,
  CRYPTOS,
} from "./donate-definitions";
import classNames from "classnames";
import { Icon } from "./icon";

const SectionTitle = ({ title }) => (
  <div className="text-2xl mb-3">{title}</div>
);

const ContributorsBlock = () => (
  <div className="my-16">
    <SectionTitle title={i18n.t("contributers")} />
    <p class="text-sm text-gray-300 mb-3">{i18n.t("thanks_coders")}</p>
    <CodersBlock />
    <p class="text-sm text-gray-300 mt-6 mb-3">
      {i18n.t("thanks_translators")}
    </p>
    <TranslatorsBlock />
    <div className="card card-bordered bg-neutral-900 shadow-xl text-center text-secondary">
      <div className="card-body p-4">
        <p>
          <T i18nKey="add_weblate">
            #
            <a
              className="link link-primary"
              href="https://weblate.join-lemmy.org/projects/lemmy/"
            >
              #
            </a>
          </T>
        </p>
      </div>
    </div>
  </div>
);

const CodersBlock = () => (
  <div className="card card-bordered bg-neutral-900 shadow-xl">
    <div className="card-body p-4">
      <PersonBadges persons={CODERS} />
    </div>
  </div>
);

const TranslatorsBlock = () => {
  // Split these into two cards for md
  const transArr = convertTranslators();
  const halfway = Math.floor(transArr.length / 2);

  const first = transArr.slice(0, halfway);
  const second = transArr.slice(halfway, transArr.length);

  return (
    <div className="mb-8">
      <div className="max-md:hidden">
        <div className="grid grid-cols-2 gap-4">
          <TranslatorsCard translations={first} />
          <TranslatorsCard translations={second} />
        </div>
      </div>
      <div className="md:max-xl:hidden">
        <TranslatorsCard translations={transArr} />
      </div>
    </div>
  );
};

interface TranslatorsCardProps {
  translations: Translation[];
}

const TranslatorsCard = ({ translations }: TranslatorsCardProps) => (
  <div className="card card-bordered bg-neutral-900 shadow-xl">
    <div className="card-body p-4">
      <table>
        {translations.map(t => (
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

const SponsorsBlock = () => (
  <div className="mb-16">
    <SectionTitle title={i18n.t("sponsors")} />
    <GoldSponsorCards
      title={i18n.t("gold_pressed_latinum_sponsors_desc")}
      sponsors={LATINUM_SPONSORS}
      color="primary"
    />
    <GoldSponsorCards
      title={i18n.t("gold_sponsors_desc")}
      sponsors={GOLD_SPONSORS}
      color="secondary"
    />
    <GoldSponsorCards
      title={i18n.t("silver_sponsors_desc")}
      sponsors={SILVER_SPONSORS}
      color="warning"
    />
    <GeneralSponsorCard />
  </div>
);

interface GoldSponsorCardsProps {
  title: string;
  sponsors: GoldSponsor[];
  color: string;
}

const GoldSponsorCards = ({ title, sponsors, color }: GoldSponsorCardsProps) =>
  sponsors.length > 0 && (
    <div>
      <p class="text-sm text-gray-300 mb-3">{title}</p>
      <div class="flex flex-row flex-wrap gap-2 mb-2">
        {sponsors.map(s => (
          <a
            class={`btn btn-${color} btn-outline w-32 h-16 normal-case`}
            href={s.link}
          >
            <div className="flex flex-wrap flex-row justify-center">
              {s.avatar && (
                <div className="avatar w-auto h-8">
                  <img src={s.avatar} className="rounded" />
                </div>
              )}
              <span className="text-xs">{s.name}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

const GeneralSponsorCard = () => {
  const highlighted: PersonBadgeData[] = HIGHLIGHTED_SPONSORS.map(name => {
    return { name, primaryOutline: true, primaryAt: true };
  });

  const general: PersonBadgeData[] = GENERAL_SPONSORS.map(name => {
    return { name, primaryAt: true };
  });

  const combined = highlighted.concat(general);

  return (
    <div>
      <p class="text-sm text-gray-300 mt-6 mb-3">
        {i18n.t("general_sponsors_desc")}
      </p>
      <div className="card card-bordered bg-neutral-900 shadow-xl">
        <div className="card-body p-4">
          <PersonBadges persons={combined} />
        </div>
      </div>
    </div>
  );
};

const CryptoBlock = () => (
  <div>
    <SectionTitle title={"Crypto"} />
    <div className="card card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body p-4">
        <table className="table table-sm">
          {CRYPTOS.map(c => (
            <tr>
              <td className="text-sm text-gray-300">{c.name}</td>
              <td>
                <Badge
                  content={
                    <code className="text-sm text-secondary break-all">
                      {c.address}
                    </code>
                  }
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  </div>
);

interface PersonBadgeData {
  name: string;
  link?: string;
  primaryOutline?: boolean;
  primaryAt?: boolean;
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
            "text-primary": person.primaryAt,
          })}
        />
        <span
          className={classNames("ml-1", {
            [`${TEXT_GRADIENT}`]: person.link,
          })}
        >
          {person.name}
        </span>
      </div>
    }
    outline={person.primaryOutline}
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
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <SupportDonateBlock />
        <ContributorsBlock />
        <SponsorsBlock />
        <CryptoBlock />
        <BottomSpacer />
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
