// components/learning/sections/SectionRenderer.tsx
"use client";

import * as LucideIcons from "lucide-react";
import React from "react";

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
  { bg: string; border: string; text: string; badgeBg: string; badgeText: string }
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

/* ----- INDIVIDUAL SECTION TYPES ----- */

const HeaderSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme);
  return (
    <div className="mb-6">
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

const ExplanationSection: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const scheme = getColorScheme(section.colorScheme);
  const examples: string[] =
    section.metadata?.examples?.map((e: any) =>
      typeof e === "string" ? e : e.value || e.label
    ) || [];

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
        {section.icon && (
          <SectionIcon
            name={section.icon}
            className={`w-5 h-5 ${scheme.text}`}
          />
        )}
        <span>{section.title}</span>
      </h3>
      {section.content && (
        <p className="text-gray-700 leading-relaxed mb-3">{section.content}</p>
      )}

      {examples.length > 0 && (
        <div
          className={`mt-2 p-4 rounded-xl border ${scheme.border} ${scheme.bg}`}
        >
          <p className={`text-sm font-semibold mb-2 ${scheme.text}`}>
            Examples:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            {examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const StepsSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme);
  const steps: { number?: number; text: string; description?: string }[] =
    section.metadata?.steps || [];

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
        {section.icon && (
          <SectionIcon
            name={section.icon}
            className={`w-5 h-5 ${scheme.text}`}
          />
        )}
        <span>{section.title}</span>
      </h3>
      {section.content && (
        <p className="text-gray-700 mb-3 leading-relaxed">
          {section.content}
        </p>
      )}

      <div
        className={`grid gap-3 mt-2 rounded-xl border ${scheme.border} ${scheme.bg} p-4`}
      >
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${scheme.badgeBg} ${scheme.text}`}
            >
              {step.number ?? i + 1}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{step.text}</p>
              {step.description && (
                <p className="text-sm text-gray-700">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme);
  const items: string[] = section.metadata?.listItems || [];

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
        {section.icon && (
          <SectionIcon
            name={section.icon}
            className={`w-5 h-5 ${scheme.text}`}
          />
        )}
        <span>{section.title}</span>
      </h3>
      {section.content && (
        <p className="text-gray-700 mb-3 leading-relaxed">
          {section.content}
        </p>
      )}
      <div
        className={`rounded-xl border ${scheme.border} ${scheme.bg} p-4 text-sm`}
      >
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TipSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  const scheme = getColorScheme(section.colorScheme || "yellow");
  const tips: string[] = section.metadata?.tips || [];

  return (
    <div className="mb-6">
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
            <h3 className={`text-lg font-semibold mb-1 ${scheme.text}`}>
              {section.title}
            </h3>
            {section.content && (
              <p className="text-sm text-gray-800 mb-2">{section.content}</p>
            )}
            {tips.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                {tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WarningSection: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const scheme = getColorScheme(section.colorScheme || "red");
  const warnings: string[] = section.metadata?.warnings || [];

  return (
    <div className="mb-6">
      <div
        className={`rounded-2xl border ${scheme.border} ${scheme.bg} p-4 md:p-5`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`rounded-full p-2 ${scheme.badgeBg} flex items-center justify-center`}
          >
            <SectionIcon
              name={section.icon || "AlertTriangle"}
              className={`w-5 h-5 ${scheme.text}`}
            />
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-1 ${scheme.text}`}>
              {section.title}
            </h3>
            {section.content && (
              <p className="text-sm text-gray-800 mb-2">{section.content}</p>
            )}
            {warnings.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                {warnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonSection: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const scheme = getColorScheme(section.colorScheme || "blue");
  const rows: { label: string; value: string }[] =
    section.metadata?.comparisonTable || [];

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <SectionIcon
          name={section.icon || "Scale"}
          className={`w-5 h-5 ${scheme.text}`}
        />
        <span>{section.title}</span>
      </h3>
      {section.content && (
        <p className="text-gray-700 mb-3 leading-relaxed">
          {section.content}
        </p>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`rounded-xl border ${scheme.border} ${scheme.bg} p-4`}
          >
            <p className={`text-sm font-semibold mb-1 ${scheme.text}`}>
              {row.label}
            </p>
            <p className="text-sm text-gray-800">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----- MAIN RENDERER ----- */

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
      // fallback = simple paragraph
      return (
        <div className="mb-4">
          {section.title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {section.title}
            </h3>
          )}
          {section.content && (
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          )}
        </div>
      );
  }
};

export default SectionRenderer;
