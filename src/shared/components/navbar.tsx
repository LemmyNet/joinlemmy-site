import { ChangeEvent, linkEvent } from "inferno";
import { Link } from "inferno-router";
import { Icon, IconSize } from "./icon";
import { i18n, LANGUAGES } from "../i18next";
import classNames from "classnames";
import { SELECT_CLASSES, languageList } from "./common";

const NavLink = ({ content }) => <li className="text-gray-400">{content}</li>;

const NavLinks = () => (
  <>
    <NavLink content={<Link to="/instances">{i18n.t("join")}</Link>} />
    <NavLink content={<Link to="/news">{i18n.t("news")}</Link>} />
    <NavLink content={<Link to="/apps">{i18n.t("apps")}</Link>} />
    <NavLink content={<Link to="/donate">{i18n.t("donate")}</Link>} />
    <NavLink content={<a href={`/docs/index.html`}>{i18n.t("docs")}</a>} />
    <NavLink content={<Link to="/contact">{i18n.t("contact")}</Link>} />
  </>
);

function handleLanguageChange(_: any, event: ChangeEvent<HTMLSelectElement>) {
  location.href = `/?lang=${event.target.value}`;
}

export const Footer = () => <Navbar footer />;

export const Navbar = ({ footer = false }) => (
  <div
    className={classNames("navbar px-10", {
      "sticky top-[100vh]": footer,
    })}
  >
    <div className="navbar-start">
      <Link className="btn btn-ghost normal-case text-xl" to="/">
        <img src="/static/assets/images/lemmy.svg" className="h-12 w-12" />
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <NavLinks />
      </ul>
    </div>
    <div className="navbar-end">
      {footer ? (
        <a className="text-sm text-gray-600 sm:max-lg:hidden">
          {i18n.t("copyright_line")}
        </a>
      ) : (
        <>
          <select
            onChange={linkEvent(this, handleLanguageChange)}
            className={SELECT_CLASSES}
          >
            {languageList().map((language, i) => (
              <option
                key={i}
                value={language}
                selected={i18n.language.startsWith(language)}
              >
                {LANGUAGES.find(l => l.code.startsWith(language)).name}
              </option>
            ))}
          </select>
        </>
      )}
      <div
        className={classNames("dropdown dropdown-end", {
          "dropdown-top": footer,
        })}
      >
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <Icon icon="align-right" size={IconSize.Large} />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-800 rounded-box w-52 items-center"
        >
          <NavLinks />
        </ul>
      </div>
    </div>
  </div>
);
