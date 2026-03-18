import type { SortKey } from '../types'
import { colors, fonts, radius } from '../styles/theme'

interface SortTabsProps {
  value: SortKey
  onChange: (v: SortKey) => void
}

const tabs: { key: SortKey; label: string }[] = [
  { key: 'stars', label: 'Stars' },
  { key: 'updated', label: 'Recent' },
  { key: 'plugins', label: 'Plugins' },
]

export function SortTabs({ value, onChange }: SortTabsProps) {
  return (
    <div style={{
      display: 'flex', gap: '4px',
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: radius.md,
      padding: '3px',
    }}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            padding: '6px 14px',
            background: value === t.key ? colors.accentDim : 'transparent',
            border: 'none',
            borderRadius: radius.sm,
            color: value === t.key ? colors.accent : colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: '12px',
            fontWeight: value === t.key ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
