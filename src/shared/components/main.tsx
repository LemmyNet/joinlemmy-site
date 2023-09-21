import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { DonateLines } from "./donate-lines";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { isBrowser } from "../utils";

const LemmyTitleBlock = () => (
  <div className="flex flex-col items-center">
    <div className="flex flex-col items-center mb-2">
      <p className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#69D066] to-[#03A80E]">
        Lemmy
      </p>
      <p className="text-xl font-medium text-center">{i18n.t("lemmy_desc")}</p>
    </div>
    <div className="flex flex-row justify-around gap-2">
      <JoinServerButton />
      <RunServerButton />
    </div>
  </div>
);

const JoinServerButton = () => (
  <Link className="btn btn-primary" to="/instances">
    {i18n.t("join_a_server")}
  </Link>
);

const RunServerButton = () => (
  <a
    class="btn btn-secondary"
    href={`/docs/administration/administration.html`}
  >
    {i18n.t("run_a_server")}
  </a>
);

const FollowCommunitiesBlock = () => (
  <div className="flex flex-col items-center">
    <div className="card card-bordered w-11/12 bg-neutral-800 shadow-xl">
      <div className="card-body items-center px-32 py-16">
        <p class="card-title text-center">{i18n.t("follow_communities")}</p>
        <p class="text-sm text-gray-300 text-center mb-3">
          {i18n.t("lemmy_long_desc")}
        </p>
        <JoinServerButton />
      </div>
    </div>
  </div>
);

export class Main extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const title = i18n.t("lemmy_title");
    return (
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />{" "}
        </Helmet>
        <LemmyTitleBlock />
        <FollowCommunitiesBlock />

        <div class="bg-success">
          <br />

          <div class="container">
            <div class="row">
              <div class="col-4">
                <div>
                  <header class="is-center">
                    <img
                      height={180}
                      src="/static/assets/images/review_pic.webp"
                    />
                  </header>
                  <br />
                  <h4 class="text-center">{i18n.t("open_source")}</h4>
                  <p>
                    <T i18nKey="open_source_desc">
                      #<a href="https://github.com/LemmyNet">#</a>
                      <a href="https://en.wikipedia.org/wiki/Copyleft">#</a>
                      <a href="https://github.com/LemmyNet/lemmy/blob/master/LICENSE">
                        #
                      </a>
                    </T>
                  </p>
                </div>
              </div>
              <div class="col-4">
                <div>
                  <header class="is-center">
                    <img
                      height={180}
                      src="/static/assets/images/code_pic.webp"
                    />
                  </header>
                  <br />
                  <h4 class="text-center">{i18n.t("blazing_fast")}</h4>
                  <p>
                    <T i18nKey="blazing_fast_desc">
                      #<a href="https://www.rust-lang.org">#</a>
                      <a href="https://actix.rs/">#</a>
                      <a href="http://diesel.rs/">#</a>
                      <a href="https://infernojs.org">#</a>
                      <a href="https://www.typescriptlang.org/">#</a>
                    </T>
                  </p>
                </div>
              </div>
              <div class="col-4">
                <div>
                  <header class="is-center">
                    <img
                      height={180}
                      src="/static/assets/images/mod_pic.webp"
                    />
                  </header>
                  <br />
                  <h4 class="text-center">{i18n.t("mod_tools")}</h4>
                  <p>{i18n.t("mod_tools_desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="container">
            <div class="text-center">
              <h2>{i18n.t("create_discussion_platform")}</h2>
              <p>
                <T i18nKey="create_discussion_platform_desc">
                  #<a href={`/docs/administration/administration.html`}>#</a>
                  <i>#</i>
                  <a href="https://en.wikipedia.org/wiki/Fediverse">#</a>
                </T>
              </p>
            </div>
          </div>
          <br />
        </div>
        <br />
        <div class="container">
          <div class="row">
            <div class="col-6">
              <h4>{i18n.t("live_updates")}</h4>
              <p>{i18n.t("live_updates_desc")}</p>
            </div>
            <div class="col-6 is-center">
              <video height={325} autoPlay loop>
                <source src="/static/assets/images/reply_vid.webm" />
              </video>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div class="container">
          <div class="row">
            <div class="col-6 is-center">
              <img height={325} src="/static/assets/images/mobile_pic.webp" />
            </div>
            <div class="col-6">
              <h4 class="is-marginless">{i18n.t("more_features")}</h4>
              <ul class="is-marginless">
                <li>
                  <T i18nKey="self_hostable">
                    #<a href={`/docs/administration/install_docker.html`}>#</a>
                    <a href={`/docs/administration/install_ansible.html`}>#</a>
                  </T>
                </li>
                <li>{i18n.t("clean_interface")}</li>
                <li>
                  <Link to="/apps">
                    {i18n.t("mobile_apps_for_ios_and_android")}
                  </Link>
                </li>
                <li>{i18n.t("avatar_support")}</li>
                <li>
                  <T i18nKey="full_vote_scores">
                    #<code>#</code>#
                  </T>
                </li>
                <li>{i18n.t("themes_including")}</li>
                <li>
                  <T i18nKey="emojis_autocomplete">
                    #<code>#</code>
                  </T>
                </li>
                <li>
                  <T i18nKey="user_tagging">
                    #<code>#</code>
                    <code>#</code>
                  </T>
                </li>
                <li>{i18n.t("integrated_image_uploading")}</li>
                <li>{i18n.t("notifications_including")}</li>
                <li>
                  <T i18nKey="i18n_support">
                    #
                    <a href="https://weblate.join-lemmy.org/projects/lemmy/lemmy/">
                      #
                    </a>
                  </T>
                </li>
                <li>
                  <T i18nKey="rss_feeds">
                    #<code>#</code>
                    <code>#</code>
                    <code>#</code>
                    <code>#</code>
                    <code>#</code>
                  </T>
                </li>
                <li>{i18n.t("can_fully_erase")}</li>
                <li>{i18n.t("nsfw_support")}</li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div class="bg-success">
          <br />
          <div class="container">
            <div class="text-center">
              <h2>
                <Link to="/donate">{i18n.t("support_donate")}</Link>
              </h2>
              <DonateLines />
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
