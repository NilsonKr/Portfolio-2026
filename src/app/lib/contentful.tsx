import { createClient } from 'contentful'
import { cache } from 'react'

import type {
  ContentfulData,
  TypeAboutMeSkeleton,
  TypeExperiencesSkeleton,
  TypePersonalProjectsSkeleton,
} from '@/app/types/contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})


export const getContentfulData = cache(async () => {
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

  return data
})