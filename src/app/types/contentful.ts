import type {  Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful'

// ─── About Me ────────────────────────────────────────────────────────────────

export interface TypeAboutMeFields {
  description?: EntryFieldTypes.Text
  picture?: EntryFieldTypes.AssetLink
  linkedIn?: EntryFieldTypes.Symbol
  github?: EntryFieldTypes.Symbol
  getonboard?: EntryFieldTypes.Symbol
}

export interface TypeAboutMeSkeleton extends EntrySkeletonType {
  fields: TypeAboutMeFields
  contentTypeId: 'aboutMe'
}

export type TypeAboutMe = Entry<TypeAboutMeSkeleton>

// ─── Experiences ─────────────────────────────────────────────────────────────

export interface TypeExperiencesFields {
  id?: EntryFieldTypes.Integer
  company?: EntryFieldTypes.Symbol
  description?: EntryFieldTypes.Text
  showcase?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  beginDate?: EntryFieldTypes.Date
  endDate?: EntryFieldTypes.Date
  stack?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export interface TypeExperiencesSkeleton extends EntrySkeletonType {
  fields: TypeExperiencesFields
  contentTypeId: 'experiences'
}

export type TypeExperiences = Entry<TypeExperiencesSkeleton>

// ─── Personal Projects ────────────────────────────────────────────────────────

export interface TypePersonalProjectsFields {
  id?: EntryFieldTypes.Integer
  name?: EntryFieldTypes.Symbol
  description?: EntryFieldTypes.Text
  showcase?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  stack?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
  links?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export interface TypePersonalProjectsSkeleton extends EntrySkeletonType {
  fields: TypePersonalProjectsFields
  contentTypeId: 'personalProjects'
}

export type TypePersonalProjects = Entry<TypePersonalProjectsSkeleton>

// ─── Context ──────────────────────────────────────────────────────────────────

export type ContentfulData = {
  aboutMe: TypeAboutMe | null
  experiences: TypeExperiences[]
  personalProjects: TypePersonalProjects[]
  loading: boolean
}
