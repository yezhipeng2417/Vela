import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Marketplace } from '../types'
import { RankBadge } from './RankBadge'
import { ComponentBadges } from './ComponentBadges'
import { colors, fonts, radius, spacing } from '../styles/theme'

interface MarketplaceCardProps {
  marketplace: Marketplace
  rank: number
}

export function MarketplaceCard({ marketplace: m, rank }: MarketplaceCardProps) {
  const [hovered, setHovered] = useState(false)

  const hasAny = (key: 'hasCommands' | 'hasAgents' | 'hasHooks' | 'hasSkills' | 'hasMcp' | 'hasLsp') =>
    m.plugins.some((p) => p[key])

  const description = m.description || m.repoDescription || 'No description'
  const [owner, repo] = m.repo.split('/')

  return (
    <Link
      to={`/m/${owner}/${repo}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: hovered ? colors.bgCardHover : colors.bgCard,
        border: `1px solid ${hovered ? colors.borderHover : colors.border}`,
        borderRadius: radius.lg,
        padding: spacing.lg,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 40px -10px rgba(0, 255, 159, 0.15)' : 'none',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md }}>
        <RankBadge rank={rank} />
        <img
          src={m.ownerAvatar}
          alt=""
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: `1px solid ${colors.border}`,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '15px', fontWeight: 600, color: colors.textBright,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {m.name}
          </div>
          <div style={{
            fontSize: '11px', color: colors.textMuted,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {m.repo}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '13px', color: colors.textMuted, lineHeight: 1.5,
        marginBottom: spacing.md,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {description}
      </p>

      {/* Metrics */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: spacing.md,
        fontSize: '12px', color: colors.textMuted, marginBottom: spacing.sm,
        fontFamily: fonts.mono,
      }}>
        <span title="Stars">
          <span style={{ color: colors.yellow }}>&#9733;</span> {m.stars.toLocaleString()}
        </span>
        <span title="Forks" style={{ opacity: 0.7 }}>
          &#9588; {m.forks.toLocaleString()}
        </span>
        <span title="Plugins">
          <span style={{ color: colors.cyan }}>&#9632;</span> {m.pluginCount} plugin{m.pluginCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Component badges */}
      <ComponentBadges
        hasCommands={hasAny('hasCommands')}
        hasAgents={hasAny('hasAgents')}
        hasHooks={hasAny('hasHooks')}
        hasSkills={hasAny('hasSkills')}
        hasMcp={hasAny('hasMcp')}
        hasLsp={hasAny('hasLsp')}
      />

      {/* Topics */}
      {m.topics.length > 0 && (
        <div style={{
          display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: spacing.sm,
        }}>
          {m.topics.slice(0, 4).map((t) => (
            <span key={t} style={{
              padding: '2px 8px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '10px',
              fontSize: '10px',
              color: colors.textDim,
            }}>
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
