import { links } from '@/routes'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const pathFor = (basename: string | undefined, to: string) => (basename ? `${basename}${to === '/' ? '' : to}` : to)

interface HeaderProps {
  basename?: string
}

export const Header = ({ basename }: HeaderProps) => {
  const { pathname } = useLocation()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        padding: '20px 0',
        backgroundColor: 'lightgray',
      }}>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', justifyContent: 'space-around' }}>
        {links.map((link) => {
          const href = pathFor(basename, link.to)
          return (
            <RouterLink
              key={link.label}
              to={href}
              style={pathname === href ? { textDecoration: 'underline' } : undefined}>
              {link.label}
            </RouterLink>
          )
        })}
      </div>
    </div>
  )
}
