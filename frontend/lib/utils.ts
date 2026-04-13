import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDisplayName(
  person: { name?: string; title?: string; role?: string },
  options?: { useFirstNameForStudents?: boolean }
): string {
  const name = person.name?.trim() || "";
  if (!name) return "";

  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0] || name;
  const last = parts.length ? parts[parts.length - 1] : name;

  if (person.title) {
    return `${person.title} ${last}`;
  }

  if (options?.useFirstNameForStudents) {
    return first;
  }

  return name;
}
