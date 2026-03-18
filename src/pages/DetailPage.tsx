import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { MarketplaceData, Marketplace } from '../types'
import { findMarketplace } from '../hooks/useMarketplaces'
import { PluginDetail } from '../components/PluginDetail'
import { InstallGuide } from '../components/InstallGuide'
import { ComponentBadges } from '../components/ComponentBadges'
import { colors, fonts, radius, spacing } from '../styles/theme'

export function DetailPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const [data, setData] = useState<MarketplaceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/marketplaces.json')
      .then((r) => r.json())
      .then((d: MarketplaceData) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', fontFamily: fonts.mono, color: colors.accent,
      }}>
        loading...
      </div>
    )
  }

  const m: Marketplace | undefined = findMarketplace(data, owner ?? '', repo ?? '')

  if (!m) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh',
        fontFamily: fonts.mono, gap: spacing.md,
      }}>
        <span style={{ color: colors.red }}>marketplace not found</span>
        <Link to="/" style={{ color: colors.accent, fontSize: '13px' }}>
          &larr; back to list
        </Link>
      </div>
    )
  }

  const hasAny = (key: 'hasCommands' | 'hasAgents' | 'hasHooks' | 'hasSkills' | 'hasMcp' | 'hasLsp') =>
    m.plugins.some((p) => p[key])

  const description = m.description || m.repoDescription || ''
  const updatedDate = new Date(m.repoUpdatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <div style={{
      maxWidth: '800px', margin: '0 auto',
      padding: `${spacing.xl} ${spacing.lg} ${spacing.xxl}`,
    }}>
      {/* Back link */}
      <Link to="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: spacing.xs,
        color: colors.textMuted, fontFamily: fonts.mono, fontSize: '13px',
        marginBottom: spacing.xl, transition: 'color 0.2s',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent }}
        onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted }}
      >
        &larr; back
      </Link>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: spacing.lg,
        marginBottom: spacing.xl,
        flexWrap: 'wrap',
      }}>
        <img
          src={m.ownerAvatar}
          alt=""
          style={{
            width: '64px', height: '64px', borderRadius: '16px',
            border: `1px solid ${colors.border}`,
          }}
        />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h1 style={{
            fontSize: '28px', fontWeight: 700, fontFamily: fonts.mono,
            color: colors.textBright, letterSpacing: '-0.5px',
            marginBottom: spacing.xs,
          }}>
            {m.name}
          </h1>
          <div style={{
            fontSize: '13px', color: colors.textMuted, fontFamily: fonts.mono,
            marginBottom: spacing.sm,
          }}>
            {m.repo}
            {m.version && <span style={{ color: colors.textDim }}> &middot; v{m.version}</span>}
          </div>
          {description && (
            <p style={{
              fontSize: '14px', color: colors.textMuted, lineHeight: 1.6,
              marginBottom: spacing.md,
            }}>
              {description}
            </p>
          )}

          {/* Metrics */}
          <div style={{
            display: 'flex', gap: spacing.lg, fontSize: '13px',
            color: colors.textMuted, fontFamily: fonts.mono,
            flexWrap: 'wrap', marginBottom: spacing.sm,
          }}>
            <span>
              <span style={{ color: colors.yellow }}>&#9733;</span> {m.stars.toLocaleString()} stars
            </span>
            <span>&#9588; {m.forks.toLocaleString()} forks</span>
            <span>
              <span style={{ color: colors.cyan }}>&#9632;</span> {m.pluginCount} plugin{m.pluginCount !== 1 ? 's' : ''}
            </span>
            {m.license && <span>{m.license}</span>}
            <span style={{ color: colors.textDim }}>updated {updatedDate}</span>
          </div>

          <ComponentBadges
            hasCommands={hasAny('hasCommands')}
            hasAgents={hasAny('hasAgents')}
            hasHooks={hasAny('hasHooks')}
            hasSkills={hasAny('hasSkills')}
            hasMcp={hasAny('hasMcp')}
            hasLsp={hasAny('hasLsp')}
          />

          {/* Links */}
          <div style={{
            display: 'flex', gap: spacing.md, marginTop: spacing.md,
          }}>
            <a
              href={m.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px', color: colors.accent, fontFamily: fonts.mono,
                padding: '6px 14px',
                border: `1px solid rgba(0,255,159,0.3)`,
                borderRadius: radius.sm,
                transition: 'all 0.2s',
              }}
            >
              GitHub &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Install Guide */}
      <div style={{ marginBottom: spacing.xl }}>
        <InstallGuide repo={m.repo} />
      </div>

      {/* Categories grouped view */}
      {m.categories && m.categories.length > 0 && (
        <div style={{ marginBottom: spacing.xl }}>
          <h2 style={{
            fontSize: '14px', fontWeight: 600, fontFamily: fonts.mono,
            color: colors.textBright, marginBottom: spacing.md,
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            <span style={{ color: colors.accent }}>#</span> Categories
          </h2>
          <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
            {m.categories.map((cat) => (
              <div key={cat.name} style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                padding: `${spacing.sm} ${spacing.md}`,
                fontSize: '12px', fontFamily: fonts.mono,
              }}>
                <span style={{ color: colors.cyan }}>{cat.name}</span>
                {cat.description && (
                  <span style={{ color: colors.textDim }}> — {cat.description}</span>
                )}
                <span style={{ color: colors.textDim }}>
                  {' '}({cat.plugins.length} plugin{cat.plugins.length !== 1 ? 's' : ''})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plugins List */}
      <div>
        <h2 style={{
          fontSize: '14px', fontWeight: 600, fontFamily: fonts.mono,
          color: colors.textBright, marginBottom: spacing.md,
          textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          <span style={{ color: colors.accent }}>#</span> Plugins ({m.pluginCount})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
          {m.plugins.map((p) => (
            <PluginDetail key={p.name} plugin={p} />
          ))}
        </div>
      </div>

      {/* Topics */}
      {m.topics.length > 0 && (
        <div style={{ marginTop: spacing.xl }}>
          <h2 style={{
            fontSize: '14px', fontWeight: 600, fontFamily: fonts.mono,
            color: colors.textBright, marginBottom: spacing.md,
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            <span style={{ color: colors.accent }}>#</span> Topics
          </h2>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {m.topics.map((t) => (
              <span key={t} style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                fontSize: '12px',
                color: colors.textMuted,
                fontFamily: fonts.mono,
              }}>
                {t}
              </span>
            ))}
          </div>
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
        <Link to="/" style={{ color: colors.textMuted }}>
          &larr; Back to Explorer
        </Link>
      </footer>
    </div>
  )
}
