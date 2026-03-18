import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DetailPage } from './pages/DetailPage'
import { colors, fonts } from './styles/theme'

const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: ${fonts.mono};
    background: ${colors.bg};
    color: ${colors.text};
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }
  a { color: inherit; text-decoration: none; }
  ::selection {
    background: ${colors.accentDim};
    color: ${colors.accent};
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.15);
  }
`

export function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse at 20% 0%, rgba(0,255,159,0.04) 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 100%, rgba(0,212,255,0.03) 0%, transparent 50%),
                     ${colors.bg}`,
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/m/:owner/:repo" element={<DetailPage />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  )
}
