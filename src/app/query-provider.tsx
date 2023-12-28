'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type QueryProviderType = {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function QueryProvider({ children }: QueryProviderType) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
