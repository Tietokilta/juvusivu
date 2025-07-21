import { getPayload } from "payload";
import config from "@payload-config";
import { seed } from "./seed";

const payload = await getPayload({ config });
await seed(payload, true);
process.exit(0);
