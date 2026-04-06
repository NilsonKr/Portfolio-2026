// ─── Experiences ─────────────────────────────────────────────────────────────

export type ExperienceData = {
  id?: number
  company?: string
  description?: string
  beginDate?: string
  endDate?: string
  role?: string
  stack?: string[]
}

// ─── Personal Projects ────────────────────────────────────────────────────────

export type ShowcaseAsset = {
  sys: { id: string }
  fields: {
    title?: string
    file?: { url: string; contentType?: string }
  }
}

export type PersonalProjectData = {
  id?: number
  name?: string
  description?: string
  showcase?: ShowcaseAsset[]
  stack?: string[]
  links?: string[]
  color?: string
}
