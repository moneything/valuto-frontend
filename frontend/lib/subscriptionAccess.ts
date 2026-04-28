import { LearningModule } from "@/lib/api/learningModules";
import { UserProfile } from "@/lib/localStorage";

type SubscriptionStatus = UserProfile["subscriptionStatus"];

const PUBLIC_MARKETING_PATHS = [
  "/",
  "/about",
  "/contact",
  "/features",
  "/pricing",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;

const SUBSCRIPTION_EXEMPT_PATHS = [
  "/auth",
  "/sign-in",
  "/sign-up",
  "/onboarding",
  "/subscribe",
] as const;

export function hasActiveSubscription(status?: SubscriptionStatus): boolean {
  return status === "active" || status === "trialing";
}

function matchesPathPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isPublicMarketingPath(pathname: string): boolean {
  return PUBLIC_MARKETING_PATHS.some((path) => matchesPathPrefix(pathname, path));
}

export function isSubscriptionExemptPath(pathname: string): boolean {
  return (
    isPublicMarketingPath(pathname) ||
    SUBSCRIPTION_EXEMPT_PATHS.some((path) => matchesPathPrefix(pathname, path))
  );
}

export function sortLearningModulesForAccess(
  a: Pick<LearningModule, "order" | "title">,
  b: Pick<LearningModule, "order" | "title">
): number {
  const orderDiff = (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
  if (orderDiff !== 0) return orderDiff;
  return a.title.localeCompare(b.title);
}

export function getFirstModuleTopicInCategory(
  categoryModules: Array<Pick<LearningModule, "topic" | "order" | "title">>
): string | null {
  if (!categoryModules.length) return null;
  const sorted = [...categoryModules].sort(sortLearningModulesForAccess);
  return sorted[0]?.topic ?? null;
}

export function isFreeLearningModule(
  allModules: LearningModule[],
  moduleTopic: string,
  categoryId: string
): boolean {
  const modulesInCategory = allModules.filter((mod) => mod.categoryId === categoryId);
  const freeTopic = getFirstModuleTopicInCategory(modulesInCategory);
  return freeTopic === moduleTopic;
}
