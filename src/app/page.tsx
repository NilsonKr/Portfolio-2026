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
  const heroRef = useRef(null)
  const experiencesRef = useRef<HTMLDivElement>(null)
  const personalProjectsRef = useRef(null)
  const aboutMeRef = useRef(null)

  const inView = useInView(personalProjectsRef, { margin: '0px 0px -100% 0px' })
  const [aboutMeSettled, setAboutMeSettled] = useState(false)

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

  return (<>

    <Wrapper>
      <StyledBackground />
      <StyledNoiseBackground />

      <HeroHeader />
      <DotsBackground />
      <Hero containerRef={heroRef} />
      <HeroFooter scrollYprogress={heroExitProgress} />

    </Wrapper>

    <Experiences containerRef={experiencesRef} scrollYProgress={experiencesScrollYProgress} />

    <div style={{ position: 'relative' }} ref={personalProjectsRef}>
      <PersonalProjects $inView={inView && !aboutMeSettled} aboutMeScrollYProgress={aboutMeScrollYProgress} />
      <AboutMe containerRef={aboutMeRef} scrollYProgress={aboutMeScrollYProgress} />
      <FooterPage />
    </div>

  </>
  )
}
