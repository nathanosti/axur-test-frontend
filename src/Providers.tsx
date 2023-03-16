import React, { ReactNode } from 'react'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme'


import { StoreProvider } from './store'

import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/queryClient'

interface IProps {
	children?: ReactNode
}

export default function Providers(props: IProps) {
	const { children } = props

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={defaultTheme}>
				<StoreProvider>
					{children}
				</StoreProvider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}