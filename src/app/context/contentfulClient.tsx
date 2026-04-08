'use client'

import { createContext } from 'react'

import type { ContentfulData } from '@/app/types/contentful'

// ─── Context ──────────────────────────────────────────────────────────────────

export const ContentfulContext = createContext<ContentfulData>({
  aboutMe: null,
  experiences: [],
  personalProjects: [],
  loading: true,
})

// ─── Client Provider ──────────────────────────────────────────────────────────

type ContentfulContextProviderProps = {
  children: React.ReactNode
  data: Omit<ContentfulData, 'loading'>
}

const ContentfulContextProvider: React.FC<ContentfulContextProviderProps> = ({ children, data }) => {
  return (
    <ContentfulContext.Provider value={{ ...data, loading: false }}>
      {children}
    </ContentfulContext.Provider>
  )
}

export default ContentfulContextProvider
