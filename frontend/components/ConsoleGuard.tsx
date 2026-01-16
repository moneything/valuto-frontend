"use client";

import { useEffect } from "react";

export default function ConsoleGuard() {
  useEffect(() => {
    // Intentionally no-op: keep console logs available in production for debugging.
  }, []);

  return null;
}
