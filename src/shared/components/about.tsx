import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";

const title = i18n.t("about_title");

export class About extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1>{i18n.t("about_title")}</h1>
          <T i18nKey="about_text">
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <p>#</p>
            <i class="is-right">#</i>
          </T>
        </div>
      </div>
    );
  }
}
