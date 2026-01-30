import { links } from './routes'
import { Router } from './Router'
import { Header } from 'host/Header'
import { appConfig } from 'host/config'
import { RouterWrapper } from './RouterWrapper'

import './index.scss'

// When running standalone: set VITE_BASENAME=/about in .env.local so the app runs at /about, /about/test1, etc.
const defaultBasename = import.meta.env.VITE_BASENAME ?? '/about'
const isStandalone = !!import.meta.env.DEV

const App = () => {
  const basename = isStandalone ? undefined : defaultBasename
  return (
    <RouterWrapper basename={basename}>
      <Header links={links} basename={basename} />
      {appConfig.features.analytics && <small>Analytics enabled ({appConfig.appName})</small>}
      <Router basename={basename} />
    </RouterWrapper>
  )
}

export default App
