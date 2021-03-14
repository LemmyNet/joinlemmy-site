import { Component } from "inferno";
import { Icon } from "./icon";
import { Helmet } from "inferno-helmet";

const title = "Lemmy - Apps and Libraries";

export class Apps extends Component<any, any> {
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
          <h1>Lemmy Apps</h1>
          <p>Choose from any of the apps below.</p>

          <div class="row">
            <div class="card col-6">
              <header class="is-center">
                <img class="app-icon" src="/static/assets/images/lemmur.svg" />
                <h4>
                  <a href="https://github.com/krawieck/lemmur">lemmur</a>
                </h4>
              </header>
              <div class="is-center">
                <img
                  class="app-banner"
                  src="/static/assets/images/lemmur_screen.webp"
                />
              </div>
              <br />
              <p class="is-center">
                A Lemmy client for Android, Linux, and Windows.
              </p>
              <footer class="is-center">
                <a
                  class="button primary"
                  href="https://f-droid.org/packages/com.krawieck.lemmur"
                >
                  <Icon icon="f-droid" />
                </a>
                <a
                  class="button primary"
                  href="https://play.google.com/store/apps/details?id=com.krawieck.lemmur"
                >
                  <Icon icon="googleplay" />
                </a>
                <a
                  class="button primary"
                  href="https://github.com/krawieck/lemmur"
                >
                  <Icon icon="github" />
                </a>
              </footer>
            </div>

            <div class="card col-6">
              <header class="is-center">
                <img class="app-icon" src="/static/assets/images/remmel.webp" />
                <h4>
                  <a href="https://github.com/uuttff8/Lemmy-iOS">remmel</a>
                </h4>
              </header>
              <div class="is-center">
                <img
                  class="app-banner"
                  src="/static/assets/images/remmel_screen.webp"
                />
              </div>
              <br />
              <p class="is-center">An iOS client for lemmy.</p>
              <footer class="is-center">
                <a
                  class="button primary"
                  href="https://apps.apple.com/us/app/remmel-for-lemmy/id1547988171"
                >
                  <Icon icon="appleinc" />
                </a>
                <a
                  class="button primary"
                  href="https://github.com/uuttff8/Lemmy-iOS"
                >
                  <Icon icon="github" />
                </a>
              </footer>
            </div>
          </div>

          <h1>Web Apps</h1>

          <div class="row">
            <div class="card col-6">
              <header class="is-center">
                <img class="app-icon" src="/static/assets/images/lemmy.svg" />
                <h4>
                  <a href="https://github.com/LemmyNet/lemmy-ui">lemmy-ui</a>
                </h4>
              </header>
              <div class="is-center">
                <img
                  class="app-banner"
                  src="/static/assets/images/mobile_pic.webp"
                />
              </div>
              <br />
              <p class="is-center">The official web app for lemmy.</p>
              <footer class="is-center">
                <a
                  class="button primary"
                  href="https://github.com/LemmyNet/lemmy-ui"
                >
                  <Icon icon="github" />
                </a>
              </footer>
            </div>

            <div class="card col-6">
              <header class="is-center">
                <img class="app-icon" src="/static/assets/images/lemmy.svg" />
                <h4>
                  <a href="https://github.com/IronOxidizer/lemmy-lite">
                    lemmy-lite
                  </a>
                </h4>
              </header>
              <div class="is-center">
                <img
                  class="app-banner"
                  src="/static/assets/images/lemmy_lite_screen.webp"
                />
              </div>
              <br />
              <p class="is-center">
                A static, JSless, touch-friendly Lemmy frontend built for legacy
                web clients and maximum performance
              </p>
              <footer class="is-center">
                <a
                  class="button primary"
                  href="https://github.com/IronOxidizer/lemmy-lite"
                >
                  <Icon icon="github" />
                </a>
              </footer>
            </div>
          </div>

          <h1>Lemmy API Libraries</h1>
          <ul>
            <li>
              <a href="https://github.com/LemmyNet/lemmy-js-client">
                lemmy-js-client
              </a>{" "}
              - a javascript / typescript client.
            </li>
            <li>
              <a href="https://github.com/krawieck/lemmy_api_client">
                lemmy-dart client
              </a>{" "}
              - a dart / flutter client.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
