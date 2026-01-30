import { BrowserRouter, useInRouterContext } from 'react-router-dom'

interface RouterWrapperProps {
  children: React.ReactNode
  basename?: string
}

export const RouterWrapper = ({ children, basename = '' }: RouterWrapperProps) => {
  const inRouterContext = useInRouterContext()

  if (inRouterContext) {
    return <>{children}</>
  }

  return <BrowserRouter basename={basename}>{children}</BrowserRouter>
}
