import { NextResponse } from 'next/server'
import { createClient } from 'contentful'

import type {
  TypeAboutMeSkeleton,
  TypeExperiencesSkeleton,
  TypePersonalProjectsSkeleton,
} from '@/app/types/contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function GET() {
  const [aboutMeRes, experiencesRes, projectsRes] = await Promise.all([
    client.getEntries<TypeAboutMeSkeleton>({ content_type: 'aboutMe', limit: 1, include: 2 }),
    client.getEntries<TypeExperiencesSkeleton>({ content_type: 'experiences', order: ['fields.id'], include: 2 }),
    client.getEntries<TypePersonalProjectsSkeleton>({ content_type: 'personalProjects', order: ['fields.id'], include: 2 }),
  ])

  return NextResponse.json({
    aboutMe: aboutMeRes.items[0] ?? null,
    experiences: experiencesRes.items,
    personalProjects: projectsRes.items,
  })
}
