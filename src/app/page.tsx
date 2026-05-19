import { getContentfulData } from "./lib/contentful"

import { StyledBackground, StyledNoiseBackground } from './page.style'

import HomeScrollStage from './components/layout/HomeScrollStage'
import HeroHeader from './components/layout/HeroHeader'
import FooterPage from './components/layout/FooterPage'

import { TypeAboutMe, TypeExperiences, TypePersonalProjects } from "./types/contentful"

export default async function Home() {
  const { aboutMe, personalProjects, experiences } = await getContentfulData()

  return (<>
    <StyledBackground />
    <StyledNoiseBackground />

    <HomeScrollStage
      header={<HeroHeader aboutMe={aboutMe as TypeAboutMe} />}
      footer={<FooterPage aboutMe={aboutMe as TypeAboutMe} />}
      aboutMe={aboutMe as TypeAboutMe}
      personalProjects={personalProjects as TypePersonalProjects[]}
      experiences={experiences as TypeExperiences[]}
    />
  </>
  )
}

export const revalidate = 3600
