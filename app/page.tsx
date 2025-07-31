"use client";

import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Warm Orange Glow Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top center,
          rgba(255, 140, 60, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 min-h-screen w-full px-6 pt-10 lg:px-80">
        <div>
          <span className="font-Gabarito text-2xl font-semibold">
            Expirymate
          </span>
        </div>
        <div className="flex h-full flex-col items-center justify-center pt-24 text-center lg:pt-32">
          <h1 className="font-Outfit text-3xl font-extrabold lg:text-7xl/18">
            We Remember, <br />
            So You Don’t Have To.
          </h1>
          <h3 className="font-Zain mt-6 text-xl/5 lg:mt-3 lg:text-2xl">
            From coupons to insurance, never miss a date again. we’ll remind you
            automatically.
          </h3>
          <Button
            variant="default"
            className="mt-8 rounded-2xl text-xl font-semibold lg:p-6 lg:text-2xl"
          >
            Try It Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
