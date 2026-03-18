export interface PluginOwner {
  name: string
  email?: string
}

export interface PluginInfo {
  name: string
  description?: string
  version?: string
  source: string
  author?: PluginOwner
  category?: string
  tags?: string[]
  strict?: boolean
  homepage?: string
  repository?: string
  license?: string
  hasCommands: boolean
  hasAgents: boolean
  hasHooks: boolean
  hasSkills: boolean
  hasMcp: boolean
  hasLsp: boolean
}

export interface MarketplaceCategory {
  name: string
  description?: string
  plugins: string[]
}

export interface Marketplace {
  // GitHub metadata
  repo: string
  repoUrl: string
  stars: number
  forks: number
  topics: string[]
  license: string | null
  repoDescription: string | null
  repoUpdatedAt: string
  repoCreatedAt: string
  ownerAvatar: string

  // marketplace.json content
  name: string
  version?: string
  description?: string
  owner?: PluginOwner
  pluginCount: number
  plugins: PluginInfo[]
  categories?: MarketplaceCategory[]
}

export interface MarketplaceData {
  updatedAt: string
  totalMarketplaces: number
  totalPlugins: number
  marketplaces: Marketplace[]
}

export type SortKey = 'stars' | 'updated' | 'plugins'
