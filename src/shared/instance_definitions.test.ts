// @ts-nocheck
jest.setTimeout(180000);
import { INSTANCE_METADATA } from "./components/instances-definitions";

test.skip("Recommended instances are reachable", async () => {
  for (const i of INSTANCE_METADATA) {
    try {
      const res = await fetch(`https://${i.domain}/nodeinfo/2.1`);
      if (res.status !== 200) {
        console.log(`${i.domain} returned status ${res.status}`);
      }
    } catch (error) {
      console.log(`${error} threw ${i.domain}`);
    }
  }
});
