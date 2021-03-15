import { Component } from "inferno";
import { Helmet } from "inferno-helmet";

const title = "Lemmy - Contact";

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
          <h1>Contact</h1>

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
              <a href="mailto:security@lemmy.ml">security@lemmy.ml</a>{" "}
              <em>PGP key below</em>
            </li>
          </ul>
          <pre>
            <code>
              -----BEGIN PGP PUBLIC KEY BLOCK-----
              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
              RnELNHhlJZ4s =VWLX -----END PGP PUBLIC KEY BLOCK-----
            </code>
          </pre>
        </div>
      </div>
    );
  }
}
