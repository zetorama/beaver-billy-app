/**
 * Glue two or more strings together with space, keeping only non-empty ones.
 */
export const glue = (...args: unknown[]) => args.filter(Boolean).join(' ')
