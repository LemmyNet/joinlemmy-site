import { Component } from "inferno";
import { LinkLine } from "./link-line";
import { T } from "inferno-i18next";

export class Footer extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    return (
      <footer>
        <br />
        <nav class="nav">
          <div class="nav-left">
            <p style="padding-left: 2rem">
              <T i18nKey="footer_desc">
                #
                <a class="footer-name" href="https://infernojs.org">
                  #
                </a>
                <a class="footer-name" href="https://jenil.github.io/chota">
                  #
                </a>
              </T>
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
