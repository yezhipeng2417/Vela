import { useState } from 'react'
import { colors, fonts, radius, spacing } from '../styles/theme'

interface InstallGuideProps {
  repo: string
}

export function InstallGuide({ repo }: InstallGuideProps) {
  const [copied, setCopied] = useState(false)
  const command = `/plugin marketplace add ${repo}`

  const handleCopy = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{
      background: 'rgba(0, 255, 159, 0.05)',
      border: `1px solid rgba(0, 255, 159, 0.2)`,
      borderRadius: radius.lg,
      padding: spacing.lg,
    }}>
      <div style={{
        fontSize: '12px',
        color: colors.accent,
        fontWeight: 600,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        Install
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: radius.sm,
        padding: `${spacing.sm} ${spacing.md}`,
        fontFamily: fonts.mono,
        fontSize: '13px',
      }}>
        <code style={{ flex: 1, color: colors.textBright, userSelect: 'all' }}>
          {command}
        </code>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: `1px solid ${colors.border}`,
            borderRadius: radius.sm,
            color: copied ? colors.accent : colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: '11px',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>
    </div>
  )
}
