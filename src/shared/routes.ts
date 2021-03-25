import { IRouteProps } from "inferno-router/dist/Route";
import { Main } from "./components/main";
import { Apps } from "./components/apps";
import { Join } from "./components/join";
import { Contact } from "./components/contact";
import { Support } from "./components/support";

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
    path: `/join`,
    exact: true,
    component: Join,
  },
  {
    path: `/contact`,
    exact: true,
    component: Contact,
  },
  {
    path: `/support`,
    exact: true,
    component: Support,
  },
];
