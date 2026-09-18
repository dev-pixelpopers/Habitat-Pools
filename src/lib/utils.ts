/** Strip everything a `tel:` href can't carry, e.g. "( 480 ) 420 7515". */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * Drop `undefined` values so a CMS section can be spread over its fallback
 * without blanking the fields the CMS has no content for.
 */
export function definedOnly<T extends object>(source: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}
