import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(withNextIntl(nextConfig));
