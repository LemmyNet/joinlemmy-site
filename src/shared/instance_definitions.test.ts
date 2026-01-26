// @ts-nocheck
jest.setTimeout(180000);
import { RECOMMENDED_INSTANCES } from "./components/instances-definitions";

test.skip("Recommended instances are reachable", async () => {
  for (const i of RECOMMENDED_INSTANCES) {
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
