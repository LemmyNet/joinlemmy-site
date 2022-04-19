import { Component, ChangeEvent, linkEvent } from "inferno";
import { Link } from "inferno-router";
import { LinkLine } from "./link-line";
import { Icon } from "./icon";
import { i18n, languages } from "../i18next";

export class Navbar extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  handleLanguageChange(_: any, event: ChangeEvent<HTMLSelectElement>) {
    location.href = `/?lang=${event.target.value}`;
  }

  languageList() {
    return Object.keys(i18n.services.resourceStore.data).sort();
  }

  render() {
    return (
      <>
        <nav class="nav hide-xs hide-sm">
          <div class="nav-left">
            <Link className="brand" to="/">
              <img
                src="/static/assets/images/lemmy.svg"
                height="32"
                width="32"
              />
            </Link>
            <LinkLine />
          </div>
          <div class="nav-right">
            <div>
              <select
                onChange={linkEvent(this, this.handleLanguageChange)}
                class="text-light bd-dark language-selector"
              >
                {this.languageList().map((language, i) => (
                  <option
                    key={i}
                    value={language}
                    selected={i18n.language.startsWith(language)}
                  >
                    {languages.find(l => l.code.startsWith(language)).name}
                  </option>
                ))}
              </select>
            </div>
            <a href="https://github.com/LemmyNet">
              <Icon icon="github" />
            </a>
            <a href="https://matrix.to/#/#lemmy:matrix.org">
              <Icon icon="matrix" />
            </a>
          </div>
        </nav>
        <nav class="nav hide-md hide-lg">
          <div class="nav-center">
            <Link className="brand" to="/">
              <img src="/static/assets/images/lemmy.svg" />
            </Link>
          </div>
        </nav>
      </>
    );
  }
}
