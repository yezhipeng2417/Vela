import { useState } from 'react'
import type { PluginInfo } from '../types'
import { ComponentBadges } from './ComponentBadges'
import { colors, fonts, radius, spacing } from '../styles/theme'

interface PluginDetailProps {
  plugin: PluginInfo
}

export function PluginDetail({ plugin: p }: PluginDetailProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: radius.md,
      overflow: 'hidden',
    }}>
      {/* Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
          padding: spacing.md,
          background: 'none',
          border: 'none',
          color: colors.text,
          fontFamily: fonts.mono,
          fontSize: '13px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          color: colors.accent,
          fontSize: '10px',
          transition: 'transform 0.2s',
          transform: expanded ? 'rotate(90deg)' : 'none',
        }}>
          &#9654;
        </span>
        <span style={{ fontWeight: 600, color: colors.textBright, flex: 1 }}>
          {p.name}
        </span>
        {p.version && (
          <span style={{ fontSize: '11px', color: colors.textDim }}>
            v{p.version}
          </span>
        )}
        {p.category && (
          <span style={{
            fontSize: '10px', color: colors.cyan,
            background: colors.cyanDim,
            padding: '2px 8px', borderRadius: '10px',
          }}>
            {p.category}
          </span>
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{
          padding: `0 ${spacing.md} ${spacing.md}`,
          borderTop: `1px solid ${colors.border}`,
          paddingTop: spacing.md,
        }}>
          {p.description && (
            <p style={{
              fontSize: '13px', color: colors.textMuted, lineHeight: 1.6,
              marginBottom: spacing.md,
            }}>
              {p.description}
            </p>
          )}

          <div style={{
            display: 'flex', gap: spacing.md, flexWrap: 'wrap',
            fontSize: '12px', color: colors.textMuted, marginBottom: spacing.md,
          }}>
            {p.source && (
              <span>
                <span style={{ color: colors.textDim }}>source:</span>{' '}
                <span style={{ color: colors.text }}>{p.source}</span>
              </span>
            )}
            {p.author?.name && (
              <span>
                <span style={{ color: colors.textDim }}>author:</span>{' '}
                <span style={{ color: colors.text }}>{p.author.name}</span>
              </span>
            )}
            {p.license && (
              <span>
                <span style={{ color: colors.textDim }}>license:</span>{' '}
                <span style={{ color: colors.text }}>{p.license}</span>
              </span>
            )}
          </div>

          <ComponentBadges
            hasCommands={p.hasCommands}
            hasAgents={p.hasAgents}
            hasHooks={p.hasHooks}
            hasSkills={p.hasSkills}
            hasMcp={p.hasMcp}
            hasLsp={p.hasLsp}
          />

          {p.tags && p.tags.length > 0 && (
            <div style={{
              display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: spacing.sm,
            }}>
              {p.tags.map((t) => (
                <span key={t} style={{
                  padding: '2px 8px', background: 'rgba(255,255,255,0.04)',
                  borderRadius: '10px', fontSize: '10px', color: colors.textDim,
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: spacing.md, marginTop: spacing.md }}>
            {p.homepage && (
              <a
                href={p.homepage}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px', color: colors.accent,
                  borderBottom: `1px solid ${colors.accentDim}`,
                }}
              >
                homepage
              </a>
            )}
            {p.repository && (
              <a
                href={p.repository}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px', color: colors.cyan,
                  borderBottom: `1px solid ${colors.cyanDim}`,
                }}
              >
                repository
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
