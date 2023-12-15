import fs from "fs-extra";
import MarkdownIt from "markdown-it";
import { Builder } from "xml2js";

async function generateRSSFeed() {
  const md = new MarkdownIt();
  const posts = [];
  const files = await fs.readdir("./src/assets/news"); // a folder with markdown files
  const newestFirstFiles = Array.from(files).reverse();

  for (const file of newestFirstFiles) {
    if (file.endsWith(".md")) {
      const content = await fs.readFile(`./src/assets/news/${file}`, "utf8");
      const lines = content.split("\n");
      const title = lines[0].replace(/^# /, "");
      const dateFromFileName = file.slice(0, 10);
      const date = new Date(dateFromFileName).toUTCString();
      const htmlContent = md.render(content);
      const link = `https://join-lemmy.org/news/${file
        .replace(".md", "")
        .replaceAll(" ", "_")}`;

      posts.push({ title, date, content: htmlContent, link });
    }
  }

  const rss = {
    rss: {
      $: {
        version: "2.0",
        "xmlns:atom": "http://www.w3.org/2005/Atom",
      },
      channel: [
        {
          "atom:link": {
            $: {
              href: "https://join-lemmy.org/feed.xml",
              rel: "self",
              type: "application/rss+xml",
            },
          },
          title: "join-lemmy.org News",
          link: "https://join-lemmy.org/",
          description: "News about Lemmy, a link aggregator for the fediverse.",
          item: posts.map(post => ({
            title: post.title,
            link: post.link,
            description: post.content,
            pubDate: post.date,
            guid: post.link,
          })),
        },
      ],
    },
  };

  const builder = new Builder();
  const xml = builder.buildObject(rss);

  await fs.writeFile("./dist/feed.xml", xml);
}

generateRSSFeed().then(() => console.log("RSS feed generated successfully."));
