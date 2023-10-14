import { Helmet } from "inferno-helmet";
import { Badge } from "./common";

const title = "Crypto";

interface Crypto {
  name: string;
  address: string;
}

const CRYPTOS: Crypto[] = [
  {
    name: "bitcoin",
    address: "1Hefs7miXS5ff5Ck5xvmjKjXf5242KzRtK",
  },
  {
    name: "ethereum",
    address: "0x400c96c96acbC6E7B3B43B1dc1BB446540a88A01",
  },
  {
    name: "monero",
    address:
      "41taVyY6e1xApqKyMVDRVxJ76sPkfZhALLTjRvVKpaAh2pBd4wv9RgYj1tSPrx8wc6iE1uWUfjtQdTmTy2FGMeChGVKPQuV",
  },
  {
    name: "cardano",
    address:
      "addr1q858t89l2ym6xmrugjs0af9cslfwvnvsh2xxp6x4dcez7pf5tushkp4wl7zxfhm2djp6gq60dk4cmc7seaza5p3slx0sakjutm",
  },
];

export const Crypto = () => (
  <div className="container mx-auto px-4">
    <Helmet title={title}>
      <meta property={"title"} content={title} />
    </Helmet>
    <div className="pt-16 text-center text-4xl font-bold mb-8">{title}</div>
    <div className="card card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body p-4">
        <table className="table table-sm">
          {CRYPTOS.map(c => (
            <tr>
              <td className="text-sm text-gray-300">{c.name}</td>
              <td>
                <Badge
                  content={
                    <code className="text-sm text-secondary break-all">
                      {c.address}
                    </code>
                  }
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  </div>
);
