import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { isBrowser } from "../utils";
import { BottomSpacer, DonateBlock } from "./common";

export class Donate extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const title = i18n.t("donate_title");
    return (
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <DonateBlock />
        <BottomSpacer />
      </div>
    );
  }
}
