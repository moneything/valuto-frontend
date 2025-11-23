// components/learning/sections/SectionRenderer.tsx
"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ColorSchemeKey =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "teal"
  | "pink";

const COLOR_SCHEMES: Record<
  ColorSchemeKey,
  {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-800",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-800",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-800",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-800",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-800",
  },
};

const getColorScheme = (key?: string) => {
  if (!key) return COLOR_SCHEMES.blue;
  const k = key as ColorSchemeKey;
  return COLOR_SCHEMES[k] || COLOR_SCHEMES.blue;
};

type ContentSection = {
  id: string;
  type:
    | "header"
    | "explanation"
    | "steps"
    | "list"
    | "tip"
    | "warning"
    | "comparison"
    | "payslip"
    | "miniInfoGrid"
    | "payTypesStack";
  title: string;
  content?: string;
  icon?: string;
  colorScheme?: string;
  metadata?: any;
};

type SectionRendererProps = {
  section: ContentSection;
};

const SectionIcon: React.FC<{ name?: string; className?: string }> = ({
  name,
  className,
}) => {
  if (!name) return null;
  const Icon =
    (LucideIcons as any)[name] || (LucideIcons as any)["HelpCircle"] || null;
  if (!Icon) return null;
  return <Icon className={className} />;
};

/* ------------------------------------------------------------------ */
/*                                HEADER                              */
/* ------------------------------------------------------------------ */

const HeaderSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  // Simple non-card header section (rarely used; acts like a sub-heading)
  const scheme = getColorScheme(section.colorScheme);

  return (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        {section.icon && (
          <div
            className={`rounded-xl p-2 ${scheme.badgeBg} flex items-center justify-center`}
          >
            <SectionIcon
              name={section.icon}
              className={`w-5 h-5 ${scheme.text}`}
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {section.title}
          </h2>
          {section.content && (
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*                             EXPLANATION                            */
/* ------------------------------------------------------------------ */

const ExplanationSection: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const scheme = getColorScheme(section.colorScheme);
  const variant: string = section.metadata?.variant || "default";

  const examples: string[] =
    section.metadata?.examples?.map((e: any) =>
      typeof e === "string" ? e : e.value || e.label
    ) || [];

  /* ---------------- VARIANT: INFO (Budgeting Basics) ---------------- */
  if (variant === "info") {
    // Matches: BudgetingBasics "What is a Budget?" style
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className={`h-5 w-5 ${scheme.text}`}
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
          {section.metadata?.description && (
            <CardDescription>{section.metadata.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {section.content && (
            <p className="text-lg text-gray-800 leading-relaxed">
              {section.content}
            </p>
          )}

          {(section.metadata?.highlight ||
            section.metadata?.highlightTitle ||
            section.metadata?.highlightText) && (
            <div className="bg-primary/10 p-4 rounded-lg">
              {section.metadata?.highlightTitle && (
                <p className="font-semibold mb-1">
                  {section.metadata.highlightTitle}
                </p>
              )}
              <p className="text-md">
                {section.metadata?.highlightText || section.metadata?.highlight}
              </p>
            </div>
          )}

          {examples.length > 0 && (
            <div
              className={`mt-2 p-4 rounded-lg border ${scheme.border} ${scheme.bg}`}
            >
              <p className={`text-md font-semibold mb-2 ${scheme.text}`}>
                Examples:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-800 space-y-1">
                {examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  /* ---------------- VARIANT: gradientInfoTwoColumn (Apprenticeships) ------- */
  if (variant === "gradientInfoTwoColumn") {
    const heading: string | undefined = section.metadata?.heading;
    const description: string | undefined = section.metadata?.description;
    const columns: Array<{
      title: string;
      color?: "green" | "blue" | "purple" | "orange";
      items: string[];
    }> = section.metadata?.columns || [];

    const titleColorFor = (c?: string) => {
      if (c === "green") return "text-green-700";
      if (c === "blue") return "text-blue-700";
      if (c === "purple") return "text-purple-700";
      if (c === "orange") return "text-orange-700";
      return "text-gray-900";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className={`h-5 w-5 ${scheme.text}`}
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg space-y-4">
            {heading && <h3 className="text-xl font-bold">{heading}</h3>}
            {description && (
              <p className="text-md text-gray-800 leading-relaxed">
                {description}
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {columns.map((col, idx) => (
                <div key={idx}>
                  <h4 className={`font-semibold mb-2 ${titleColorFor(col.color)}`}>
                    {col.title}
                  </h4>
                  <ul className="space-y-1 text-md text-gray-800">
                    {col.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------------- VARIANT: introThreeCards (Why Save Money?) ------ */
  if (variant === "introThreeCards") {
    const cards: Array<{
      title: string;
      emoji?: string;
      color?: "blue" | "green" | "purple";
      description: string;
    }> = section.metadata?.cards || [];

    const bgFor = (c?: string) => {
      if (c === "blue") return "bg-blue-50";
      if (c === "green") return "bg-green-50";
      if (c === "purple") return "bg-purple-50";
      return "bg-gray-50";
    };

    const titleColorFor = (c?: string) => {
      if (c === "blue") return "text-blue-700";
      if (c === "green") return "text-green-700";
      if (c === "purple") return "text-purple-700";
      return "text-gray-800";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className={`h-5 w-5 ${scheme.text}`}
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {section.content && (
            <p className="text-lg text-gray-800 leading-relaxed">
              {section.content}
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`${bgFor(
                  card.color
                )} p-4 rounded-lg h-full flex flex-col`}
              >
                <h4 className={`font-semibold mb-1 ${titleColorFor(card.color)}`}>
                  {card.emoji ? `${card.emoji} ${card.title}` : card.title}
                </h4>
                <p className="text-md text-gray-800">{card.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------------- VARIANT: featureWithList (Pay Yourself First) --- */
  if (variant === "featureWithList") {
    const feature = section.metadata?.featureBox as
      | { title: string; text: string }
      | undefined;
    const listTitle: string | undefined = section.metadata?.listTitle;
    const listItems: string[] = section.metadata?.listItems || [];
    const proTipTitle: string | undefined = section.metadata?.proTipTitle;
    const proTipText: string | undefined = section.metadata?.proTipText;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className={`h-5 w-5 ${scheme.text}`}
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feature && (
            <div className="bg-primary/10 p-6 rounded-lg mb-2">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-lg">{feature.text}</p>
            </div>
          )}

          {listTitle && (
            <h4 className="font-semibold text-gray-900">{listTitle}</h4>
          )}

          {listItems.length > 0 && (
            <ol className="space-y-2 list-decimal list-inside text-md text-gray-900">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )}

          {(proTipTitle || proTipText) && (
            <div className="mt-4 p-4 bg-accent rounded-lg">
              {proTipTitle && (
                <p className="font-semibold mb-1">{proTipTitle}</p>
              )}
              {proTipText && <p>{proTipText}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  /* ---------------- VARIANT: emergencyFund layout ------------------- */
  if (variant === "emergencyFund") {
    const emergencyTitle: string | undefined = section.metadata?.emergencyTitle;
    const emergencyItems: string[] = section.metadata?.emergencyItems || [];

    const amountBlocks: Array<{
      label: string;
      value: string;
      color?: "green" | "blue";
    }> = section.metadata?.amountBlocks || [];

    const whereTitle: string | undefined = section.metadata?.whereTitle;
    const whereItems: string[] = section.metadata?.whereItems || [];

    const amountBg = (c?: string) => {
      if (c === "green") return "bg-green-50";
      if (c === "blue") return "bg-blue-50";
      return "bg-gray-50";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className={`h-5 w-5 ${scheme.text}`}
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {section.content && (
            <p className="text-gray-800 leading-relaxed">{section.content}</p>
          )}

          {emergencyItems.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              {emergencyTitle && (
                <h4 className="font-semibold text-red-700">
                  {emergencyTitle}
                </h4>
              )}
              <ul className="mt-2 space-y-1 text-md text-red-800">
                {emergencyItems.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">How much to save:</h4>
              <div className="space-y-2">
                {amountBlocks.map((block, i) => (
                  <div
                    key={i}
                    className={`flex justify-between p-2 rounded ${amountBg(
                      block.color
                    )}`}
                  >
                    <span>{block.label}</span>
                    <span className="font-semibold">{block.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {whereTitle && (
                <h4 className="font-semibold text-gray-900">{whereTitle}</h4>
              )}
              <ul className="space-y-1 text-md text-gray-800">
                {whereItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------------- VARIANT: smartGoals (SMART + horizons) ---------- */
  if (variant === "smartGoals") {
    const smartTitle: string | undefined = section.metadata?.smartTitle;
    const smartItems: Array<{
      letter: string;
      color?: "blue" | "green" | "orange" | "red" | "purple";
      text: string;
    }> = section.metadata?.smartItems || [];

    const horizonsTitle: string | undefined = section.metadata?.horizonsTitle;
    const horizons: Array<{
      title: string;
      color?: "green" | "blue" | "purple";
      text: string;
    }> = section.metadata?.horizons || [];

    const letterColor = (c?: string) => {
      if (c === "blue") return "text-blue-600";
      if (c === "green") return "text-green-600";
      if (c === "orange") return "text-orange-600";
      if (c === "red") return "text-red-600";
      if (c === "purple") return "text-purple-600";
      return "text-gray-800";
    };

    const horizonBg = (c?: string) => {
      if (c === "green") return "bg-green-50";
      if (c === "blue") return "bg-blue-50";
      if (c === "purple") return "bg-purple-50";
      return "bg-gray-50";
    };

    const horizonTitleColor = (c?: string) => {
      if (c === "green") return "text-green-700";
      if (c === "blue") return "text-blue-700";
      if (c === "purple") return "text-purple-700";
      return "text-gray-900";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {section.content && (
            <p className="text-gray-800 leading-relaxed">{section.content}</p>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg space-y-3">
            {smartTitle && (
              <h4 className="font-bold text-xl mb-2">{smartTitle}</h4>
            )}
            <div className="grid gap-3 text-lg">
              {smartItems.map((item, i) => (
                <div key={i}>
                  <span className={`font-semibold ${letterColor(item.color)}`}>
                    {item.letter}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {horizons.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              {horizons.map((h, i) => (
                <div
                  key={i}
                  className={`text-center p-4 rounded-lg ${horizonBg(
                    h.color
                  )}`}
                >
                  <h5
                    className={`font-semibold ${horizonTitleColor(h.color)}`}
                  >
                    {h.title}
                  </h5>
                  <p className="text-md mt-1 text-gray-800">{h.text}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  /* ---------------- VARIANT: actionPlan (Ready to Start Saving?) ---- */
  if (variant === "actionPlan") {
    const boxTitle: string | undefined = section.metadata?.boxTitle;
    const steps: string[] = section.metadata?.steps || [];

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="bg-primary/10 p-4 rounded-lg">
            {boxTitle && (
              <h4 className="font-semibold mb-2 text-gray-900">
                {boxTitle}
              </h4>
            )}
            <ol className="space-y-1 text-md list-decimal list-inside text-gray-900">
              {steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    );
  }


  /* ---------------- DEFAULT EXPLANATION ----------------------------- */

  // default explanation = generic "info card" like many sections in Banking/other lessons
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {section.icon && (
            <SectionIcon
              name={section.icon}
              className={`h-5 w-5 ${scheme.text}`}
            />
          )}
          <span>{section.title}</span>
        </CardTitle>
        {section.metadata?.description && (
          <CardDescription>{section.metadata.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {section.content && (
          <p className="text-gray-800 leading-relaxed">{section.content}</p>
        )}

        {examples.length > 0 && (
          <div
            className={`mt-2 p-4 rounded-lg border ${scheme.border} ${scheme.bg}`}
          >
            <p className={`text-md font-semibold mb-2 ${scheme.text}`}>
              Examples:
            </p>
            <ul className="list-disc list-inside text-md text-gray-800 space-y-1">
              {examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                                STEPS                               */
/* ------------------------------------------------------------------ */

const StepsSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme);
  const variant: string = section.metadata?.variant || "default";

  const steps: { number?: number; text: string; description?: string }[] =
    section.metadata?.steps || [];

  // Only "default" variant used so far (BudgetingBasics / SavingStrategies)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {section.icon && (
            <SectionIcon
              name={section.icon}
              className={`h-5 w-5 ${scheme.text}`}
            />
          )}
          <span>{section.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {section.content && (
          <p className="text-gray-700 mb-4 leading-relaxed">
            {section.content}
          </p>
        )}

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div
                className={`bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold`}
              >
                {step.number ?? i + 1}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{step.text}</h4>
                {step.description && (
                  <p className="text-md text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                                 LIST                               */
/* ------------------------------------------------------------------ */

const ListSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme);
  const variant: string = section.metadata?.variant || "default";

  // Generic items (used by default + pastel)
  const items: string[] = section.metadata?.listItems || [];

  /* ---------- variant: hustleCardGrid (Side Hustles cards) ---------- */
  if (variant === "hustleCardGrid") {
    const hustles: Array<{
      title: string;
      emoji?: string;
      color?: "blue" | "green" | "purple" | "orange";
      description?: string;
      platformsLabel?: string; // e.g. "Platforms" or "Apps" or "Find clients"
      platforms?: string;      // e.g. "Tutor.com, Preply, Wyzant"
      pay?: string;            // e.g. "£10–20/hour"
      requirements?: string;   // e.g. "Good grades, patience"
      extra?: string;          // any extra note
    }> = section.metadata?.hustles || [];

    const titleColorFor = (c?: string) => {
      if (c === "blue") return "text-blue-600";
      if (c === "green") return "text-green-600";
      if (c === "purple") return "text-purple-600";
      if (c === "orange") return "text-orange-600";
      return "text-gray-900";
    };

    const borderFor = (c?: string) => {
      if (c === "blue") return "border-blue-200";
      if (c === "green") return "border-green-200";
      if (c === "purple") return "border-purple-200";
      if (c === "orange") return "border-orange-200";
      return "border-gray-200";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {hustles.map((hustle, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${borderFor(hustle.color)}`}
              >
                <h4
                  className={`font-semibold mb-2 flex items-center gap-1 ${titleColorFor(
                    hustle.color
                  )}`}
                >
                  {hustle.emoji && <span>{hustle.emoji}</span>}
                  <span>{hustle.title}</span>
                </h4>

                <div className="grid md:grid-cols-2 gap-4 text-md">
                  <div>
                    {hustle.description && (
                      <p className="mb-2">{hustle.description}</p>
                    )}

                    {hustle.platforms && (
                      <p className="text-md">
                        <strong>
                          {hustle.platformsLabel || "Platforms"}:
                        </strong>{" "}
                        {hustle.platforms}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-md">
                    {hustle.pay && (
                      <p>
                        <strong>Pay:</strong> {hustle.pay}
                      </p>
                    )}
                    {hustle.requirements && (
                      <p>
                        <strong>Requirements:</strong> {hustle.requirements}
                      </p>
                    )}
                    {hustle.extra && (
                      <p className="text-md text-muted-foreground">
                        {hustle.extra}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: accountFeatureCards (Banking 101) ---------- */
  if (variant === "accountFeatureCards") {
    const cards: Array<{
      title: string;
      subtitle?: string;
      color: "blue" | "green";
      emoji?: string;
      items: string[];
    }> = section.metadata?.cards || [];

    const bgFor = (c: string) =>
      c === "blue"
        ? "bg-blue-50 border-blue-200"
        : c === "green"
        ? "bg-green-50 border-green-200"
        : "bg-gray-50 border-gray-300";

    const titleColorFor = (c: string) =>
      c === "blue"
        ? "text-blue-700"
        : c === "green"
        ? "text-green-700"
        : "text-gray-900";

    const subtitleColorFor = (c: string) =>
      c === "blue"
        ? "text-blue-600"
        : c === "green"
        ? "text-green-600"
        : "text-gray-700";

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((c, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg border ${bgFor(c.color)}`}
              >
                <h3 className={`text-xl font-bold mb-2 ${titleColorFor(c.color)}`}>
                  {c.emoji ? `${c.emoji} ` : ""}
                  {c.title}
                </h3>

                {c.subtitle && (
                  <p className={`mb-3 text-md ${subtitleColorFor(c.color)}`}>
                    {c.subtitle}
                  </p>
                )}

                <ul className="space-y-2 text-md">
                  {c.items.map((i, j) => (
                    <li key={j}>• {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: percentListCards (stacked 35% / 30% / etc cards) ---------- */
  if (variant === "percentListCards") {
    const items = section.metadata?.items || [];

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && <CardDescription>{section.content}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ${item.bgColor}`}
                >
                  {item.percent}
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-md text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: bankListCards (Student Bank Accounts List) ---------- */
  if (variant === "bankListCards") {
    const cards: Array<{
      title: string;
      color: "blue" | "green" | "purple";
      items: string[];
    }> = section.metadata?.cards || [];

    const titleColorFor = (c: string) =>
      c === "blue"
        ? "text-blue-600"
        : c === "green"
        ? "text-green-600"
        : c === "purple"
        ? "text-purple-600"
        : "text-gray-900";

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {cards.map((c, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <h4
                  className={`font-semibold text-md ${titleColorFor(c.color)}`}
                >
                  {c.title}
                </h4>
                <ul className="text-md mt-2 space-y-1">
                  {c.items.map((item, j) => (
                    <li key={j}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: cardsStack (stacked card list, e.g. student bank accounts) ---------- */
  if (variant === "cardsStack") {
    const cards: Array<{
      title: string;
      color?: "blue" | "green" | "purple" | "yellow";
      items: string[];
    }> = section.metadata?.cards || [];

    const borderFor = (c?: string) => {
      if (c === "green") return "border-green-200";
      if (c === "purple") return "border-purple-200";
      if (c === "yellow") return "border-yellow-200";
      return "border-blue-200";
    };

    const titleColorFor = (c?: string) => {
      if (c === "green") return "text-green-600";
      if (c === "purple") return "text-purple-600";
      if (c === "yellow") return "text-purple-600";
      return "text-blue-600";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${borderFor(card.color)}`}
              >
                <h4 className={`font-semibold ${titleColorFor(card.color)}`}>
                  {card.title}
                </h4>
                <ul className="text-md mt-2 space-y-1">
                  {card.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: twoColumn (e.g. Needs vs Wants) ---------- */
  if (variant === "twoColumn") {
    // Expect metadata.columns: [{ title, color, iconName, items[] }, ...]
    const columns: Array<{
      title: string;
      color?: "green" | "orange" | "blue" | "purple" | "red";
      iconName?: string;
      items: string[];
      prefixEmoji?: string;
    }> = section.metadata?.columns || [];

    const colorClass = (part: "title" | "icon", c?: string) => {
      if (!c) return part === "title" ? "text-gray-900" : "text-gray-500";
      if (c === "green")
        return part === "title" ? "text-green-600" : "text-green-500";
      if (c === "orange")
        return part === "title" ? "text-orange-600" : "text-orange-500";
      if (c === "blue")
        return part === "title" ? "text-blue-600" : "text-blue-500";
      if (c === "purple")
        return part === "title" ? "text-purple-600" : "text-purple-500";
      if (c === "red")
        return part === "title" ? "text-red-600" : "text-red-500";
      return part === "title" ? "text-gray-900" : "text-gray-500";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h3
                  className={`text-lg font-semibold ${colorClass(
                    "title",
                    col.color,
                  )}`}
                >
                  {col.title}
                </h3>
                <ul className="space-y-2 text-md">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {col.iconName ? (
                        <SectionIcon
                          name={col.iconName}
                          className={`h-4 w-4 ${colorClass(
                            "icon",
                            col.color,
                          )}`}
                        />
                      ) : (
                        <span className={colorClass("icon", col.color)}>•</span>
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: pastel (e.g. Quick Budgeting Tips) ---------- */
  if (variant === "pastel") {
    return (
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-md">
            {items.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: agencyGrid (Experian / Equifax / TransUnion boxes) ---------- */
  if (variant === "agencyGrid") {
    const agencies = section.metadata?.agencies || [];

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && <CardDescription>{section.content}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {agencies.map((ag: any, idx: number) => (
              <div
                key={idx}
                className={`text-center p-4 rounded-lg ${ag.bgColor}`}
              >
                <h4 className={`font-semibold ${ag.textColor}`}>{ag.name}</h4>
                <p className="text-md mt-1">{ag.description}</p>
              </div>
            ))}
          </div>

          {section.metadata?.tips && (
            <div className="mt-4 p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">💡 Pro Tips:</h4>
              <ul className="text-md space-y-1">
                {section.metadata.tips.map((tip: string, i: number) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }


  /* ---------- variant: danger (general red-warning card list) ---------- */
  if (variant === "danger") {
    // Think "warning-heavy list" – red-tinted card with list items
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className="h-5 w-5 text-red-600"
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <ul className="space-y-1 text-md text-red-800">
              {items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- variant: default (simple bullet list card) ---------- */

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {section.icon && (
            <SectionIcon
              name={section.icon}
              className={`h-5 w-5 ${scheme.text}`}
            />
          )}
          <span>{section.title}</span>
        </CardTitle>
        {section.content && (
          <CardDescription>{section.content}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={`rounded-xl border ${scheme.border} ${scheme.bg} p-4 text-md`}
        >
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                                  TIP                               */
/* ------------------------------------------------------------------ */

const TipSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme || "yellow");
  const variant: string = section.metadata?.variant || "lightbulb";

  const tips: string[] = section.metadata?.tips || [];

  // Only "lightbulb" used so far (SavingStrategies style)
  return (
    <Card>
      <CardHeader>
        <CardTitle>💡 {section.title}</CardTitle>
        {section.content && (
          <CardDescription>{section.content}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={`rounded-2xl border ${scheme.border} ${scheme.bg} p-4 md:p-5`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`rounded-full p-2 ${scheme.badgeBg} flex items-center justify-center`}
            >
              <SectionIcon
                name={section.icon || "Lightbulb"}
                className={`w-5 h-5 ${scheme.text}`}
              />
            </div>
            <div className="self-center">
              {tips.length > 1 ? (
                <ul className="list-disc list-inside text-md text-gray-800 space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              )
              : tips.length == 1 ? (
                <>
                  {tips.map((tip, i) => (
                    <p className="self-end">{tip}</p>
                  ))}
                </>
              ) 
              : 
              (
                section.content && (
                  <p className="text-md text-gray-800">{section.content}</p>
                )
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                                WARNING                             */
/* ------------------------------------------------------------------ */

const WarningSection: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const scheme = getColorScheme(section.colorScheme || "red");
  const warnings: string[] = section.metadata?.warnings || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {section.icon !== "none" && 
            <SectionIcon
              name={section.icon || "AlertTriangle"}
              className={`w-5 h-5  ${scheme.text}`}
            />
          }
          <span>{section.title}</span>
        </CardTitle>
        {section.content && (
          <CardDescription>{section.content}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {warnings.length !== 0 && 
          <div
            className={`rounded-2xl border ${scheme.border} ${scheme.bg} p-4 md:p-5`}
          >
            <ul className="list-disc list-inside text-md text-gray-800 space-y-1">
              {warnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        }
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                             COMPARISON                             */
/* ------------------------------------------------------------------ */

const ComparisonSection: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const scheme = getColorScheme(section.colorScheme || "blue");
  const variant: string = section.metadata?.variant || "gridCards";

  const rows = section.metadata?.comparisonTable || [];

  /* ============================================================
     VARIANT: gridCards (50/30/20 layout etc.)
  ============================================================ */
  if (variant === "gridCards") {
    const columns = section.metadata?.columns || [];

    const bgFor = (c?: string) => {
      if (c === "green") return "bg-green-50 border-green-200";
      if (c === "blue") return "bg-blue-50 border-blue-200";
      if (c === "purple") return "bg-purple-50 border-purple-200";
      if (c === "yellow") return "bg-yellow-50 border-yellow-200";
      return `${scheme.bg} ${scheme.border}`;
    };

    const titleColorFor = (c?: string) => {
      if (c === "green") return "text-green-700";
      if (c === "blue") return "text-blue-700";
      if (c === "purple") return "text-purple-700";
      if (c === "yellow") return "text-yellow-700";
      return scheme.text;
    };

    const subtitleColorFor = (c?: string) => {
      if (c === "green") return "text-green-600";
      if (c === "blue") return "text-blue-600";
      if (c === "purple") return "text-purple-600";
      if (c === "yellow") return "text-yellow-600";
      return "text-gray-700";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.icon && (
              <SectionIcon
                name={section.icon}
                className={`h-5 w-5 ${scheme.text}`}
              />
            )}
            <span>{section.title}</span>
          </CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {columns.map((col: any, i: number) => (
              <div
                key={i}
                className={`p-4 rounded-lg border ${bgFor(col.color)}`}
              >
                {col.title && (
                  <h3
                    className={`text-xl font-bold mb-1 ${titleColorFor(
                      col.color
                    )}`}
                  >
                    {col.title}
                  </h3>
                )}

                {col.subtitle && (
                  <h4
                    className={`font-semibold mb-1 uppercase text-md tracking-wide ${subtitleColorFor(
                      col.color
                    )}`}
                  >
                    {col.subtitle}
                  </h4>
                )}

                {col.description && (
                  <p className="text-md text-gray-800">{col.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Optional: example box */}
          {section.metadata?.exampleList && (
            <div className="mt-4 p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">
                {section.metadata.exampleTitle || "Example"}
              </h4>
              <ul className="space-y-1 text-md">
                {section.metadata.exampleList.map(
                  (item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {!section.metadata?.exampleList &&
            section.metadata?.example && (
              <div className="mt-4 p-4 bg-accent rounded-lg">
                {section.metadata.exampleTitle && (
                  <h4 className="font-semibold mb-2">
                    {section.metadata.exampleTitle}
                  </h4>
                )}
                <p className="text-md">{section.metadata.example}</p>
              </div>
            )}
        </CardContent>
      </Card>
    );
  }

  /* ============================================================
     VARIANT: scoreRangeGrid 
       - supports BOTH:
         A) { label, range }
         B) { label, score, description }
  ============================================================ */
  if (variant === "scoreRangeGrid") {
    const ranges = section.metadata?.ranges || [];

    const hasRichMode = ranges.some(
      (r: any) => r.score || r.description
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          {section.content && (
            <CardDescription>{section.content}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <div
            className={`grid ${
              hasRichMode ? "md:grid-cols-3" : "md:grid-cols-5"
            } gap-4`}
          >
            {ranges.map((r: any, idx: number) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${r.bgColor}`}
              >
                <h3 className={`text-xl font-bold ${r.textColor}`}>
                  {r.label}
                </h3>

                {/* MODE A — simple */}
                {r.range && !hasRichMode && (
                  <p className="mt-1 text-md">{r.range}</p>
                )}

                {/* MODE B — rich */}
                {hasRichMode && (
                  <>
                    {r.score && (
                      <p className="font-semibold text-md mt-1">{r.score}</p>
                    )}
                    {r.description && (
                      <p className="text-md mt-1 text-gray-800">
                        {r.description}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Optional note + list */}
          {section.metadata?.note && (
            <div className="mt-4 p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">
                {section.metadata.note.title}
              </h4>
              <ul className="space-y-1 text-md">
                {section.metadata.note.items.map(
                  (item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  /* ============================================================
     VARIANT: twoFeatureCards 
  ============================================================ */
  if (variant === "twoFeatureCards") {
    const cards = section.metadata?.cards || [];

    const bgFor = (c?: string) => {
      if (c === "green") return "bg-green-50 border-green-200";
      if (c === "purple") return "bg-purple-50 border-purple-200";
      if (c === "yellow") return "bg-yellow-50 border-yellow-200";
      return "bg-blue-50 border-blue-200";
    };

    const titleColorFor = (c?: string) => {
      if (c === "green") return "text-green-700";
      if (c === "purple") return "text-purple-700";
      if (c === "yellow") return "text-yellow-700";
      return "text-blue-700";
    };

    const subtitleColorFor = (c?: string) => {
      if (c === "green") return "text-green-600";
      if (c === "purple") return "text-purple-600";
      if (c === "yellow") return "text-yellow-600";
      return "text-blue-600";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 rounded-lg border ${bgFor(card.color)}`}
              >
                <h3
                  className={`text-xl font-bold mb-1 ${titleColorFor(
                    card.color
                  )}`}
                >
                  {card.title}
                </h3>

                {card.subtitle && (
                  <p className={`text-md mb-3 ${subtitleColorFor(card.color)}`}>
                    {card.subtitle}
                  </p>
                )}

                {card.bullets && (
                  <ul className="space-y-1 text-md text-gray-800">
                    {card.bullets.map((item: string, i: number) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ============================================================
     DEFAULT — fallback 2-column key-value comparison
  ============================================================ */
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SectionIcon
            name={section.icon || "Scale"}
            className={`w-5 h-5 ${scheme.text}`}
          />
          <span>{section.title}</span>
        </CardTitle>
        {section.content && (
          <CardDescription>{section.content}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {rows.map((row: any, i: number) => (
            <div
              key={i}
              className={`rounded-xl border ${scheme.border} ${scheme.bg} p-4`}
            >
              <p className={`text-md font-semibold mb-1 ${scheme.text}`}>
                {row.label}
              </p>
              <p className="text-md text-gray-800">{row.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


/* ------------------------------------------------------------------ */
/*                         PAYSLIP BLOCK (NEW)                        */
/* ------------------------------------------------------------------ */
const PayslipBlockSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  // All UI comes from metadata
  const data = section.metadata || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {section.icon && (
            <SectionIcon name={section.icon} className="h-5 w-5 text-gray-700" />
          )}
          <span>{section.title}</span>
        </CardTitle>
        {section.content && <CardDescription>{section.content}</CardDescription>}
      </CardHeader>

      <CardContent>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
          {data.header && (
            <h4 className="font-bold text-center mb-4">{data.header}</h4>
          )}

          {/* Top Rows */}
          <div className="space-y-3 text-md">
            {Array.isArray(data.summaryRows) &&
              data.summaryRows.map((row: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{row.left}</span>
                  <span>{row.right}</span>
                </div>
              ))}

            <hr />

            {/* Pay Breakdown */}
            {Array.isArray(data.breakdown) &&
              data.breakdown.map((row: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex justify-between ${
                    row.highlight ? "font-bold text-green-600" : ""
                  }`}
                >
                  <span>{row.left}</span>
                  <span>{row.right}</span>
                </div>
              ))}

            <hr />

            {/* Deductions */}
            {Array.isArray(data.deductions) &&
              data.deductions.map((row: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between text-red-600 text-md"
                >
                  <span>{row.left}</span>
                  <span>{row.right}</span>
                </div>
              ))}

            <hr />

            {/* Final Net Pay */}
            {data.netPay && (
              <div className="flex justify-between font-bold text-blue-600 text-lg">
                <span>{data.netPay.left}</span>
                <span>{data.netPay.right}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                      MINI INFO GRID (NEW)                          */
/* ------------------------------------------------------------------ */
const MiniInfoGridSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const items: Array<{
    title: string;
    description: string;
    color?: string; // e.g. "blue", "green", "purple"
  }> = section.metadata?.items || [];

  const colorClasses = (c?: string) => {
    switch (c) {
      case "blue":
        return "bg-blue-50 text-blue-700";
      case "green":
        return "bg-green-50 text-green-700";
      case "purple":
        return "bg-purple-50 text-purple-700";
      case "orange":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
        {section.content && <CardDescription>{section.content}</CardDescription>}
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`text-center p-4 rounded-lg ${colorClasses(item.color)}`}
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-md mt-1 text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*                     PAY TYPES STACK (NEW)                          */
/* ------------------------------------------------------------------ */
const PayTypesStackSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const items: Array<{
    title: string;
    color?: string; // blue, green, purple, orange
    description: string;
    footer?: string;
  }> = section.metadata?.items || [];

  const colorClasses = (c?: string) => {
    switch (c) {
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "purple":
        return "text-purple-600";
      case "orange":
        return "text-orange-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
        {section.content && <CardDescription>{section.content}</CardDescription>}
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {items.map((item, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <h4 className={`font-semibold ${colorClasses(item.color)}`}>
                {item.title}
              </h4>
              <p className="text-md mt-1">{item.description}</p>

              {item.footer && (
                <p className="text-md text-muted-foreground mt-1">
                  {item.footer}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};



/* ------------------------------------------------------------------ */
/*                           MAIN RENDERER                            */
/* ------------------------------------------------------------------ */

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  switch (section.type) {
    case "header":
      return <HeaderSection section={section} />;

    case "explanation":
      return <ExplanationSection section={section} />;

    case "steps":
      return <StepsSection section={section} />;

    case "list":
      return <ListSection section={section} />;

    case "tip":
      return <TipSection section={section} />;

    case "warning":
      return <WarningSection section={section} />;

    case "comparison":
      return <ComparisonSection section={section} />;

    case "miniInfoGrid":
      return <MiniInfoGridSection section={section} />;
    
    case "payslip":
      return <PayslipBlockSection section={section}/>;

    case "payTypesStack":
      return <PayTypesStackSection section={section}/>;

    default:
      // Very simple fallback block
      return (
        <Card>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.content && (
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            )}
          </CardContent>
        </Card>
      );
  }
};

export default SectionRenderer;
