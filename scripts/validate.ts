import type { RawMarketplace } from './types.js'

export function validateMarketplace(data: unknown): RawMarketplace | null {
  if (!data || typeof data !== 'object') return null

  const obj = data as Record<string, unknown>

  // Must have name and plugins array
  if (typeof obj['name'] !== 'string') return null
  if (!Array.isArray(obj['plugins'])) return null

  const plugins = (obj['plugins'] as Record<string, unknown>[]).filter((p) => {
    return (
      p &&
      typeof p === 'object' &&
      typeof p['name'] === 'string' &&
      typeof p['source'] === 'string'
    )
  })

  if (plugins.length === 0) return null

  return {
    name: obj['name'] as string,
    version: typeof obj['version'] === 'string' ? obj['version'] : undefined,
    description: typeof obj['description'] === 'string' ? obj['description'] : undefined,
    owner: isPluginOwner(obj['owner']) ? obj['owner'] : undefined,
    plugins: plugins as unknown as RawMarketplace['plugins'],
    categories: Array.isArray(obj['categories'])
      ? (obj['categories'] as { name: string; description?: string; plugins: string[] }[]).filter(
          (c) => typeof c.name === 'string' && Array.isArray(c.plugins),
        )
      : undefined,
  }
}

function isPluginOwner(v: unknown): v is { name: string; email?: string } {
  return !!v && typeof v === 'object' && typeof (v as Record<string, unknown>)['name'] === 'string'
}
