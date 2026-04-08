import { createClient } from 'contentful'

import ContentfulContextProvider from './contentfulClient'

import type {
  ContentfulData,
  TypeAboutMeSkeleton,
  TypeExperiencesSkeleton,
  TypePersonalProjectsSkeleton,
} from '@/app/types/contentful'

// ─── Contentful Client ────────────────────────────────────────────────────────

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// ─── Server Provider ──────────────────────────────────────────────────────────

type ContentfulProviderProps = {
  children: React.ReactNode
}

const ContentfulProvider = async ({ children }: ContentfulProviderProps) => {
  const [aboutMeRes, experiencesRes, projectsRes] = await Promise.all([
    client.withoutUnresolvableLinks.getEntries<TypeAboutMeSkeleton>({ content_type: 'aboutMe', limit: 1, include: 2 }),
    client.getEntries<TypeExperiencesSkeleton>({ content_type: 'experiences', order: ['fields.id'], include: 2 }),
    client.getEntries<TypePersonalProjectsSkeleton>({ content_type: 'personalProjects', order: ['fields.id'], include: 2 }),
  ])

  const data: Omit<ContentfulData, 'loading'> = {
    aboutMe: aboutMeRes.items[0] ?? null,
    experiences: experiencesRes.items,
    personalProjects: projectsRes.items,
  }

  return <ContentfulContextProvider data={data}>{children}</ContentfulContextProvider>
}

export default ContentfulProvider
