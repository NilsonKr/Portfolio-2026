'use client'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useScroll, useInView, useMotionValueEvent } from 'motion/react'

import { Wrapper, StyledBackground, StyledNoiseBackground } from './page.style'

import HeroHeader from './components/layout/HeroHeader'
import HeroFooter from './components/layout/HeroFooter'
import Hero from './components/layout/Hero'

const DotsBackgroundModule = dynamic(() => import('./components/DotsBackground'))
const ExperiencesModule = dynamic(() => import('./components/layout/Experiences'))
const ProjectsModule = dynamic(() => import('./components/layout/Projects'))
const AboutMeModule = dynamic(() => import('./components/layout/AboutMe'))
const FooterPageModule = dynamic(() => import('./components/layout/FooterPage'))

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
      <DotsBackgroundModule />
      <Hero containerRef={heroRef} />
      <HeroFooter scrollYprogress={heroExitProgress} />

    </Wrapper>

    <ExperiencesModule containerRef={experiencesRef} scrollYProgress={experiencesScrollYProgress} />

    <div style={{ position: 'relative' }} ref={personalProjectsRef}>
      <ProjectsModule $inView={inView && !aboutMeSettled} aboutMeScrollYProgress={aboutMeScrollYProgress} />
      <AboutMeModule containerRef={aboutMeRef} scrollYProgress={aboutMeScrollYProgress} />
      <FooterPageModule />
    </div>

  </>
  )
}
