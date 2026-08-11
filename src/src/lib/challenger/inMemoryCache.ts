type CacheOptions = { revalidate?: number; tags?: string[] };

export function cache<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  keyParts: string[] = [],
  options: CacheOptions = {}
): (...args: TArgs) => Promise<TResult> {
  const store = new Map<string, { value: TResult; expiresAt: number }>();
  const ttlMs = (options.revalidate ?? 0) * 1000;
  return async (...args: TArgs): Promise<TResult> => {
    const key = `${keyParts.join('|')}::${JSON.stringify(args)}`;
    const now = Date.now();
    const hit = store.get(key);
    if (hit && (ttlMs === 0 || hit.expiresAt > now)) return hit.value;
    const value = await fn(...args);
    store.set(key, { value, expiresAt: now + ttlMs });
    return value;
  };
}

// export function revalidateTag(_tag: string): void {
//   /* no-op: Pages Router has no tag invalidation; cache() entries expire via TTL */
// }
