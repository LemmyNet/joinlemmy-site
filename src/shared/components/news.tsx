import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { isBrowser } from "../utils";
import { news_md } from "../translations/news";
import { gradientTextClasses } from "./common";

const title = i18n.t("news");
const authors = ["nutomic", "dessalines"];
const news_reversed = news_md.reverse();

interface NewsInfo {
  title: string;
  dateStr: string;
  preview: string;
  authors: Array<string>;
  url: string;
}

function buildNewsInfoArray(): Array<NewsInfo> {
  return news_reversed.map(n => {
    let split = n.title.split(" - ");

    return {
      dateStr: split[0],
      title: split[1],
      preview: split[2] || previewMarkdown(n.markdown),
      authors,
      url: `news/${titleToUrl(n.title)}`,
    };
  });
}

function titleToUrl(title: string): string {
  return title.replace(/ /g, "_");
}

function previewMarkdown(markdown: string): string {
  return markdown.replace(/#/g, "").slice(0, 100).concat("...");
}

const TitleBlock = () => (
  <div className="mt-16 text-center text-4xl mb-8">{title}</div>
);

const NewsCards = () =>
  buildNewsInfoArray().map(n => (
    <NewsCard
      dateStr={n.dateStr}
      preview={n.preview}
      authors={n.authors}
      title={n.title}
      url={n.url}
    />
  ));

const NewsCard = ({ dateStr, authors, title, url, preview }: NewsInfo) => (
  <div className="card card-bordered bg-neutral-800 shadow-xl mb-3">
    <div className="card-body">
      <div class="grid md:grid-cols-12 grid-cols-1 gap-4">
        <div className="md:col-span-10">
          <div className="md:flex md:flex-row md:items-baseline md:space-x-3">
            <Link to={url} className={`text-2xl ${gradientTextClasses}`}>
              {title}
            </Link>
            <div className="text-sm text-gray-500">{dateStr}</div>
            {authors.map(name => (
              <AuthorBadge name={name} />
            ))}
          </div>
          <div className="text-sm text-gray-300">{preview}</div>
        </div>
        <Link to={url} className="md:col-span-2 btn btn-secondary">
          {i18n.t("read_more")}
        </Link>
      </div>
    </div>
  </div>
);

const AuthorBadge = ({ name }) => (
  <div className="badge bg-neutral-700">
    <code>@</code>
    <span className="ml-1 text-gray-300">{name}</span>
  </div>
);

export class News extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <NewsCards />
      </div>
    );
  }
}
