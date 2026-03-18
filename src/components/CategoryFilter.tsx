import { colors, fonts } from '../styles/theme'

interface CategoryFilterProps {
  categories: string[]
  selected: string | null
  onChange: (v: string | null) => void
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  if (categories.length === 0) return null

  return (
    <div style={{
      display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center',
    }}>
      <button
        onClick={() => onChange(null)}
        style={{
          padding: '4px 12px',
          background: selected === null ? colors.accentDim : 'transparent',
          border: `1px solid ${selected === null ? 'rgba(0,255,159,0.3)' : colors.border}`,
          borderRadius: '20px',
          color: selected === null ? colors.accent : colors.textMuted,
          fontFamily: fonts.mono,
          fontSize: '11px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        all
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(selected === cat ? null : cat)}
          style={{
            padding: '4px 12px',
            background: selected === cat ? colors.cyanDim : 'transparent',
            border: `1px solid ${selected === cat ? 'rgba(0,212,255,0.3)' : colors.border}`,
            borderRadius: '20px',
            color: selected === cat ? colors.cyan : colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
