// frontend/app/subscribe/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";
import Button from "@/components/theme/Button";
import { useUserProfile } from "@/lib/userContext";

const includedFeatures = [
  "All lessons and interactive tools",
  "Games, calculators, and simulations",
  "Progress tracking across the platform",
];

export default function SubscribePage() {
  const { getToken } = useAuth();
  const router = useRouter();
  const { profile, loading } = useUserProfile();
  const [error, setError] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (profile && (profile.subscriptionStatus === "active" || profile.subscriptionStatus === "trialing")) {
      router.push("/dashboard");
    }
  }, [profile, loading, router]);

  const startCheckout = async () => {
    try {
      setError(null);
      setLoadingCheckout(true);
      const token = await getToken({ template: "default" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/billing/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to start checkout");
      if (data.alreadyActive) {
        router.push("/dashboard");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned from server");
    } catch (err: any) {
      setError(err.message || "Unable to start payment");
    } finally {
      setLoadingCheckout(false);
    }
  };

  const openBillingPortal = async () => {
    try {
      setError(null);
      setLoadingPortal(true);
      const token = await getToken({ template: "default" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/billing/portal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        const message =
          data?.message === "No Stripe customer found for this user."
            ? "No billing history associated with this account has been found."
            : data?.message || "Failed to open billing portal";
        throw new Error(message);
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || "Unable to open billing portal");
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <PageLayout
      title="Unlock Valuto"
      subtitle="Subscribe to continue into the platform."
      className="relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-72 w-72 rounded-full bg-valuto-green-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <Card className="overflow-hidden border-valuto-green-500/20 bg-[radial-gradient(circle_at_top_left,rgba(0,230,118,0.14),transparent_34%),linear-gradient(155deg,rgba(25,28,28,0.98),rgba(16,18,18,0.98))] p-0">
          <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <div className="inline-flex rounded-full border border-valuto-green-400/20 bg-valuto-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-valuto-green-200">
                Full access
              </div>

              <div className="mt-6">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-white">£1</span>
                  <span className="pb-2 text-base text-[#b9bbbe]">/ month</span>
                </div>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#b9bbbe]">
                  One plan. Everything unlocked.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {includedFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-[#d9dbde]">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-valuto-green-400/15 text-valuto-green-200">
                      ✓
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 px-6 py-8 sm:px-8 sm:py-10 md:border-l md:border-t-0 self-center">
              <Button onClick={startCheckout} disabled={loadingCheckout} className="w-full !rounded-2xl !py-4 text-base">
                {loadingCheckout ? "Redirecting to Stripe..." : "Subscribe now"}
              </Button>

              <p className="mt-4 text-center text-sm text-[#9a9a9d]">
                Secure checkout with Stripe.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center">
                <p className="text-sm text-[#d9dbde] justify-self-center">Already subscribed?</p>
                <button
                  type="button"
                  onClick={openBillingPortal}
                  disabled={loadingPortal}
                  className="mt-2 text-sm font-medium text-valuto-green-300 transition-colors hover:text-valuto-green-200 disabled:opacity-50 justify-self-center"
                >
                  {loadingPortal ? "Opening billing..." : "Manage billing"}
                </button>
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="relative mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-[#9a9a9d]">
        By subscribing, you agree to our{" "}
        <Link href="/privacy-policy" className="text-valuto-green-300 underline decoration-valuto-green-500/40 underline-offset-4 transition-colors hover:text-valuto-green-200">
          Privacy Policy
        </Link>
        {" "}and{" "}
        <Link href="/terms-and-conditions" className="text-valuto-green-300 underline decoration-valuto-green-500/40 underline-offset-4 transition-colors hover:text-valuto-green-200">
          Terms & Conditions
        </Link>
        .
      </div>
    </PageLayout>
  );
}
