import { Component } from "inferno";
import { Icon } from "./icon";

interface AppDetailsProps {
  name: string;
  description: string;
  link: string;
  icon?: string;
  banner?: string;
  links: AppLink[];
}

interface AppLink {
  link: string;
  icon: string;
}

export class AppDetails extends Component<AppDetailsProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    let p = this.props;
    let icon = p.icon || "/static/assets/images/lemmy.svg";
    let banner = p.banner || "/static/assets/images/lemmy.svg";

    return (
      <>
        <header class="is-center">
          <img class="app-icon" src={icon} />
          <h4>
            <a href={p.link}>{p.name}</a>
          </h4>
        </header>
        <div class="is-center">
          <img class="app-banner" src={banner} />
        </div>
        <br />
        <p class="is-center">{p.description}</p>
        <footer class="is-center">
          {p.links.map(l => (
            <a class="button primary" href={l.link}>
              <Icon icon={l.icon} />
            </a>
          ))}
        </footer>
      </>
    );
  }
}
