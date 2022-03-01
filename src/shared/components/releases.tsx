import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { releases_md } from "../translations/releases";
import { mdToHtml, isBrowser } from "../utils";

const title = i18n.t("releases");

export class Releases extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <div dangerouslySetInnerHTML={mdToHtml(releases_md)} />
        </div>
      </div>
    );
  }
}
