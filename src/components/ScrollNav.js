"use client";

import { useScrollNavigation } from "@/lib/scrollNavigation";

export default function ScrollNav() {
  // This component simply uses the hook
  // The hook handles all the navigation logic
  useScrollNavigation();

  // No visible UI is returned
  return null;
}
