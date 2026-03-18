import { colors, fonts } from '../styles/theme'

interface ComponentBadgesProps {
  hasCommands: boolean
  hasAgents: boolean
  hasHooks: boolean
  hasSkills: boolean
  hasMcp: boolean
  hasLsp: boolean
}

const badges: { key: keyof ComponentBadgesProps; label: string; color: string }[] = [
  { key: 'hasCommands', label: 'CMD', color: colors.accent },
  { key: 'hasAgents', label: 'AGT', color: colors.cyan },
  { key: 'hasHooks', label: 'HK', color: colors.purple },
  { key: 'hasSkills', label: 'SKL', color: colors.orange },
  { key: 'hasMcp', label: 'MCP', color: colors.pink },
  { key: 'hasLsp', label: 'LSP', color: colors.yellow },
]

export function ComponentBadges(props: ComponentBadgesProps) {
  const active = badges.filter((b) => props[b.key])
  if (active.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {active.map((b) => (
        <span
          key={b.key}
          style={{
            padding: '2px 6px',
            background: `${b.color}15`,
            border: `1px solid ${b.color}30`,
            borderRadius: '4px',
            color: b.color,
            fontFamily: fonts.mono,
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          {b.label}
        </span>
      ))}
    </div>
  )
}
