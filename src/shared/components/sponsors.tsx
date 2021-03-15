import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { DonateLines } from "./donate-lines";

const title = "Lemmy - Sponsors";

interface LinkedSponsor {
  name: string;
  link: string;
}

let silverSponsors: LinkedSponsor[] = [
  { name: "RedJoker", link: "https://iww.org" },
];
let highlightedSponsors = ["DQW", "Alex Benishek"];
let sponsors = [
  "seahorse",
  "Tommaso",
  "Jamie Gray",
  "Brendan",
  "mexicanhalloween",
  "William Moore",
  "Rachel Schmitz",
  "comradeda",
  "Jonathan Cremin",
  "Arthur Nieuwland",
  "Forrest Weghorst",
  "Andre Vallestero",
];

export class Sponsors extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <div class="text-center">
            <h1>Donate to Lemmy</h1>
            <DonateLines />
          </div>

          <hr />

          <div class="text-center">
            <h2>Sponsors</h2>
            <p>Silver Sponsors are those that pledged $40 to Lemmy.</p>
            <div class="row is-horizontal-align">
              {silverSponsors.map(s => (
                <div class="col">
                  <a class="button outline primary" href={s.link}>
                    💎 {s.name}
                  </a>
                </div>
              ))}
            </div>
            <br />
            <p>General Sponsors are those that pledged $10 to $39 to Lemmy.</p>
            <div class="row is-horizontal-align">
              {highlightedSponsors.map(s => (
                <div class="col">
                  <div class="button outline primary">{s}</div>
                </div>
              ))}
              {sponsors.map(s => (
                <div class="col">
                  <div class="button outline">{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div class="text-center">
            <h1>Crypto</h1>
            <table>
              <tr>
                <td>bitcoin</td>
                <td>
                  <code>1Hefs7miXS5ff5Ck5xvmjKjXf5242KzRtK</code>
                </td>
              </tr>
              <tr>
                <td>ethereum</td>
                <td>
                  <code>0x400c96c96acbC6E7B3B43B1dc1BB446540a88A01</code>
                </td>
              </tr>
              <tr>
                <td>monero</td>
                <td>
                  <code>
                    41taVyY6e1xApqKyMVDRVxJ76sPkfZhALLTjRvVKpaAh2pBd4wv9RgYj1tSPrx8wc6iE1uWUfjtQdTmTy2FGMeChGVKPQuV
                  </code>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
