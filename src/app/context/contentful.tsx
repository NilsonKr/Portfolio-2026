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

// ─── Provider ─────────────────────────────────────────────────────────────────

type ContentfulProviderProps = {
  children: React.ReactNode
  data: Omit<ContentfulData, 'loading'>
}

const ContentfulProvider: React.FC<ContentfulProviderProps> = ({ children, data }) => {
  return (
    <ContentfulContext.Provider value={{ ...data, loading: false }}>
      {children}
    </ContentfulContext.Provider>
  )
}

export default ContentfulProvider
