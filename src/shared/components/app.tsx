import { Component } from "inferno";
import { Route, Switch } from "inferno-router";
import { Provider } from "inferno-i18next";
import { i18n } from "../i18next";
import { routes } from "../routes";
import { NoMatch } from "./no-match";
import { Symbols } from "./symbols";
import { Footer, Navbar } from "./navbar";

export class App extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <div className="background-gradient-1">
        <div className="background-gradient-2">
          <Provider i18next={i18n}>
            <div className="min-h-screen">
              <Navbar />
              <Switch>
                {routes.map(({ path, exact, component: C, ...rest }) => (
                  <Route
                    key={path}
                    path={path}
                    exact={exact}
                    render={props => C && <C {...props} {...rest} />}
                  />
                ))}
                <Route render={props => <NoMatch {...props} />} />
              </Switch>
              <Footer />
            </div>
            <Symbols />
          </Provider>
        </div>
      </div>
    );
  }
}
