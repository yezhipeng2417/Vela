import { colors, fonts, radius } from '../styles/theme'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
      <span style={{
        position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
        color: colors.textMuted, fontSize: '14px', pointerEvents: 'none',
      }}>
        &gt;
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search marketplaces, plugins..."
        style={{
          width: '100%',
          padding: '12px 16px 12px 36px',
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          color: colors.text,
          fontFamily: fonts.mono,
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => { e.target.style.borderColor = colors.accent }}
        onBlur={(e) => { e.target.style.borderColor = colors.border }}
      />
    </div>
  )
}
