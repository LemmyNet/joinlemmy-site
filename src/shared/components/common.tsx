import { Link } from "inferno-router";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { Icon } from "./icon";

export const gradientTextClasses =
  "bg-gradient-to-r bg-clip-text text-transparent from-[#69D066] to-[#03A80E]";

export const Badge = ({ content }) => (
  <div className="p-2 rounded-xl bg-neutral-800 text-gray-300 w-fit">
    {content}
  </div>
);

export const DonateDesc = () => (
  <p className="text-sm text-gray-300 mb-6">
    <T i18nKey="donate_desc">
      #
      <Link className="link" to="/donate">
        #
      </Link>
      #
    </T>
  </p>
);

export const DonateButtons = () => (
  <div class="flex flex-row justify-between gap-2">
    <a class="btn btn-primary text-white" href="https://liberapay.com/Lemmy">
      {i18n.t("support_on_liberapay")}
    </a>
    <a
      class="btn btn-secondary text-white"
      href="https://www.patreon.com/dessalines"
    >
      {i18n.t("support_on_patreon")}
    </a>
    <a
      class="btn btn-primary text-white"
      href="https://opencollective.com/lemmy"
    >
      {i18n.t("support_on_opencollective")}
    </a>
  </div>
);

export const SupportDonateBlock = () => (
  <div className="flex flex-col items-center mt-16">
    <div className="card card-bordered bg-neutral-800 shadow-xl">
      <div className="card-body px-32 py-16">
        <p class={`card-title text-4xl mb-3 ${gradientTextClasses}`}>
          {i18n.t("support_donate")}
        </p>
        <DonateDesc />
        <DonateButtons />
      </div>
    </div>
  </div>
);
