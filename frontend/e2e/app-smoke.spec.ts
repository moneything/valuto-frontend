import { test, expect } from "@playwright/test";

const hasAuthState = Boolean(process.env.PLAYWRIGHT_STORAGE_STATE);

test.describe("Valuto authenticated smoke flows", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !hasAuthState,
      "Set PLAYWRIGHT_STORAGE_STATE to a signed-in Clerk storage-state file before running these tests."
    );
    await page.goto("/dashboard");
  });

  test("dashboard loads", async ({ page }) => {
    await expect(page.getByText("Create Trivia Game")).toBeVisible();
    await expect(page.getByText("Build Your Life")).toBeVisible();
    await expect(page.getByText("Build Your Business")).toBeVisible();
  });

  test("onboarding page renders setup form", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.getByText("Welcome to Valuto")).toBeVisible();
    await expect(page.getByLabel("Full Name *")).toBeVisible();
    await expect(page.getByRole("button", { name: "Complete Setup" })).toBeVisible();
  });

  test("trivia create page loads", async ({ page }) => {
    await page.goto("/dashboard/trivia/create");
    await expect(page.getByText("Create Trivia Game")).toBeVisible();
  });

  test("challenges page loads", async ({ page }) => {
    await page.goto("/dashboard/challenges");
    await expect(page.getByText("Daily, Weekly and Monthly Challenges")).toBeVisible();
  });

  test("featured games pages load", async ({ page }) => {
    await page.goto("/dashboard/build-your-life");
    await expect(page.getByText("Build Your Life")).toBeVisible();

    await page.goto("/dashboard/build-your-business");
    await expect(page.getByText("Build Your Business")).toBeVisible();

    await page.goto("/dashboard/investment");
    await expect(page.getByText("Investment Simulation")).toBeVisible();
  });
});
