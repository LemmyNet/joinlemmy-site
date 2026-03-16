import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { matchPath, StaticRouter } from "inferno-router";
import { renderToString } from "inferno-server";
// import { matchPath } from "inferno-router";
import path from "path";
import { App } from "../shared/components/app";
// import { routes } from "../shared/routes";
import process from "process";
import { Helmet } from "inferno-helmet";
import { getLanguageFromCookie, initI18n } from "../shared/i18next";
import { all_instances, suggested_instances } from "./api";
import { routes } from "../shared/routes";

const server = express();
const port = 1234;

function cors(_req: Request, res: Response, next: NextFunction): void {
  res.header("Access-Control-Allow-Origin", "*");
  next();
}

server.use(express.json() as RequestHandler);
server.use(express.urlencoded({ extended: false }) as RequestHandler);
server.use("/static", express.static(path.resolve("./dist")));
server.use("/docs", express.static(path.resolve("./dist/assets/docs")));

// The v0.19 release docs
server.use(
  "/api/v0.19",
  express.static(path.resolve("./dist/assets/lemmy-js-client-v0.19-docs")),
);
server.use(
  "/lemmy-js-client-docs/v0.19",
  express.static(path.resolve("./dist/assets/lemmy-js-client-v0.19-docs")),
);

// The main release docs
server.use(
  "/api/main",
  express.static(path.resolve("./dist/assets/api_main.html")),
);
server.use(
  "/lemmy-js-client-docs/main",
  express.static(path.resolve("./dist/assets/lemmy-js-client-main-docs")),
);
server.use(
  "/context.json",
  cors,
  express.static(path.resolve("./dist/assets/lemmy_federation_context.json")),
);
server.use("/feed.xml", express.static(path.resolve("./dist/feed.xml")));
server.use("/api/v1/instances/suggested", suggested_instances);
server.use("/api/v1/instances/all", all_instances);

function erudaInit(): string {
  if (process.env["NODE_ENV"] === "development") {
    return `
        <script src="//cdn.jsdelivr.net/npm/eruda"></script>
        <script>eruda.init();</script>
    `;
  } else {
    return "";
  }
}

export interface Query {
  lang?: string;
}

function setLanguage(
  req: Request<object, object, object, Query>,
  res: Response,
): string {
  // Setting the language for non-js browsers
  const cookieLang = getLanguageFromCookie(req.headers.cookie);
  let language: string;
  if (req.query.lang !== undefined) {
    language = req.query.lang;
    res.cookie("lang", language, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 7),
    });
  } else if (cookieLang !== undefined) {
    language = cookieLang;
  } else {
    language = req.headers["accept-language"]
      ? req.headers["accept-language"].split(",")[0]
      : "en";
  }
  return language;
}

server.get(
  "/*",
  async (req: Request<object, object, object, Query>, res: Response) => {
    const activeRoute = routes.find(route => matchPath(req.path, route));
    if (!activeRoute) {
      res.status(404);
    }

    const language = setLanguage(req, res);
    const i18n = await initI18n();
    await i18n.changeLanguage(language);

    const wrapper = (
      <StaticRouter location={req.url} context={{}}>
        <App i18n={i18n} />
      </StaticRouter>
    );

    const root = renderToString(wrapper);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const helmet = Helmet.renderStatic();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const helmetAttr = helmet.htmlAttributes.toString();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const helmetTitle = helmet.title.toString();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const helmetMeta = helmet.meta.toString();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const helmetLink = helmet.link.toString();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const helmetBodyAttr = helmet.bodyAttributes.toString();

    res.send(`
           <!DOCTYPE html>
           <html ${helmetAttr} lang="en" class="scroll-smooth" data-theme="halloween">
           <head>
           ${erudaInit()}

           ${helmetTitle}
           ${helmetMeta}

           <!-- Required meta tags -->
           <meta name="Description" content="Lemmy">
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

           <!-- Icons -->
           <link rel="shortcut icon" type="image/svg+xml" href="/static/assets/icons/favicon.svg" />
           <link rel="apple-touch-icon" href="/static/assets/icons/apple-touch-icon.png" />

           <!-- Styles -->
           <link rel="stylesheet" type="text/css" href="/static/styles/styles.css" />

           ${helmetLink}
           </head>
           <body ${helmetBodyAttr}>
             <div id='root'>${root}</div>
             <script defer src='/static/js/client.js'></script>
           </body>
         </html>
`);
  },
);

server.listen(port, () => {
  console.info(`http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.info("Interrupted");
  process.exit(0);
});
