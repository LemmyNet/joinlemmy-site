import { Component } from "inferno";
import { AppDetails } from "./app-details";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";

export class Apps extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = i18n.t("apps_title");
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1>{i18n.t("lemmy_apps")}</h1>
          <p>{i18n.t("choose_from_apps")}</p>

          <div class="row">
            <div class="card col-6">
              <AppDetails
                name="Jerboa"
                description="A native Android app made by Lemmy's developers"
                link="https://github.com/dessalines/jerboa"
                icon="/static/assets/images/jerboa.svg"
                banner="/static/assets/images/jerboa_screen.webp"
                links={[
                  {
                    link: "https://f-droid.org/en/packages/com.jerboa",
                    icon: "f-droid",
                  },
                  {
                    link: "https://play.google.com/store/apps/details?id=com.jerboa",
                    icon: "googleplay",
                  },
                  {
                    link: "https://github.com/dessalines/jerboa",
                    icon: "github",
                  },
                ]}
              />
            </div>
            <div class="card col-6">
              <AppDetails
                name="Mlem"
                description="A Lemmy Client for iOS."
                link="https://github.com/buresdv/Mlem"
                icon="/static/assets/images/mlem.webp"
                banner="/static/assets/images/mlem_screen.webp"
                links={[
                  {
                    link: "https://testflight.apple.com/join/xQfmkJhc",
                    icon: "appleinc",
                  },
                  {
                    link: "https://github.com/buresdv/Mlem",
                    icon: "github",
                  },
                ]}
              />
            </div>
          </div>

          <h1>{i18n.t("web_apps")}</h1>

          <div class="row">
            <div class="card col-6">
              <AppDetails
                name="lemmy-ui"
                description="The official web app for lemmy."
                link="https://github.com/LemmyNet/lemmy-ui"
                banner="/static/assets/images/mobile_pic.webp"
                links={[
                  {
                    link: "https://github.com/LemmyNet/lemmy-ui",
                    icon: "github",
                  },
                ]}
              />
            </div>

            <div class="card col-6">
              <AppDetails
                name="lemmyBB"
                description="A lemmy frontend based on phpBB."
                link="https://github.com/LemmyNet/lemmyBB"
                banner="/static/assets/images/lemmybb_2.webp"
                links={[
                  {
                    link: "https://github.com/LemmyNet/lemmyBB",
                    icon: "github",
                  },
                ]}
              />
            </div>

            <div class="card col-6">
              <AppDetails
                name="lemmy-lite"
                description="A static, JSless, touch-friendly Lemmy frontend built for legacy web clients and maximum performance"
                link="https://github.com/IronOxidizer/lemmy-lite"
                banner="/static/assets/images/lemmy_lite_screen.webp"
                links={[
                  {
                    link: "https://github.com/IronOxidizer/lemmy-lite",
                    icon: "github",
                  },
                ]}
              />
            </div>
          </div>

          <h1>{i18n.t("cli_apps")}</h1>

          <div class="row">
            <div class="card col-6">
              <AppDetails
                name="neonmodem"
                description="BBS-style TUI client"
                link="https://github.com/mrusme/neonmodem"
                banner="/static/assets/images/neonmodem.webp"
                links={[
                  {
                    link: "https://github.com/mrusme/neonmodem",
                    icon: "github",
                  },
                ]}
              />
            </div>
          </div>

          <h1>{i18n.t("api_libraries")}</h1>
          <ul>
            <li>
              <a href="https://github.com/LemmyNet/lemmy-js-client">
                lemmy-js-client
              </a>{" "}
              - a javascript / typescript client.
            </li>
            <li>
              <a href="https://github.com/LemmurOrg/lemmy_api_client">
                lemmy-dart client
              </a>{" "}
              - a dart / flutter client.
            </li>
            <li>
              <a href="https://github.com/Arsen6331/go-lemmy">go-lemmy</a> - a
              Go client.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
