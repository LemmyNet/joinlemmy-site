import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { BottomSpacer, TEXT_GRADIENT } from "./common";
import { Icon } from "./icon";

const TitleBlock = () => (
  <div className={`pt-16 text-center text-4xl mb-8 ${TEXT_GRADIENT}`}>
    {i18n.t("contact")}
  </div>
);

const ContactBlock = () => (
  <div className="flex flex-col items-center">
    <div className="card w-96 card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body items-center p-8">
        <ContactBtn
          title="!lemmy_support@lemmy.ml"
          url="https://lemmy.ml/c/lemmy_support"
        />
        <ContactBtn
          title="Matrix"
          url="https://matrix.to/#/#lemmy-space:matrix.org"
        />
        <ContactBtn title="Github" url="https://github.com/LemmyNet" />
      </div>
    </div>
  </div>
);

const ContactBtn = ({ title, url }) => (
  <a
    className="btn btn-block bg-neutral-800 mb-3 justify-start normal-case"
    href={url}
  >
    <Icon icon="embed" classes={`fill-current text-primary`} />
    <span className="underline">{title}</span>
  </a>
);

export class Contact extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    const title = i18n.t("contact_title");
    return (
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <ContactBlock />
        <BottomSpacer />
      </div>
    );
  }
}
