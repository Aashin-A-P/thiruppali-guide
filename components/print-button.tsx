"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-maroon/90"
    >
      <Printer className="h-4 w-4" />
      அச்சிடு
    </button>
  );
}
