'use client'

import { createContext, useEffect, useState } from 'react'
import { createClient } from 'contentful'

import type {
  ContentfulData,
  TypeAboutMeSkeleton,
  TypeExperiencesSkeleton,
  TypePersonalProjectsSkeleton,
} from '@/app/types/contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
})

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
}

const ContentfulProvider: React.FC<ContentfulProviderProps> = ({ children }) => {
  const [aboutMe, setAboutMe] = useState<ContentfulData['aboutMe']>(null)
  const [experiences, setExperiences] = useState<ContentfulData['experiences']>([])
  const [personalProjects, setPersonalProjects] = useState<ContentfulData['personalProjects']>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      const [aboutMeRes, experiencesRes, projectsRes] = await Promise.all([
        client.getEntries<TypeAboutMeSkeleton>({ content_type: 'aboutMe', limit: 1, include: 2 }),
        client.getEntries<TypeExperiencesSkeleton>({ content_type: 'experiences', order: ['fields.id'], include: 2 }),
        client.getEntries<TypePersonalProjectsSkeleton>({ content_type: 'personalProjects', order: ['fields.id'], include: 2 }),
      ])

      setAboutMe(aboutMeRes.items[0] ?? null)
      setExperiences(experiencesRes.items)
      setPersonalProjects(projectsRes.items)
      setLoading(false)
    }

    fetchAll()
  }, [])

  console.log(aboutMe)
  console.log(experiences)
  console.log(personalProjects)


  return (
    <ContentfulContext.Provider value={{ aboutMe, experiences, personalProjects, loading }}>
      {children}
    </ContentfulContext.Provider>
  )
}

export default ContentfulProvider
