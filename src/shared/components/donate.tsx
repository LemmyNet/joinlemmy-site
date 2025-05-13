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

const DonateDesc = () => (
  <p className="text-gray-300 mb-3 text-justify">
    <T i18nKey="donate_desc">
      <br />
      <br />
    </T>
  </p>
);

const DonateButtons = () => (
  <div className="flex flex-row flex-wrap justify-between gap-4">
    <div class="border-2 border-gray-300 p-2 rounded-md flex flex-col grow">
      <a
        className="btn btn-primary text-white max-md:btn-block"
        href="https://liberapay.com/Lemmy"
      >
        <img src="/static/assets/icons/liberapay.svg" alt="" width="24" />
        {i18n.t("support_on_liberapay")}
      </a>
      <span class="text-center text-gray-300 pt-2">{i18n.t("preferred")}</span>
    </div>
    <a
      className="btn btn-primary text-white max-md:btn-block grow mt-2.5"
      href="https://ko-fi.com/lemmynet"
    >
      <img src="/static/assets/icons/ko-fi.svg" alt="" width="24" />
      {i18n.t("support_on_ko_fi")}
    </a>
    <a
      className="btn btn-primary text-white max-md:btn-block grow  mt-2.5"
      href="https://www.patreon.com/dessalines"
    >
      <img src="/static/assets/icons/patreon.svg" alt="" width="24" />
      {i18n.t("support_on_patreon")}
    </a>
    <a
      className="btn btn-primary text-white max-md:btn-block grow mt-2.5"
      href="https://opencollective.com/lemmy"
    >
      <img src="/static/assets/icons/opencollective.svg" alt="" width="24" />
      {i18n.t("support_on_opencollective")}
    </a>
    <Link
      className="btn btn-primary text-white max-md:btn-block grow  mt-2.5"
      to="/crypto"
    >
      <img src="/static/assets/icons/bitcoin.svg" alt="" width="24" />
      {i18n.t("support_with_crypto")}
    </Link>
  </div>
);

const FundingGoal = () => {
  const percent_funded = Math.min(
    Math.round((FUNDED_DEVS / FUNDED_DEV_GOAL) * 100),
    100,
  );

  var progress_classes = "h-5 progress w-auto mb-6 ";
  var text_classes = "flex flex-row flex-wrap justify-between gap-4 ";
  if (percent_funded < 60) {
    progress_classes += "progress-error";
    text_classes += "text-error/75";
  } else if (percent_funded < 90) {
    progress_classes += "progress-warning";
    text_classes += "text-warning";
  } else {
    progress_classes += "progress-success";
    text_classes += "text-success";
  }

  return (
    <div className="flex flex-col mb-3 gap-4">
      <div class="divider"></div>
      <div className={text_classes}>
        <div className="flex flex-row justify-between">
          <div className="text-xl font-bold">
            {i18n.t("supporters", {
              formattedCount: NUMBER_FORMAT.format(TOTAL_SUPPORTERS),
            })}
          </div>
        </div>
        <div className="mt-1 hidden md:block">
          <span className="font-bold">
            €{NUMBER_FORMAT.format(TOTAL_RECURRING_MONTHLY_EUR)}
          </span>
          <span>{i18n.t("per_month", { formattedCount: "" })}</span>
        </div>
        <div
          className="text-xl font-bold tooltip underline decoration-dotted"
          data-tip={i18n.t("based_on_salary", {
            formattedCount: NUMBER_FORMAT.format(MEDIAN_DEV_SALARY),
          })}
        >
          {i18n.t("percent_funded", {
            formattedCount: percent_funded,
          })}
        </div>
      </div>
      <progress
        className={progress_classes}
        value={percent_funded}
        max={100}
      ></progress>
    </div>
  );
};

const DonateBlock = () => (
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
