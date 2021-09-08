import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";

const title = i18n.t("contact_title");

export class Contact extends Component<any, any> {
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
          <h1>{i18n.t("contact")}</h1>
          <ul>
            <li>
              <a href="https://mastodon.social/@LemmyDev">Mastodon</a>
            </li>
            <li>
              <a href="https://matrix.to/#/#lemmy:matrix.org">Matrix</a>
            </li>
            <li>
              <a href="https://github.com/LemmyNet/lemmy">GitHub</a>
            </li>
            <li>
              <a href="mailto:security@lemmy.ml">security@lemmy.ml</a>
              <br />
              <a href="/static/assets/pgp.txt">PGP key</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
