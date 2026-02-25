import { instance_stats } from "../shared/data/instance_stats";
import {
  INSTANCE_METADATA,
  SUGGESTED_INSTANCES,
  SuggestedInstancesType,
} from "../shared/data/instances-definitions";
import { sortRandom } from "../shared/utils";
import { open as Geolite_open, GeoIpDbName } from "geolite2-redist";
import maxmind, { CountryResponse } from "maxmind";
import { Request, Response } from "express";
import { Query } from "server";

const GeoDbReader = await Geolite_open(GeoIpDbName.Country, path =>
  maxmind.open<CountryResponse>(path),
);

export function suggested_instances(req: Request, res: Response): void {
  const ip = clientIp(req);
  // Check crawl results to exclude instances which are down
  const crawledInstances = instance_stats.stats.instance_details.map(
    i => i.domain,
  );
  const suggested: SuggestedInstancesType = Object.keys(
    SUGGESTED_INSTANCES,
  ).reduce((result, key) => {
    const filtered = SUGGESTED_INSTANCES[key].filter(i =>
      crawledInstances.includes(i),
    );
    if (filtered.length) {
      result[key] = filtered;
    }
    return result;
  }, {});

  let json: string;
  if (ip) {
    const lookup = GeoDbReader.get(ip);
    const country = lookup?.country?.iso_code;
    const continent = lookup?.continent?.code;

    if (country) {
      const forCountry: string[] = suggested[country];
      if (forCountry) {
        json = sortRandom(forCountry)[0];
      }
    } else if (continent) {
      const forContinent: string[] = suggested[continent];
      if (forContinent) {
        json = sortRandom(forContinent)[0];
      }
    }
  }

  // TODO: can also pick a suggested instance by language here
  json = sortRandom(suggested["fallback"])[0];

  res.json([json]);
}

export function all_instances(_req: Request, res: Response): void {
  const instances = new Map(
    instance_stats.stats.instance_details.map(i => [i.domain, i]),
  );
  const metadata = new Map(INSTANCE_METADATA.map(i => [i.domain, i]));
  const combined = {};

  // Merge instances and metadata together
  // https://codingtechroom.com/question/-join-two-maps-by-key-in-javascript
  for (const [key, value] of instances) {
    combined[key] = value;
  }
  for (const [key, value] of metadata) {
    if (combined[key]) {
      combined[key] = Object.assign({}, combined[key], value);
    } else {
      combined[key] = value;
    }
  }

  res.json(combined);
}

function clientIp(
  req: Request<object, object, object, Query>,
): string | undefined {
  const f = req.headers["x-forwarded-for"] as string;
  const s = req.socket.remoteAddress;
  return f ?? s;
}
