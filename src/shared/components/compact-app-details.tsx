import { Component } from "inferno";
import { Icon } from "./icon";

interface CompactAppDetailsProps {
  name: string;
  description: string;
  link: string;
  icon?: string;
  links: AppLink[];
}

interface AppLink {
  link: string;
  icon: string;
}

export class CompactAppDetails extends Component<CompactAppDetailsProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    let p = this.props;
    let icon = p.icon || "/static/assets/images/lemmy.svg";

    return (
      <>
        <header class="is-left">
          <img class="app-icon" src={icon} />
          <h3>
            <a href={p.link}>{p.name}</a>
          </h3>
        </header>
        <p>{p.description}</p>
        <footer class="is-right">
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
