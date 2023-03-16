import React from 'react'

import { GlobalStyle } from './styles/globalStyles'
import Routes from './Routes'
import Providers from './Providers'

export default function App() {
  return (
    <Providers>
      <Routes/>
      <GlobalStyle />
    </Providers>
  )
}
