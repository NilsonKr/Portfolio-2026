'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useScroll, useInView, useMotionValueEvent } from 'motion/react'

import { Wrapper } from '@/app/page.style'

import useDeferredMount from '@/app/hooks/useDeferredMount'

import HeroHeader from '../HeroHeader'
import Hero from '../Hero'
import HeroFooter from '../HeroFooter'

import { TypeAboutMe, TypeExperiences, TypePersonalProjects } from '@/app/types/contentful'

const DotsBackgroundModule = dynamic(() => import('@/app/components/DotsBackground'), { ssr: false })
const ExperiencesModule = dynamic(() => import('../Experiences'))
const ProjectsModule = dynamic(() => import('../Projects'))
const AboutMeModule = dynamic(() => import('../AboutMe'))

type ComponentProps = {
  aboutMe: TypeAboutMe
  personalProjects: TypePersonalProjects[]
  experiences: TypeExperiences[]
  footer: React.ReactNode
}

const HomeScrollStage: React.FC<ComponentProps> = ({ aboutMe, personalProjects, experiences, footer }) => {
  const experiencesRef = useRef<HTMLDivElement>(null)
  const personalProjectsRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)

  const inView = useInView(personalProjectsRef, { margin: '0px 0px -100% 0px' })
  const [aboutMeSettled, setAboutMeSettled] = useState(false)

  const dotsReady = useDeferredMount()

  const { scrollYProgress: heroExitProgress } = useScroll({
    target: experiencesRef,
    offset: ['start end', '8% end'],
  })

  const { scrollYProgress: experiencesScrollYProgress } = useScroll({
    target: experiencesRef,
    offset: ['10% end', 'end end'],
  })

  const { scrollYProgress: aboutMeScrollYProgress } = useScroll({
    target: aboutMeRef,
    offset: ['start end', 'end end'],
  })

  useMotionValueEvent(aboutMeScrollYProgress, 'change', (value) => {
    setAboutMeSettled(value >= 0.66)
  })

  return (
    <>
      <Wrapper>
        {dotsReady && <DotsBackgroundModule />}

        <HeroHeader aboutMe={aboutMe as TypeAboutMe} />
        <Hero />
        <HeroFooter scrollYprogress={heroExitProgress} />
      </Wrapper>

      <ExperiencesModule experiences={experiences} containerRef={experiencesRef} scrollYProgress={experiencesScrollYProgress} />

      <div style={{ position: 'relative' }} ref={personalProjectsRef}>
        <ProjectsModule personalProjects={personalProjects} $inView={inView && !aboutMeSettled} aboutMeScrollYProgress={aboutMeScrollYProgress} />
        <AboutMeModule aboutMe={aboutMe} containerRef={aboutMeRef} scrollYProgress={aboutMeScrollYProgress} />
        {footer}
      </div>
    </>
  )
}

export default HomeScrollStage
