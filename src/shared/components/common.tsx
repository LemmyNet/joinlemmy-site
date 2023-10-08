import { Link } from "inferno-router";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import classNames from "classnames";

export const TEXT_GRADIENT =
  "bg-gradient-to-r bg-clip-text text-transparent from-[#69D066] to-[#03A80E]";

export const CARD_GRADIENT =
  "bg-gradient-to-r from-[#797979]/[.05] via-[#07B0BA]/[.15] to-[#797979]/[.05]";

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

export const SupportDonateBlock = () => (
  <div className="flex flex-col items-center pt-16">
    <div className={`card card-bordered ${CARD_GRADIENT} shadow-xl`}>
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

export const BottomSpacer = () => <div className="pb-32" />;
