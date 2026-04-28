"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useUserProfile } from "@/lib/userContext";
import { hasActiveSubscription, isSubscriptionExemptPath } from "@/lib/subscriptionAccess";

export default function SubscriptionGate() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { profile, loading } = useUserProfile();

  useEffect(() => {
    if (!isLoaded || loading || !isSignedIn) return;
    if (isSubscriptionExemptPath(pathname)) return;

    if (profile == null || profile.completedOnboarding === false) {
      router.replace("/onboarding");
      return;
    }

    if (!hasActiveSubscription(profile.subscriptionStatus)) {
      router.replace("/subscribe");
    }
  }, [isLoaded, isSignedIn, loading, pathname, profile, router]);

  return null;
}
