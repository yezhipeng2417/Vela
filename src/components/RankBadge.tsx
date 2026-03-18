import { colors, fonts } from '../styles/theme'

interface RankBadgeProps {
  rank: number
}

export function RankBadge({ rank }: RankBadgeProps) {
  const isTop3 = rank <= 3
  const bg = isTop3 ? colors.accentDim : colors.bgCard
  const color = isTop3 ? colors.accent : colors.textMuted
  const border = isTop3 ? 'rgba(0,255,159,0.3)' : colors.border

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: '8px',
      color,
      fontFamily: fonts.mono,
      fontSize: '12px',
      fontWeight: 700,
      flexShrink: 0,
    }}>
      {rank}
    </span>
  )
}
