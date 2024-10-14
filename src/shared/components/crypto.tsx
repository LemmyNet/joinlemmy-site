import { Helmet } from "inferno-helmet";
import { Badge } from "./common";
import { Component } from "inferno";
import * as QRCode from "qrcode";
import { Icon } from "./icon";

const title = "Crypto";

interface Cryptos {
  name: string;
  address: string;
}

const CRYPTOS: Cryptos[] = [
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
];

const QrModal = ({ name, imgData }) => (
  <dialog id={`qr-modal-${name}`} className="modal">
    <form method="dialog" className="modal-backdrop">
      <button>X</button>
    </form>
    <div className="modal-box bg-neutral-800 w-auto">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div className="container mx-auto">
        <img className="w-auto" src={imgData} alt="" />
      </div>
    </div>
  </dialog>
);

interface State {
  cryptoQr: Map<string, string>;
}

export class Crypto extends Component<any, State> {
  state = { cryptoQr: new Map() };
  constructor(props: any, context: any) {
    super(props, context);
  }

  async componentDidMount() {
    const cryptoQr = new Map<string, string>();
    for (const c of CRYPTOS) {
      cryptoQr.set(c.name, await QRCode.toDataURL(c.address));
    }
    this.setState({ cryptoQr });
  }

  render() {
    return (
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        {Array.from(this.state.cryptoQr.entries()).map(e => (
          <QrModal name={e[0]} imgData={e[1]} />
        ))}

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
                  <td>
                    <button
                      className="btn btn-ghost"
                      onClick={() =>
                        (
                          document.getElementById(`qr-modal-${c.name}`) as any
                        ).showModal()
                      }
                    >
                      <Icon icon="qr_code" />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
