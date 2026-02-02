import { links } from './routes'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const relativePath = (to: string) => (to === '/' ? '' : to.replace(/^\//, ''))

export const Router = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {links.map((link) => (
          <Route key={link.to} path={relativePath(link.to)} element={link.children} />
        ))}
      </Routes>
    </Suspense>
  )
}
