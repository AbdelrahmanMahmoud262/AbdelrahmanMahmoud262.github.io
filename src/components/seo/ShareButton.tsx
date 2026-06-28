"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

/**
 * ShareButton — Client Component to copy the current page link to the clipboard.
 * Features a visual feedback state (checkmark icon) when copy is successful.
 */
export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined" || !navigator.clipboard) return;
    
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
      aria-label="Share article link"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-accent-android" />
          <span className="text-accent-android">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Share Article</span>
        </>
      )}
    </button>
  );
}
