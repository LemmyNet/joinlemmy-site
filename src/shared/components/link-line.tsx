import { Component } from "inferno";
import { Link } from "inferno-router";
import { i18n } from "../i18next";

export class LinkLine extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <>
        <Link to="/join">{i18n.t("join")}</Link>
        <Link to="/apps">{i18n.t("apps")}</Link>
        <Link to="/support">{i18n.t("support")}</Link>
        <a href="/docs/en/index.html">{i18n.t("docs")}</a>
        <a
          href="/docs/en/code_of_conduct.html"
          title={i18n.t("code_of_conduct")}
        >
          {i18n.t("coc")}
        </a>
        <Link to="/contact">{i18n.t("contact")}</Link>
      </>
    );
  }
}
