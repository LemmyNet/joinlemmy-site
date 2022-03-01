import { IRouteProps } from "inferno-router/dist/Route";
import { Main } from "./components/main";
import { Apps } from "./components/apps";
import { Instances } from "./components/instances";
import { Contact } from "./components/contact";
import { Donate } from "./components/donate";
import { About } from "./components/about";
import { News } from "./components/news";
import { NewsItem } from "./components/news-item";
import { Releases } from "./components/releases";

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
    path: `/news`,
    exact: true,
    component: News,
  },
  {
    path: `/releases`,
    exact: true,
    component: Releases,
  },
  {
    path: `/news_item/:index`,
    exact: true,
    component: NewsItem,
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
