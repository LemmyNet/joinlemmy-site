import { Component } from "inferno";
import { Link } from "inferno-router";
import { LinkLine } from "./link-line";

export class Footer extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    return (
      <footer>
        <nav class="nav">
          <div class="nav-left">
            <p style="padding-left: 2rem">
              Made using
              <a
                style="display: inline-block"
                class="is-paddingless"
                href="https://www.getzola.org"
              >
                Zola
              </a>
              and
              <a
                style="display: inline-block"
                class="is-paddingless"
                href="https://jenil.github.io/chota"
              >
                Chota
              </a>
            </p>
          </div>
          <div class="nav-right hide-sm hide-md hide-lg">
            <LinkLine />
          </div>
        </nav>
      </footer>
    );
  }
}
