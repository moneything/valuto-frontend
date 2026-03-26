const CLASS_REPLACEMENTS = [
  [/bg-white\b/g, "bg-white/[0.04]"],
  [/bg-gray-50\b/g, "bg-white/[0.04]"],
  [/bg-gray-100\b/g, "bg-white/[0.06]"],
  [/border-gray-100\b/g, "border-white/10"],
  [/border-gray-200\b/g, "border-white/10"],
  [/border-gray-300\b/g, "border-white/15"],
  [/text-gray-900\b/g, "text-white"],
  [/text-gray-800\b/g, "text-[#e5e5e7]"],
  [/text-gray-700\b/g, "text-[#d7d7db]"],
  [/text-gray-600\b/g, "text-[#9a9a9d]"],
  [/text-gray-500\b/g, "text-[#9a9a9d]"],
  [/bg-blue-50\b/g, "bg-blue-500/10"],
  [/border-blue-100\b/g, "border-blue-400/20"],
  [/border-blue-200\b/g, "border-blue-400/30"],
  [/text-blue-900\b/g, "text-blue-200"],
  [/text-blue-800\b/g, "text-blue-200"],
  [/text-blue-700\b/g, "text-blue-200"],
  [/text-blue-600\b/g, "text-blue-300"],
  [/bg-green-50\b/g, "bg-green-500/10"],
  [/border-green-100\b/g, "border-green-400/20"],
  [/border-green-200\b/g, "border-green-400/30"],
  [/text-green-900\b/g, "text-green-200"],
  [/text-green-800\b/g, "text-green-200"],
  [/text-green-700\b/g, "text-green-300"],
  [/text-green-600\b/g, "text-green-300"],
  [/bg-yellow-50\b/g, "bg-yellow-500/10"],
  [/border-yellow-100\b/g, "border-yellow-400/20"],
  [/border-yellow-200\b/g, "border-yellow-400/30"],
  [/border-yellow-400\b/g, "border-yellow-400/40"],
  [/text-yellow-900\b/g, "text-yellow-200"],
  [/text-yellow-800\b/g, "text-yellow-200"],
  [/text-yellow-700\b/g, "text-yellow-300"],
  [/text-yellow-600\b/g, "text-yellow-300"],
  [/bg-purple-50\b/g, "bg-purple-500/10"],
  [/border-purple-200\b/g, "border-purple-400/30"],
  [/text-purple-900\b/g, "text-purple-200"],
  [/text-purple-800\b/g, "text-purple-200"],
  [/text-purple-700\b/g, "text-purple-300"],
  [/text-purple-600\b/g, "text-purple-300"],
  [/bg-orange-50\b/g, "bg-orange-500/10"],
  [/border-orange-200\b/g, "border-orange-400/30"],
  [/text-orange-900\b/g, "text-orange-200"],
  [/text-orange-800\b/g, "text-orange-200"],
  [/text-orange-700\b/g, "text-orange-300"],
  [/text-orange-600\b/g, "text-orange-300"],
  [/bg-red-50\b/g, "bg-red-500/10"],
  [/border-red-200\b/g, "border-red-400/30"],
  [/text-red-900\b/g, "text-red-200"],
  [/text-red-800\b/g, "text-red-200"],
  [/text-red-700\b/g, "text-red-300"],
  [/text-red-600\b/g, "text-red-300"],
];

function normalizeClassName(className) {
  if (typeof className !== "string") return className;

  return CLASS_REPLACEMENTS.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    className
  );
}

function normalizeNode(node) {
  if (!node || typeof node !== "object") return node;
  if (typeof node === "string") return node;

  const nextNode = { ...node };

  if (nextNode.props && typeof nextNode.props === "object") {
    nextNode.props = { ...nextNode.props };
    if (nextNode.props.className) {
      nextNode.props.className = normalizeClassName(nextNode.props.className);
    }
  }

  if (Array.isArray(nextNode.children)) {
    nextNode.children = nextNode.children.map((child) =>
      typeof child === "string" ? child : normalizeNode(child)
    );
  }

  return nextNode;
}

function applyDarkThemeToModules(modules) {
  modules.forEach((module) => {
    if (Array.isArray(module.uiTree)) {
      module.uiTree = module.uiTree.map((node) => normalizeNode(node));
    }
  });
}

module.exports = { applyDarkThemeToModules };
