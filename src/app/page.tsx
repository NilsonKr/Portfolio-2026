'use client'
import { useRef } from 'react'
import { useScroll, useInView } from 'motion/react'

import { Wrapper, StyledBackground, StyledNoiseBackground } from './page.style'

import HeroHeader from './components/layout/HeroHeader'
import HeroFooter from './components/layout/HeroFooter'
import Hero from './components/layout/Hero'

import Experiences from './components/layout/Experiences'
import PersonalProjects from './components/layout/Projects'
import AboutMe from './components/layout/AboutMe'

import DotsBackground from './components/DotsBackground'

export default function Home() {
  const personalProjectsRef = useRef(null)
  const aboutMeRef = useRef(null)

  const inView = useInView(personalProjectsRef, { margin: '0px 0px -100% 0px' })
  const { scrollYProgress: aboutMeScrollYProgress } = useScroll({
    target: aboutMeRef,
    offset: ['start end', 'end end'],
  })

  return (<>

    <Wrapper>
      <StyledBackground />
      <StyledNoiseBackground />

      <HeroHeader />
      <DotsBackground />
      <Hero />
      <HeroFooter />

    </Wrapper>

    <Experiences />

    <div ref={personalProjectsRef}>
      <PersonalProjects $inView={inView} aboutMeScrollYProgress={aboutMeScrollYProgress} />
      <AboutMe containerRef={aboutMeRef} />
    </div>
  </>
  )
}
