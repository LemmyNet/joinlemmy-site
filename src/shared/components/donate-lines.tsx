import { Component } from "inferno";

export class DonateLines extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <>
        <p>
          Lemmy is free, open-source software, meaning no advertising,
          monetizing, or venture capital, ever.{" "}
          <a href="/sponsors">Your donations</a> directly support full-time
          development of the project.
        </p>
        <div class="row is-horizontal-align">
          <div class="col-3">
            <a class="button primary" href="https://liberapay.com/Lemmy">
              Support on Liberapay
            </a>
          </div>
          <div class="col-3">
            <a class="button primary" href="https://www.patreon.com/dessalines">
              Support on Patreon
            </a>
          </div>
          <div class="col-3">
            <a
              class="col button primary"
              href="https://opencollective.com/lemmy"
            >
              Support on OpenCollective
            </a>
          </div>
        </div>
      </>
    );
  }
}
