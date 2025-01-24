import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { StaticRouter } from "inferno-router";
import { renderToString } from "inferno-server";
// import { matchPath } from "inferno-router";
import path from "path";
import { App } from "../shared/components/app";
// import { routes } from "../shared/routes";
import process from "process";
import { Helmet } from "inferno-helmet";
import { getLanguageFromCookie, i18n } from "../shared/i18next";

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
// TODO OpenAPI isn't currently working for the latest docs. This can be changed after the next release.
// server.use("/api/v0.19", express.static(path.resolve("./dist/assets/api_v0.19.html")));
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

function setLanguage(req: Request, res: Response): string {
  // Setting the language for non-js browsers
  const cookieLang = getLanguageFromCookie(req.headers.cookie);
  let language: string;
  if (req.query["lang"] !== undefined) {
    language = req.query["lang"].toString();
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

server.get("/*", async (req, res) => {
  // const activeRoute = routes.find(route => matchPath(req.path, route)) || {};
  const context = {} as any;

  const language = setLanguage(req, res);
  i18n.changeLanguage(language);

  const wrapper = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  if (context.url) {
    return res.redirect(context.url);
  }

  const root = renderToString(wrapper);
  const helmet = Helmet.renderStatic();

  res.send(`
           <!DOCTYPE html>
           <html ${helmet.htmlAttributes.toString()} lang="en" class="scroll-smooth">
           <head>
           ${erudaInit()}

           ${helmet.title.toString()}
           ${helmet.meta.toString()}

           <!-- Required meta tags -->
           <meta name="Description" content="Lemmy">
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

           <!-- Icons -->
           <link rel="shortcut icon" type="image/svg+xml" href="/static/assets/icons/favicon.svg" />
           <link rel="apple-touch-icon" href="/static/assets/icons/apple-touch-icon.png" />

           <!-- Styles -->
           <link rel="stylesheet" type="text/css" href="/static/styles/styles.css" />
           <link rel="stylesheet" href="/static/assets/glide.core.min.css">

           ${helmet.link.toString()}
           </head>
           <body ${helmet.bodyAttributes.toString()}>
             <div id='root'>${root}</div>
             <script defer src='/static/js/client.js'></script>
             <script defer data-domain="join-lemmy.org" src="https://plausible.join-lemmy.org/js/plausible.outbound-links.js"></script>
           </body>
         </html>
`);
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.info("Interrupted");
  process.exit(0);
});
