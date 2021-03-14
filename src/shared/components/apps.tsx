import { Component } from "inferno";
import { AppDetails } from "./app-details";
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
              <AppDetails
                name="lemmur"
                description="A Lemmy client for Android, Linux, and Windows."
                link="https://github.com/krawieck/lemmur"
                icon="/static/assets/images/lemmur.svg"
                banner="/static/assets/images/lemmur_screen.webp"
                links={[
                  {
                    link: "https://f-droid.org/packages/com.krawieck.lemmur",
                    icon: "f-droid",
                  },
                  {
                    link:
                      "https://play.google.com/store/apps/details?id=com.krawieck.lemmur",
                    icon: "googleplay",
                  },
                  {
                    link: "https://github.com/krawieck/lemmur",
                    icon: "github",
                  },
                ]}
              />
            </div>

            <div class="card col-6">
              <AppDetails
                name="remmel"
                description="An iOS client for lemmy."
                link="https://github.com/uuttff8/Lemmy-iOS"
                icon="/static/assets/images/remmel.webp"
                banner="/static/assets/images/remmel_screen.webp"
                links={[
                  {
                    link:
                      "https://apps.apple.com/us/app/remmel-for-lemmy/id1547988171",
                    icon: "appleinc",
                  },
                  {
                    link: "https://github.com/uuttff8/Lemmy-iOS",
                    icon: "github",
                  },
                ]}
              />
            </div>
          </div>

          <h1>Web Apps</h1>

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
