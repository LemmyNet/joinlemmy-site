import { ChangeEvent, linkEvent } from "inferno";
import { Link } from "inferno-router";
import { Icon, IconSize } from "./icon";
import { i18n, LANGUAGES } from "../i18next";
import classNames from "classnames";
import { SELECT_CLASSES } from "./common";

const NAV_LINK = ({ content }) => (
  <li className="text-gray-400 w-full md:w-fit">{content}</li>
);

const LINK_CLASS = "text-xl px-4  py-2 md:text-lg";

const NavLinks = () => (
  <>
    <NAV_LINK
      content={
        <Link
          onClick={closeNavbarDropdown}
          to="/instances"
          className={LINK_CLASS}
        >
          {i18n.t("join")}
        </Link>
      }
    />
    <NAV_LINK
      content={
        <Link onClick={closeNavbarDropdown} to="/news" className={LINK_CLASS}>
          {i18n.t("news")}
        </Link>
      }
    />
    <NAV_LINK
      content={
        <Link onClick={closeNavbarDropdown} to="/apps" className={LINK_CLASS}>
          {i18n.t("apps")}
        </Link>
      }
    />
    <NAV_LINK
      content={
        <Link onClick={closeNavbarDropdown} to="/donate" className={LINK_CLASS}>
          {i18n.t("donate")}
        </Link>
      }
    />
    <NAV_LINK
      content={
        <a
          onClick={closeNavbarDropdown}
          href="/docs/index.html"
          className={LINK_CLASS}
        >
          {i18n.t("docs")}
        </a>
      }
    />
    <NAV_LINK
      content={
        <Link
          onClick={closeNavbarDropdown}
          to="/contact"
          className={LINK_CLASS}
        >
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
  const new_location = location.href.split("?")[0];
  location.href = new_location + `?lang=${event.target.value}`;
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
