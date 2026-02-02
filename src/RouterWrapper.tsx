import { BrowserRouter, useInRouterContext } from 'react-router-dom'

interface RouterWrapperProps {
  children: React.ReactNode
}

export const RouterWrapper = ({ children }: RouterWrapperProps) => {
  const inRouterContext = useInRouterContext()

  if (inRouterContext) {
    return <>{children}</>
  }

  return <BrowserRouter>{children}</BrowserRouter>
}
