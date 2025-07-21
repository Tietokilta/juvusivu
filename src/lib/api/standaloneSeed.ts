import { getPayload } from "payload";
import configPromise from "@payload-config";
import { seed } from "./seed";

const payload = await getPayload({ config: configPromise });
await seed(payload, true);
process.exit(0);
