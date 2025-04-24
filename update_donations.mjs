import fs from "fs";
import fetch from "node-fetch";

const donationStatsFile = "src/shared/donation_stats.ts";

const USDtoEURUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const liberaPayUrl = "https://liberapay.com/Lemmy/public.json";
const openCollectiveUrl = "https://opencollective.com/lemmy.json";

// This needs a `JOINLEMMY_PATREON_ACCESS_TOKEN` env var
const patreonUrl =
  "https://www.patreon.com/api/oauth2/api/current_user/campaigns";
const patreonToken = process.env["JOINLEMMY_PATREON_ACCESS_TOKEN"];

const usdToEurRes = await fetch(USDtoEURUrl);
const usdToEur = (await usdToEurRes.json()).usd.eur;

// In weekly USD
const liberaPayRes = await fetch(liberaPayUrl);
const liberaPayData = await liberaPayRes.json();

// In yearly USD, decimal
const openCollectiveRes = await fetch(openCollectiveUrl);
const openCollectiveData = await openCollectiveRes.json();

// In monthly USD, decimal
const patreonRes = await fetch(patreonUrl, {
  headers: { Authorization: `Bearer ${patreonToken}` },
});
const patreonData = await patreonRes.json();

const donationData = [
  {
    name_: "liberapay",
    patrons: liberaPayData.npatrons,
    amount: Number(liberaPayData.receiving.amount) * 4.348214 * usdToEur,
  },
  {
    name_: "opencollective",
    patrons: openCollectiveData.backersCount,
    amount: (Number(openCollectiveData.yearlyIncome) / 100 / 12) * usdToEur,
  },
  {
    name_: "patreon",
    patrons: patreonData.data[0].attributes.patron_count,
    amount:
      (Number(patreonData.data[0].attributes.pledge_sum) / 100) * usdToEur,
  },
];

let data = `export const donation_stats = \n `;
data += JSON.stringify(donationData, null, 2) + ";";
fs.writeFileSync(donationStatsFile, data);
