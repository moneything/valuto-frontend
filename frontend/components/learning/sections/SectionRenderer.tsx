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
    | "comparison";
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
            <div>
              {tips.length > 0 ? (
                <ul className="list-disc list-inside text-md text-gray-800 space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
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
          <SectionIcon
            name={section.icon || "AlertTriangle"}
            className={`w-5 h-5 ${scheme.text}`}
          />
          <span>{section.title}</span>
        </CardTitle>
        {section.content && (
          <CardDescription>{section.content}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={`rounded-2xl border ${scheme.border} ${scheme.bg} p-4 md:p-5`}
        >
          <ul className="list-disc list-inside text-md text-gray-800 space-y-1">
            {warnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
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

  const rows: { label: string; value: string }[] =
    section.metadata?.comparisonTable || [];

  if (variant === "gridCards") {
    // Matches 50/30/20-style comparison blocks
    const columns: Array<{
      title: string; // e.g. "50%"
      subtitle?: string; // e.g. "NEEDS"
      description?: string;
      color?: "green" | "blue" | "purple" | "yellow";
    }> = section.metadata?.columns || [];

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
            {columns.map((col, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border ${bgFor(col.color)}`}
              >
                <h3
                  className={`text-xl font-bold mb-1 ${titleColorFor(
                    col.color
                  )}`}
                >
                  {col.title}
                </h3>
                {col.subtitle && (
                  <h4
                    className={`font-semibold mb-1 uppercase text-xs tracking-wide ${subtitleColorFor(
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

          {section.metadata?.exampleList && Array.isArray(section.metadata.exampleList) && (
          <div className="mt-4 p-4 bg-accent rounded-lg">
            <h4 className="font-semibold mb-2">
              {section.metadata.exampleTitle || "Example"}
            </h4>
            <ul className="space-y-1 text-md">
              {section.metadata.exampleList.map((item: string, idx: number) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {!section.metadata?.exampleList && section.metadata?.example && (
          <div className="mt-4 p-4 bg-accent rounded-lg">
            {section.metadata.exampleTitle && (
              <h4 className="font-semibold mb-2">
                {section.metadata.exampleTitle}
              </h4>
            )}
            <p className="text-md">
              {section.metadata.example as string}
            </p>
          </div>
        )}
        </CardContent>
      </Card>
    );
  }

  // Fallback simple comparison grid (not heavily used yet)
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
          {rows.map((row, i) => (
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
