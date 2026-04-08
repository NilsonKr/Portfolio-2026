'use client'
import { useRef, useState } from 'react'
import { useScroll, useInView, useMotionValueEvent } from 'motion/react'

import { Wrapper, StyledBackground, StyledNoiseBackground } from './page.style'

import HeroHeader from './components/layout/HeroHeader'
import HeroFooter from './components/layout/HeroFooter'
import Hero from './components/layout/Hero'

import Experiences from './components/layout/Experiences'
import PersonalProjects from './components/layout/Projects'
import AboutMe from './components/layout/AboutMe'
import FooterPage from './components/layout/FooterPage'

import DotsBackground from './components/DotsBackground'

export default function Home() {
  const personalProjectsRef = useRef(null)
  const aboutMeRef = useRef(null)

  const inView = useInView(personalProjectsRef, { margin: '0px 0px -100% 0px' })
  const [aboutMeSettled, setAboutMeSettled] = useState(false)

  const { scrollYProgress: aboutMeScrollYProgress } = useScroll({
    target: aboutMeRef,
    offset: ['start end', 'end end'],
  })

  useMotionValueEvent(aboutMeScrollYProgress, 'change', (value) => {
    setAboutMeSettled(value >= 0.66)
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

    <div style={{ position: 'relative' }} ref={personalProjectsRef}>
      <PersonalProjects $inView={inView && !aboutMeSettled} aboutMeScrollYProgress={aboutMeScrollYProgress} />
      <AboutMe containerRef={aboutMeRef} scrollYProgress={aboutMeScrollYProgress} />
      <FooterPage />
    </div>

  </>
  )
}
