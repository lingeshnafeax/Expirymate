import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
};
const withNextIntl = createNextIntlPlugin("./lib/i8n.ts");
export default withNextIntl(nextConfig);
