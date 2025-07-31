import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    authInterrupts: true,
  },
};
const withNextIntl = createNextIntlPlugin("./lib/i8n.ts");
export default withNextIntl(nextConfig);
