/**
 * Glue two or more strings together with space, keeping only non-empty ones.
 */
export const glue = (...args: unknown[]) => args.filter(Boolean).join(' ')

/**
 * Generate a random string.
 */
export const uuid = () => Math.random().toString(36).slice(2, 12)
