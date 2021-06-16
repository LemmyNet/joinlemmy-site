import express from "express";
import { StaticRouter } from "inferno-router";
import { renderToString } from "inferno-server";
// import { matchPath } from "inferno-router";
import path from "path";
import { App } from "../shared/components/app";
// import { routes } from "../shared/routes";
import process from "process";
import { Helmet } from "inferno-helmet";
import { i18n } from "../shared/i18next";

const server = express();
const port = 1234;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/static", express.static(path.resolve("./dist")));
server.use("/docs", express.static(path.resolve("./dist/assets/docs")));
server.use("/api", express.static(path.resolve("./dist/assets/api")));

server.get("/*", async (req, res) => {
  // const activeRoute = routes.find(route => matchPath(req.path, route)) || {};
  const context = {} as any;

  // Setting the language for non-js browsers
  let lang = req.headers["accept-language"]
    ? req.headers["accept-language"].split(",")[0]
    : "en";
  i18n.changeLanguage(lang);

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
           <html ${helmet.htmlAttributes.toString()} lang="en">
           <head>

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
           <!-- These don't work with the css minifier -->
           <style>
             @font-face {
               font-family: 'CaviarDreams';
               font-style: normal;
  src: url('/static/assets/fonts/CaviarDreams.ttf') format('truetype');
             }
            .bg-image {
              position: fixed;
              left: 0;
              right: 0;
              z-index: -1;
              display: block;
              width: 100%;
              height: 100%;
              background:
              linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
              ),
              url('/static/assets/images/main_img.webp');
              -webkit-filter: blur(7px);
              -moz-filter: blur(7px);
              -o-filter: blur(7px);
              -ms-filter: blur(7px);
              filter: blur(7px);

              /* Center and scale the image nicely */
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            }
          </style>

           <!-- Current theme and more -->
           ${helmet.link.toString()}
           </head>

           <body ${helmet.bodyAttributes.toString()}>
             <div id='root'>${root}</div>
             <script defer src='/static/js/client.js'></script>
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
