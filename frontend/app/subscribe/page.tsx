// frontend/app/subscribe/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/theme/PageLayout";
import Card from "@/components/theme/Card";
import Button from "@/components/theme/Button";
import { useUserProfile } from "@/lib/userContext";

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
      if (!res.ok) throw new Error(data?.message || "Failed to open billing portal");
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
    <PageLayout title="Unlock Valuto" subtitle="Subscribe to access your dashboard and interactive learning tools">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-3">Full Dashboard Access</h2>
          <p className="text-gray-600 mb-4">
            Get unlimited access to interactive learning modules, investment tools, trivia games, leaderboards, and classroom analytics.
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✔️ All dashboard features</li>
            <li>✔️ Unlimited quizzes and challenges</li>
            <li>✔️ Investment calculator and simulations</li>
            <li>✔️ Progress tracking and reports</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={startCheckout} disabled={loadingCheckout}>
              {loadingCheckout ? "Redirecting to Stripe..." : "Upgrade with Stripe"}
            </Button>
            <Button variant="secondary" onClick={openBillingPortal} disabled={loadingPortal}>
              {loadingPortal ? "Opening billing..." : "Manage billing"}
            </Button>
          </div>
          {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        </Card>

        <Card className="bg-valuto-green-50 border-valuto-green-100">
          <h3 className="text-xl font-semibold mb-2 text-valuto-green-800">Why subscribe?</h3>
          <p className="text-gray-700 mb-3">Secure checkout powered by Stripe. Cancel anytime.</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>✅ Safe payments</p>
            <p>✅ Instant access after payment</p>
            <p>✅ Email receipts and billing portal</p>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
