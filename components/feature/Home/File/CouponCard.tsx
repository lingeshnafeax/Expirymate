"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CouponCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center self-center w-full sm:w-fit sm:justify-end gap-x-2 rounded-lg border bg-muted/30 px-4 py-2  text-lg font-semibold tracking-wide relative pr-10">
        {code}
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-7 w-7 absolute right-2 top-1/2 -translate-y-1/2"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    
  );
};

export default CouponCode;