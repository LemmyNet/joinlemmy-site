import classNames from "classnames";
import { i18n } from "../i18next";
import { randomStr } from "../utils";

export type FilterOption<T extends string> = {
  value: T;
  i18n?: string;
  // Use this to override i18n
  noI18n?: string;
};

type FilterChipDropdownProps<T extends string> = {
  allOptions: FilterOption<T>[];
  currentOption: FilterOption<T> | undefined;
  label?: string;
  onSelect: (val: T) => void;
  className?: string;
};

export function FilterChipDropdown<T extends string>({
  allOptions,
  currentOption,
  label,
  onSelect,
  className,
}: FilterChipDropdownProps<T>) {
  const id = randomStr();
  const labelTitle = label ? `${i18n.t(label)}: ` : "";
  const buttonTitle =
    labelTitle + (currentOption && filterOptioni18nStr(currentOption));

  return (
    <div className="dropdown">
      <div className="btn-group">
        <button
          className={classNames("dropdown-toggle", className, {
            "btn btn-sm btn-light border-light-subtle": className === undefined,
          })}
          type="button"
          aria-expanded={false}
          data-bs-toggle="dropdown"
        >
          {buttonTitle}
        </button>
        <ul className="menu dropdown-content  bg-base-100">
          {allOptions.map(opt => (
            <li>
              <button
                className={classNames("dropdown-item", {
                  "fw-bold": currentOption?.value === opt.value,
                })}
                id={`${id}-${opt.value}`}
                value={opt.value}
                type="button"
                role="option"
                aria-selected={currentOption?.value === opt.value}
                onClick={() => {
                  document.activeElement?.blur();
                  onSelect(opt.value);
                }}
              >
                {filterOptioni18nStr(opt)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function filterOptioni18nStr<T extends string>(
  option: FilterOption<T>,
): string {
  return option.noI18n ? option.noI18n : i18n.t(option.i18n ?? option.value);
}
