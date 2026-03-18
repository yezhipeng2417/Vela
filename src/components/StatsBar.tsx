import { colors, fonts, spacing, radius } from '../styles/theme'

interface StatsBarProps {
  totalMarketplaces: number
  totalPlugins: number
  updatedAt: string
}

export function StatsBar({ totalMarketplaces, totalPlugins, updatedAt }: StatsBarProps) {
  const date = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  const stats = [
    { label: 'Marketplaces', value: totalMarketplaces },
    { label: 'Plugins', value: totalPlugins },
    { label: 'Updated', value: date },
  ]

  return (
    <div style={{
      display: 'flex', gap: spacing.lg, flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {stats.map((s) => (
        <div key={s.label} style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: `${spacing.sm} ${spacing.md}`,
          fontFamily: fonts.mono,
          fontSize: '13px',
        }}>
          <span style={{ color: colors.textMuted }}>{s.label}: </span>
          <span style={{ color: colors.accent }}>{s.value}</span>
        </div>
      ))}
    </div>
  )
}
