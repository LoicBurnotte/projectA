import { links } from './routes'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

interface RouterProps {
  basename?: string
}

export const Router = ({ basename }: RouterProps) => {
  const pathFor = (to: string) => (basename ? `${basename}${to === '/' ? '' : to}` : to)

  return (
    <Suspense fallback="Loading...">
      <Routes>
        {links.map((link) => (
          <Route key={link.to} path={pathFor(link.to)} element={link.children} />
        ))}
      </Routes>
    </Suspense>
  )
}
