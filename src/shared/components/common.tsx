import { Link } from "inferno-router";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import classNames from "classnames";
import {
  END_FUNDRAISER_DATE,
  FUNDED_DEVS,
  FUNDED_DEV_GOAL,
  MEDIAN_DEV_MONTHLY_EUR,
  MEDIAN_DEV_SALARY,
  TOTAL_RECURRING_MONTHLY_EUR,
  TOTAL_SUPPORTERS,
} from "./donate-definitions";
import { NUMBER_FORMAT, monthsBetween } from "../utils";

export const TEXT_GRADIENT =
  "bg-gradient-to-r bg-clip-text text-transparent from-[#69D066] to-[#03A80E]";

export const CARD_GRADIENT =
  "bg-gradient-to-r from-[#797979]/[.05] via-[#07B0BA]/[.15] to-[#797979]/[.05]";

export const BACKGROUND_GRADIENT_1 =
  "min-h-full bg-gradient-to-r from-transparent via-[#12D10E]/[.15] to-transparent";

export const BACKGROUND_GRADIENT_2 =
  "min-h-full bg-gradient-to-b from-transparent to-black/[.30] to-20%";

export const SELECT_CLASSES =
  "select select-sm select-ghost select-bordered text-gray-400";

export const Badge = ({ content, outline = false }) => (
  <div
    className={classNames("p-2 rounded-xl bg-neutral-800 text-gray-300 w-fit", {
      "outline outline-primary": outline,
    })}
  >
    {content}
  </div>
);

export const DonateDesc = () => (
  <p className="text-sm text-gray-300 mb-3">
    <T i18nKey="donate_desc">
      #
      <Link className="link link-primary" to="/donate">
        #
      </Link>
      #
    </T>
  </p>
);

export const DonateButtons = () => (
  <div class="flex flex-row flex-wrap justify-between gap-2">
    <a
      class="btn btn-primary text-white sm:max-md:btn-block normal-case"
      href="https://liberapay.com/Lemmy"
    >
      <T i18nKey="support_on_liberapay">
        #<span className="font-bold">#</span>
      </T>
    </a>
    <a
      class="btn btn-secondary text-white sm:max-md:btn-block normal-case"
      href="https://www.patreon.com/dessalines"
    >
      <T i18nKey="support_on_patreon">
        #<span className="font-bold">#</span>
      </T>
    </a>
    <a
      class="btn btn-primary text-white sm:max-md:btn-block normal-case"
      href="https://opencollective.com/lemmy"
    >
      <T i18nKey="support_on_opencollective">
        #<span className="font-bold">#</span>
      </T>
    </a>
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
        <span className="text-sm text-gray-300">
          {i18n.t("supporters", {
            formattedCount: NUMBER_FORMAT.format(TOTAL_SUPPORTERS),
          })}
        </span>
      </div>
      <div className="text-xl font-bold">
        €{NUMBER_FORMAT.format(MEDIAN_DEV_MONTHLY_EUR * FUNDED_DEV_GOAL)}
      </div>
    </div>
    <progress
      className="progress progress-primary w-auto"
      value={FUNDED_DEVS}
      max={FUNDED_DEV_GOAL}
    ></progress>
    <div className="flex flex-row flex-wrap justify-between gap-4">
      <div
        className="text-sm text-gray-300 tooltip"
        data-tip={i18n.t("based_on_salary", {
          formattedCount: NUMBER_FORMAT.format(MEDIAN_DEV_SALARY),
        })}
      >
        {i18n.t("devs_funded", {
          formattedCount1: FUNDED_DEVS.toFixed(2),
          formattedCount2: FUNDED_DEV_GOAL,
        })}
        *
      </div>
      <div className="text-sm text-gray-300">
        {monthsBetween(new Date(), END_FUNDRAISER_DATE)} months remaining
      </div>
    </div>
  </div>
);

export const SupportDonateBlock = () => (
  <div className="flex flex-col items-center pt-16">
    <div className={`card card-bordered ${CARD_GRADIENT} shadow-xl`}>
      <div className="card-body px-32 py-16">
        <p class={`card-title text-4xl mb-3 ${TEXT_GRADIENT}`}>
          {i18n.t("support_donate")}
        </p>
        <DonateDesc />
        <FundingGoal />
        <DonateButtons />
      </div>
    </div>
  </div>
);

export const BottomSpacer = () => <div className="pb-32" />;
