import { Link } from "inferno-router";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import classNames from "classnames";

export const TEXT_GRADIENT =
  "bg-gradient-to-r bg-clip-text text-transparent from-[#69D066] to-[#03A80E]";

export const BACKGROUND_GRADIENT_1 =
  "min-h-full bg-gradient-to-r from-transparent via-[#12D10E]/[.15] to-transparent";

export const BACKGROUND_GRADIENT_2 =
  "min-h-full bg-gradient-to-b from-transparent to-black/[.30] to-20%";

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
  <p className="text-sm text-gray-300 mb-6">
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
      class="btn btn-primary text-white sm:max-md:btn-block"
      href="https://liberapay.com/Lemmy"
    >
      {i18n.t("support_on_liberapay")}
    </a>
    <a
      class="btn btn-secondary text-white sm:max-md:btn-block"
      href="https://www.patreon.com/dessalines"
    >
      {i18n.t("support_on_patreon")}
    </a>
    <a
      class="btn btn-primary text-white sm:max-md:btn-block"
      href="https://opencollective.com/lemmy"
    >
      {i18n.t("support_on_opencollective")}
    </a>
  </div>
);

export const SupportDonateBlock = () => (
  <div className="flex flex-col items-center pt-16">
    <div className="card card-bordered bg-neutral-800 shadow-xl">
      <div className="card-body px-32 py-16">
        <p class={`card-title text-4xl mb-3 ${TEXT_GRADIENT}`}>
          {i18n.t("support_donate")}
        </p>
        <DonateDesc />
        <DonateButtons />
      </div>
    </div>
  </div>
);
