import { Component } from "inferno";
import { Route, Switch } from "inferno-router";
import { Provider } from "inferno-i18next-dess";
import { routes } from "../routes";
import { NoMatch } from "./no-match";
import { Symbols } from "./symbols";
import { Footer, Navbar } from "./navbar";
import { i18n } from "i18next";
import { i18n as i18next } from "../i18next";

type AppProps = { i18n: i18n };

export class App extends Component<AppProps, object> {
  render() {
    return (
      <div className="background-gradient-1">
        <div className="background-gradient-2">
          <Provider i18next={i18next}>
            <div className="min-h-screen md:max-w-5xl md:mx-auto">
              <Navbar />
              <Switch>
                {routes.map(({ path, exact, component: C, ...rest }) => (
                  <Route
                    key={path}
                    path={path}
                    exact={exact}
                    component={props => C && <C {...props} {...rest} />}
                  />
                ))}
                <Route component={props => <NoMatch {...props} />} />
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
