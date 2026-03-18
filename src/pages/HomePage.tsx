import { useMarketplaces } from '../hooks/useMarketplaces'
import { MarketplaceCard } from '../components/MarketplaceCard'
import { SearchBar } from '../components/SearchBar'
import { SortTabs } from '../components/SortTabs'
import { CategoryFilter } from '../components/CategoryFilter'
import { StatsBar } from '../components/StatsBar'
import { colors, fonts, spacing } from '../styles/theme'

export function HomePage() {
  const {
    data, loading, error, filtered,
    search, setSearch,
    sortBy, setSortBy,
    categoryFilter, setCategoryFilter,
    allCategories,
  } = useMarketplaces()

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', fontFamily: fonts.mono, color: colors.accent,
      }}>
        <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
          loading marketplaces...
        </span>
        <style>{`@keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', fontFamily: fonts.mono, color: colors.red,
        flexDirection: 'column', gap: spacing.md,
      }}>
        <span>error: {error}</span>
        <a href="/" style={{ color: colors.accent, fontSize: '13px' }}>reload</a>
      </div>
    )
  }

  if (!data) return null

  return (
    <div style={{
      maxWidth: '960px', margin: '0 auto',
      padding: `${spacing.xxl} ${spacing.lg}`,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: spacing.xxl }}>
        <a
          href="https://mogulabs.tech"
          style={{
            fontSize: '11px', color: colors.textDim, fontFamily: fonts.mono,
            letterSpacing: '2px', textTransform: 'uppercase',
            display: 'inline-block', marginBottom: spacing.md,
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: '2px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.textMuted }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textDim }}
        >
          MoguLabs
        </a>
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 36px)',
          fontWeight: 700,
          fontFamily: fonts.mono,
          color: colors.textBright,
          letterSpacing: '-1px',
          marginBottom: spacing.sm,
        }}>
          <span style={{ color: colors.accent }}>&gt;</span> Marketplace Explorer
        </h1>
        <p style={{
          fontSize: '14px', color: colors.textMuted,
          fontFamily: fonts.mono, maxWidth: '500px', margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Discover Claude Code plugin marketplaces.
          <br />
          Auto-discovered from GitHub repos with{' '}
          <code style={{
            background: colors.bgCard, padding: '2px 6px',
            borderRadius: '4px', fontSize: '12px', color: colors.cyan,
          }}>
            .claude-plugin/marketplace.json
          </code>
        </p>
      </header>

      {/* Stats */}
      <div style={{ marginBottom: spacing.xl }}>
        <StatsBar
          totalMarketplaces={data.totalMarketplaces}
          totalPlugins={data.totalPlugins}
          updatedAt={data.updatedAt}
        />
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: spacing.md, marginBottom: spacing.xl,
      }}>
        <div style={{
          display: 'flex', gap: spacing.md, alignItems: 'center',
          width: '100%', maxWidth: '700px',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <SearchBar value={search} onChange={setSearch} />
          <SortTabs value={sortBy} onChange={setSortBy} />
        </div>
        <CategoryFilter
          categories={allCategories}
          selected={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: spacing.xxl,
          color: colors.textMuted, fontFamily: fonts.mono, fontSize: '14px',
        }}>
          no marketplaces found
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                display: 'block', margin: `${spacing.md} auto 0`,
                background: 'none', border: `1px solid ${colors.border}`,
                borderRadius: '6px', padding: '6px 16px',
                color: colors.accent, fontFamily: fonts.mono,
                fontSize: '12px', cursor: 'pointer',
              }}
            >
              clear search
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: spacing.md,
        }}>
          {filtered.map((m, i) => (
            <MarketplaceCard key={m.repo} marketplace={m} rank={i + 1} />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center', marginTop: spacing.xxl,
        padding: spacing.lg,
        borderTop: `1px solid ${colors.border}`,
        fontSize: '12px', color: colors.textDim,
        fontFamily: fonts.mono,
      }}>
        Built by{' '}
        <a href="https://mogulabs.tech" style={{ color: colors.textMuted }}>
          MoguLabs
        </a>
        {' '}&middot;{' '}
        Data auto-collected from GitHub
      </footer>
    </div>
  )
}
