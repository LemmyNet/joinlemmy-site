import { Component } from "inferno";
import { Link } from "inferno-router";

export class LinkLine extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
    <>
          <Link to="/join">Join</Link>
          <Link to="/apps">Apps</Link>
          <Link to="/sponsors">Sponsors</Link>
          <a href="/docs/en/index.html">Docs</a>
          <a href="/docs/en/code_of_conduct.html" title="Code of Conduct">
            CoC
          </a>
          <Link to="/contact">Contact</Link>
          </>
          );
  }
}
