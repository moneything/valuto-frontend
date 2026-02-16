import { LearningModule } from "@/lib/api/learningModules";
import { UserProfile } from "@/lib/localStorage";

type SubscriptionStatus = UserProfile["subscriptionStatus"];

export function hasActiveSubscription(status?: SubscriptionStatus): boolean {
  return status === "active" || status === "trialing";
}

export function isFreeDashboardPath(pathname: string): boolean {
  if (pathname === "/dashboard") return true;
  if (pathname === "/dashboard/calculator") return true;
  if (pathname === "/dashboard/learning-modules") return true;
  if (pathname.startsWith("/dashboard/learning-modules/")) return true;
  return false;
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
