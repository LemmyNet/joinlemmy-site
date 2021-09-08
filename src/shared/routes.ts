import { IRouteProps } from "inferno-router/dist/Route";
import { Main } from "./components/main";
import { Apps } from "./components/apps";
import { Instances } from "./components/instances";
import { Contact } from "./components/contact";
import { Donate } from "./components/donate";
import { About } from "./components/about";

export const routes: IRouteProps[] = [
  {
    path: `/`,
    exact: true,
    component: Main,
  },
  {
    path: `/apps`,
    exact: true,
    component: Apps,
  },
  {
    path: `/about`,
    exact: true,
    component: About,
  },
  {
    path: `/instances`,
    exact: true,
    component: Instances,
  },
  {
    path: `/contact`,
    exact: true,
    component: Contact,
  },
  {
    path: `/support`,
    exact: true,
    component: Donate,
  },
  {
    path: `/donate`,
    exact: true,
    component: Donate,
  },
];
