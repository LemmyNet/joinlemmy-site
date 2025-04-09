import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { isBrowser } from "../utils";
import { BottomSpacer, CARD_GRADIENT, TEXT_GRADIENT } from "./common";
import { Link } from "inferno-router";
import { T } from "inferno-i18next";
import {
  FUNDED_DEVS,
  FUNDED_DEV_GOAL,
  MEDIAN_DEV_SALARY,
  TOTAL_RECURRING_MONTHLY_EUR,
  TOTAL_SUPPORTERS,
} from "./donate-definitions";
import { NUMBER_FORMAT } from "../utils";

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
    const title = i18n.t("donate_title");
    return (
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <DonateBlock />
        <BottomSpacer />
      </div>
    );
  }
}

export const DonateDesc = () => (
  <p className="text-gray-300 mb-3">
    <T i18nKey="donate_desc">
      <br />
      <br />
    </T>
  </p>
);

export const DonateButtons = () => (
  <div className="flex flex-row flex-wrap justify-between gap-4">
    <a
      className="btn btn-primary text-white max-md:btn-block grow"
      href="https://liberapay.com/Lemmy"
    >
      <img src="/static/assets/icons/liberapay.svg" alt="" width="24" />
      <T i18nKey="support_on_liberapay">
        #<span className="font-bold">#</span>
      </T>
    </a>
    <a
      className="btn btn-secondary text-white max-md:btn-block grow"
      href="https://www.patreon.com/dessalines"
    >
      <img src="/static/assets/icons/patreon.svg" alt="" width="24" />
      <T i18nKey="support_on_patreon">
        #<span className="font-bold">#</span>
      </T>
    </a>
    <a
      className="btn btn-primary text-white max-md:btn-block grow"
      href="https://opencollective.com/lemmy"
    >
      <img src="/static/assets/icons/opencollective.svg" alt="" width="24" />
      <T i18nKey="support_on_opencollective">
        #<span className="font-bold">#</span>
      </T>
    </a>
    <Link
      className="btn btn-secondary text-white max-md:btn-block grow"
      to="/crypto"
    >
      <img src="/static/assets/icons/bitcoin.svg" alt="" width="24" />
      Crypto
    </Link>
  </div>
);

const FundingGoal = () => (
  <div className="flex flex-col flex-wrap mb-3 gap-4">
    <div className="flex flex-row flex-wrap justify-between gap-4">
      <div>
        <span className="text-xl font-bold">
          €{NUMBER_FORMAT.format(TOTAL_RECURRING_MONTHLY_EUR)}
        </span>
        <span className="text-gray-200 mr-3">
          {i18n.t("per_month", { formattedCount: "" })}
        </span>
      </div>
      <div
        className="text-xl font-bold tooltip underline decoration-dotted"
        data-tip={i18n.t("based_on_salary", {
          formattedCount: NUMBER_FORMAT.format(MEDIAN_DEV_SALARY),
        })}
      >
        {i18n.t("devs_funded", {
          formattedCount1: FUNDED_DEVS.toFixed(1),
          formattedCount2: FUNDED_DEV_GOAL,
        })}
      </div>
    </div>
    <progress
      className="progress progress-primary w-auto"
      value={FUNDED_DEVS}
      max={FUNDED_DEV_GOAL}
    ></progress>
    <div className="flex flex-row flex-wrap justify-between gap-4">
      <div className="text-sm text-gray-300">
        {i18n.t("supporters", {
          formattedCount: NUMBER_FORMAT.format(TOTAL_SUPPORTERS),
        })}
      </div>
    </div>
  </div>
);

export const DonateBlock = () => (
  <div className="flex flex-col items-center pt-16">
    <div className={`card card-bordered ${CARD_GRADIENT} shadow-xl`}>
      <div className="card-body px-8 md:px-32 py-16">
        <p className={`card-title text-4xl mb-3 ${TEXT_GRADIENT}`}>
          {i18n.t("donate_subtitle")}
        </p>
        <DonateDesc />
        <FundingGoal />
        <DonateButtons />
      </div>
    </div>
  </div>
);
