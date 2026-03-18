export interface PluginOwner {
  name: string
  email?: string
}

export interface RawPlugin {
  name: string
  source: string
  description?: string
  version?: string
  author?: PluginOwner
  category?: string
  tags?: string[]
  strict?: boolean
  homepage?: string
  repository?: string
  license?: string
  commands?: Record<string, unknown>
  agents?: Record<string, unknown>
  hooks?: Record<string, unknown>
  skills?: Record<string, unknown>
  mcpServers?: Record<string, unknown>
  lspServers?: Record<string, unknown>
}

export interface RawMarketplace {
  $schema?: string
  name: string
  version?: string
  description?: string
  owner?: PluginOwner
  plugins: RawPlugin[]
  categories?: {
    name: string
    description?: string
    plugins: string[]
  }[]
}

export interface CollectedMarketplace {
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
  name: string
  version?: string
  description?: string
  owner?: PluginOwner
  pluginCount: number
  plugins: {
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
  }[]
  categories?: {
    name: string
    description?: string
    plugins: string[]
  }[]
}

export interface MarketplaceData {
  updatedAt: string
  totalMarketplaces: number
  totalPlugins: number
  marketplaces: CollectedMarketplace[]
}
