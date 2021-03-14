import { Component } from "inferno";
import { Helmet } from "inferno-helmet";

const title = "Lemmy - Sponsors";

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
  <p>Lemmy is free, open-source software, meaning no advertising, monetizing, or venture capital, ever. <a href="/sponsors">Your donations</a> directly support full-time development of the project.
  </p>
  <div class="row is-horizontal-align">
    <div class="col-3">
      <a class="button primary" href="https://liberapay.com/Lemmy">Support on Liberapay</a>
    </div>
    <div class="col-3">
      <a class="button primary" href="https://www.patreon.com/dessalines">Support on Patreon</a>
    </div>
    <div class="col-3">
      <a class="col button primary" href="https://opencollective.com/lemmy">Support on OpenCollective</a>
    </div>
  </div>
</div>

<hr />

<div class="text-center">
  <h2>Sponsors</h2>
  <p>Silver Sponsors are those that pledged $40 to Lemmy.</p>
  <div class="row is-horizontal-align">
    <div class="col">
      <a class="button outline primary" href="https://iww.org/">💎 RedJoker</a>
    </div>
  </div>
  <br />
  <p>General Sponsors are those that pledged $10 to $39 to Lemmy.</p>
  <div class="row is-horizontal-align">
    <div class="col">
      <div class="button outline primary">DQW</div>
    </div>
    <div class="col">
      <div class="button outline primary">Alex Benishek</div>
    </div>
    <div class="col">
      <div class="button outline">seahorse</div>
    </div>
    <div class="col">
      <div class="button outline">Tommaso</div>
    </div>
    <div class="col">
      <div class="button outline">Jamie Gray</div>
    </div>
    <div class="col">
      <div class="button outline">Brendan</div>
    </div>
    <div class="col">
      <div class="button outline">mexicanhalloween</div>
    </div>
    <div class="col">
      <div class="button outline">William Moore</div>
    </div>
    <div class="col">
      <div class="button outline">Rachel Schmitz</div>
    </div>
    <div class="col">
      <div class="button outline">comradeda</div>
    </div>
    <div class="col">
      <div class="button outline">Jonathan Cremin</div>
    </div>
    <div class="col">
      <div class="button outline">Arthur Nieuwland</div>
    </div>
    <div class="col">
      <div class="button outline">Forrest Weghorst</div>
    </div>
    <div class="col">
      <div class="button outline">Andre Vallestero</div>
    </div>
  </div>
</div>

<div class="text-center">
  <h1>Crypto</h1>
    <table>
      <tr><td>bitcoin</td><td><code>1Hefs7miXS5ff5Ck5xvmjKjXf5242KzRtK</code></td></tr>
      <tr><td>ethereum</td><td><code>0x400c96c96acbC6E7B3B43B1dc1BB446540a88A01</code></td></tr>
      <tr><td>monero</td><td><code>41taVyY6e1xApqKyMVDRVxJ76sPkfZhALLTjRvVKpaAh2pBd4wv9RgYj1tSPrx8wc6iE1uWUfjtQdTmTy2FGMeChGVKPQuV</code></td></tr>
    </table>
</div>
</div>
</div>
);
    }
}
