import classNames from "classnames";

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
