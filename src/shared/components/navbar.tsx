import { Component } from "inferno";
import { Link } from "inferno-router";
import { LinkLine } from "./link-line";
import { Icon } from "./icon";

export class Navbar extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    return (
      <>
        <nav class="nav hide-xs">
          <div class="nav-left">
            <Link className="brand" to="/">
              <img
                src="/static/assets/images/lemmy.svg"
                height="32"
                width="32"
              />
            </Link>
            <LinkLine />
          </div>
          <div class="nav-right">
            <a href="https://github.com/LemmyNet">
              <Icon icon="github" />
            </a>
            <a href="https://mastodon.social/@LemmyDev">
              <Icon icon="mastodon" />
            </a>
            <a href="https://matrix.to/#/#lemmy:matrix.org">
              <Icon icon="matrix" />
            </a>
          </div>
        </nav>
        <nav class="nav hide-sm hide-md hide-lg">
          <div class="nav-center">
            <Link className="brand" to="/">
              <img src="/static/assets/images/lemmy.svg" />
            </Link>
          </div>
        </nav>
      </>
    );
  }
}
