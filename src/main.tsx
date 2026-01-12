import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Heading } from './components/Heading'
import { TimerIcon } from 'lucide-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Heading>
      Olá Mundo do React 1
      <button>
        <TimerIcon/>
      </button>
    </Heading>
    <App/>
  </StrictMode>,
)
