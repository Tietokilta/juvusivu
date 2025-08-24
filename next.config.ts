import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig);
