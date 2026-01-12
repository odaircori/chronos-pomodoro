import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Heading } from './components/Heading'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Heading attr='StringNormal' attr2={1234}>Olá Mundo do React 1</Heading>
    <App/>
  </StrictMode>,
)
