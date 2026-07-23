/**
 * Minimal className combiner — avoids pulling in a dependency for
 * something this small. Filters out falsy values so conditional
 * classes can be written inline: cn("a", condition && "b").
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
