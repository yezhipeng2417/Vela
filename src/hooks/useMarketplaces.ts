import { useState, useEffect, useMemo } from 'react'
import type { MarketplaceData, Marketplace, SortKey } from '../types'

const DATA_URL = import.meta.env.BASE_URL + 'data/marketplaces.json'

export function useMarketplaces() {
  const [data, setData] = useState<MarketplaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('stars')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch(DATA_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load data: ${r.status}`)
        return r.json()
      })
      .then((d: MarketplaceData) => {
        setData(d)
        setLoading(false)
      })
      .catch((e: Error) => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

  const allCategories = useMemo(() => {
    if (!data) return []
    const cats = new Set<string>()
    for (const m of data.marketplaces) {
      for (const p of m.plugins) {
        if (p.category) cats.add(p.category)
      }
    }
    return Array.from(cats).sort()
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    let list = data.marketplaces

    // Search
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.repoDescription?.toLowerCase().includes(q) ||
          m.repo.toLowerCase().includes(q) ||
          m.plugins.some(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.description?.toLowerCase().includes(q),
          ),
      )
    }

    // Category filter
    if (categoryFilter) {
      list = list.filter((m) =>
        m.plugins.some((p) => p.category === categoryFilter),
      )
    }

    // Sort
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stars - a.stars
        case 'updated':
          return (
            new Date(b.repoUpdatedAt).getTime() -
            new Date(a.repoUpdatedAt).getTime()
          )
        case 'plugins':
          return b.pluginCount - a.pluginCount
      }
    })

    return list
  }, [data, search, sortBy, categoryFilter])

  return {
    data,
    loading,
    error,
    filtered,
    search,
    setSearch,
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
    allCategories,
  }
}

export function findMarketplace(
  data: MarketplaceData | null,
  owner: string,
  repo: string,
): Marketplace | undefined {
  if (!data) return undefined
  return data.marketplaces.find(
    (m) => m.repo.toLowerCase() === `${owner}/${repo}`.toLowerCase(),
  )
}
