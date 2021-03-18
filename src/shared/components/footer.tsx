import { Component } from "inferno";
import { LinkLine } from "./link-line";

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
              Made with
              <a class="footer-name" href="https://infernojs.org">
                Inferno
              </a>
              and
              <a class="footer-name" href="https://jenil.github.io/chota">
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
