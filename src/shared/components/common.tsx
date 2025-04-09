import classNames from "classnames";

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

export const BottomSpacer = () => <div className="pb-32" />;

export const SectionTitle = ({ title }) => (
  <div className="text-2xl mb-3">{title}</div>
);
