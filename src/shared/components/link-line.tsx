import { Component } from "inferno";
import { Link } from "inferno-router";
import { getDocsLanguage } from "../utils";
import { i18n } from "../i18next";

export class LinkLine extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <>
        <Link to="/instances">{i18n.t("join")}</Link>
        <Link to="/news">{i18n.t("news")}</Link>
        <Link to="/about">{i18n.t("about")}</Link>
        <Link to="/apps">{i18n.t("apps")}</Link>
        <Link to="/donate">{i18n.t("donate")}</Link>
        <a href={`/docs/${getDocsLanguage(i18n.language)}/index.html`}>
          {i18n.t("docs")}
        </a>
        <Link to="/contact">{i18n.t("contact")}</Link>
      </>
    );
  }
}
