'use client'

import { useRef, useContext } from 'react'

import { useScroll } from 'motion/react'

import { StyledProjectsContainer, StyledStickyContainer } from './projects.styled'

import { ContentfulContext } from '../../../context/contentful'

import { PersonalProjectData } from '@/app/types/data'

const Projects = () => {
  const { personalProjects } = useContext(ContentfulContext)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['25% end', 'end end'],
  })

  return (
    <StyledProjectsContainer ref={containerRef}>
      <StyledStickyContainer>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, background: 'radial-gradient( circle 450px at 95% 20%,  rgba(82,6,135,1) 0%, rgba(22,1,34,1) 100.3% )' }} />
          <div style={{ flex: 1, background: '#dc39de' }} />
          <div style={{ flex: 1, background: 'linear-gradient( 127deg,  #97e4b3 3.5%, rgba(251,234,255,1) 128% )' }} />
        </div>
      </StyledStickyContainer>
    </StyledProjectsContainer>
  )
}

export default Projects
