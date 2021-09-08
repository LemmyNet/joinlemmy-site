import { Component } from "inferno";
import { Link } from "inferno-router";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";

export class DonateLines extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <>
        <p>
          <T i18nKey="donate_desc">
            #<Link to="/donate">#</Link>#
          </T>
        </p>
        <div class="row is-horizontal-align">
          <div class="col-3">
            <a class="button primary" href="https://liberapay.com/Lemmy">
              {i18n.t("support_on_liberapay")}
            </a>
          </div>
          <div class="col-3">
            <a class="button primary" href="https://www.patreon.com/dessalines">
              {i18n.t("support_on_patreon")}
            </a>
          </div>
          <div class="col-3">
            <a
              class="col button primary"
              href="https://opencollective.com/lemmy"
            >
              {i18n.t("support_on_opencollective")}
            </a>
          </div>
        </div>
      </>
    );
  }
}
