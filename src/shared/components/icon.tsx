export enum IconSize {
  Small = "w-3 h-3",
  Medium = "w-4 h-4",
  Large = "w-6 h-6",
  Largest = "w-8 h-8",
}

interface IconProps {
  icon: string;
  size?: IconSize;
  classes?: string;
}

export const Icon = ({ icon, size = IconSize.Medium, classes }: IconProps) => (
  <svg className={`icon ${size} ${classes}`}>
    <title>{icon}</title>
    <use xlinkHref={`#icon-${icon}`}></use>
  </svg>
);

export const Spinner = () => (
  <Icon icon="spinner" classes="icon-spinner spin" />
);
