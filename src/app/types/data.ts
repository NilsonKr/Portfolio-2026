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

export type PersonalProjectData = {
  id?: number
  name?: string
  description?: string
  stack?: string[]
  links?: string[]
}
