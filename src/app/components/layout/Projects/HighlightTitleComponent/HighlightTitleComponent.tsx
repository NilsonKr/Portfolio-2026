import React from 'react'

import { StyledHighlight } from './highlightTitle.style'

import SubtitleComponent from '@/app/components/SubtitleComponent'

import { SubtitleComponentProps } from '@/app/components/SubtitleComponent/SubtitleComponent'

type ComponentProps = Omit<SubtitleComponentProps, 'children'> & {
  title: string
  highlightString: string
  highlightColor: string
}

const HighlightTitleComponent: React.FC<ComponentProps> = ({
  title,
  highlightString,
  highlightColor,
  ...subtitleProps
}) => {
  const index = title.indexOf(highlightString)

  if (index === -1) {
    return <SubtitleComponent {...subtitleProps}>{title}</SubtitleComponent>
  }

  const before = title.slice(0, index)
  const after = title.slice(index + highlightString.length)

  return (
    <SubtitleComponent {...subtitleProps}>
      {before}
      <StyledHighlight $color={highlightColor}>{highlightString}</StyledHighlight>
      {after}
    </SubtitleComponent>
  )
}

export default HighlightTitleComponent
