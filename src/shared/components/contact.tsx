import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";

export class Contact extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    const title = i18n.t("contact_title");
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1>{i18n.t("contact")}</h1>
          <ul>
            <li>
              <a href="https://lemmy.ml/c/lemmy_support">/c/lemmy_support</a>
            </li>
            <li>
              <a href="https://matrix.to/#/#lemmy-space:matrix.org">Matrix</a>
            </li>
            <li>
              <a href="https://github.com/LemmyNet">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
