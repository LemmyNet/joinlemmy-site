import { ChangeEvent, linkEvent } from "inferno";
import { Link } from "inferno-router";
import { Icon, IconSize } from "./icon";
import { i18n, LANGUAGES } from "../i18next";
import classNames from "classnames";
import { SELECT_CLASSES } from "./common";

const NavLink = ({ content }) => <li className="text-gray-400">{content}</li>;

const NavLinks = () => (
  <>
    <NavLink
      content={
        <Link onClick={closeNavbarDropdown} to="/instances">
          {i18n.t("join")}
        </Link>
      }
    />
    <NavLink
      content={
        <Link onClick={closeNavbarDropdown} to="/news">
          {i18n.t("news")}
        </Link>
      }
    />
    <NavLink
      content={
        <Link onClick={closeNavbarDropdown} to="/apps">
          {i18n.t("apps")}
        </Link>
      }
    />
    <NavLink
      content={
        <Link onClick={closeNavbarDropdown} to="/donate">
          {i18n.t("donate")}
        </Link>
      }
    />
    <NavLink
      content={
        <a onClick={closeNavbarDropdown} href="/docs/index.html">
          {i18n.t("docs")}
        </a>
      }
    />
    <NavLink
      content={
        <Link onClick={closeNavbarDropdown} to="/contact">
          {i18n.t("contact")}
        </Link>
      }
    />
  </>
);

function closeNavbarDropdown() {
  (document.activeElement as any).blur();
}

function handleLanguageChange(_: any, event: ChangeEvent<HTMLSelectElement>) {
  location.href = `/?lang=${event.target.value}`;
}

export const Footer = () => <Navbar footer />;

export const Navbar = ({ footer = false }) => (
  <div
    className={classNames("navbar px-2", {
      "sticky top-[100vh]": footer,
    })}
  >
    <div className="navbar-start">
      <Link className="btn btn-ghost normal-case text-xl" to="/">
        <img
          src="/static/assets/images/lemmy.svg"
          className="h-12 w-12"
          alt=""
        />
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <NavLinks />
      </ul>
    </div>
    <div className="navbar-end">
      {footer ? (
        <a
          className="text-sm text-gray-600 max-md:hidden text-right"
          href="https://github.com/LemmyNet/lemmy/blob/main/LICENSE"
        >
          {i18n.t("copyright_line")}
        </a>
      ) : (
        <>
          <select
            onChange={linkEvent(this, handleLanguageChange)}
            className={SELECT_CLASSES}
          >
            {LANGUAGES.map((l, i) => (
              <option
                key={i}
                value={l.code}
                selected={i18n.language.startsWith(l.code)}
              >
                {l.name}
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
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <Icon icon="align-right" size={IconSize.Large} />
        </div>
        <ul className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-neutral-800 rounded-box w-52 items-center mt-3">
          <NavLinks />
        </ul>
      </div>
    </div>
  </div>
);
