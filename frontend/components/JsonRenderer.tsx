// frontend/components/JsonRenderer.tsx
"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

// Import only the components you actually have
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// --------------------
// Types
// --------------------
export type JsonChild = JsonNode | string;

export type JsonNode = {
  type: string;                 // e.g., "Card", "div", "Store"
  props?: Record<string, any>;  // className, action, etc.
  children?: JsonChild[];       // nested nodes or strings
};

// --------------------
// Component Registry
// --------------------
const UI_COMPONENTS: Record<string, React.ComponentType<any> | string> = {
  // Shadcn UI you *actually* have
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,

  // HTML tags
  div: "div",
  p: "p",
  span: "span",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  ul: "ul",
  li: "li",
  img: "img",
  section: "section",
  button: "button",       // allow a raw button element
};

// Merge Lucide icons (Store, Laptop, Users, Clock, etc.)
const ICONS: Record<string, React.ComponentType<any>> = LucideIcons as any;

const COMPONENTS: Record<string, React.ComponentType<any> | string> = {
  ...UI_COMPONENTS,
  ...ICONS,
};

// --------------------
// Recursive Renderer
// --------------------
function renderNode(
  node: JsonChild,
  key: React.Key | undefined,
  handleAction?: (a: any) => void
): React.ReactNode {
  // Text node
  if (typeof node === "string") return node;

  const { type, props = {}, children = [] } = node;

  // Component lookup
  const Comp = (COMPONENTS[type] as any) || type;

  // Extract custom JSON-driven action prop
  const { action, ...restProps } = props;

  // Auto-add onClick handler for components with actions
  let finalProps = { ...restProps };
  if (action && handleAction) {
    finalProps.onClick = () => handleAction(action);
  }

  // Recursively render children
  const renderedChildren = children.map((child, index) =>
    renderNode(child, index, handleAction)
  );

  return (
    <Comp key={key} {...finalProps}>
      {renderedChildren}
    </Comp>
  );
}

// --------------------
// Public Component
// --------------------
export const JsonRenderer: React.FC<{
  tree: JsonNode[];
  onAction?: (action: any) => void;
}> = ({ tree, onAction }) => {
  return <>{tree.map((node, index) => renderNode(node, index, onAction))}</>;
};
