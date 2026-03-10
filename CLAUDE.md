# Project Overwview

This is a portfolio project, one page only and following the design and technical specifications detailed below, this is a summary of sections to build

- Navbar
- Hero
- Experiences timeline
- Personal Projects
- About me and contact links
- Footer

`Content models are detailed in ./contentModels.json`

## Project Structure

- src/app
  - /components (general components like paragrahp, buttons)
    - /layout (layout components like navbar, hero etc..)
  - /layouts (for next.js layouts)
  - /context (for react.js context providers)
  - /utils (utility functions or constants)
  - /types (typescript types)

## Folder Structure

- Only for pages or components

* component should go inside (ComponentName).tsx and exported default in index.tsx
* if styles needed place them in a same-level file (componentName).tsx

## Component Structure

When creating or modifying a component, take in account to follow this file order

```
## React or third-party imports

## Redux, context or hooks imports

## Styled components from (componentName).style.tsx imports

## Components imports

## utils, constants imports

## types imports


type ComponentProps: React.FC<> = {
  ...
}

const ComponentName: ComponentProps = () => {
  ## Theme or context selectors

  ## use states

  ## constants

  ## use effects

  ## function and other logic

  return (
    <>...</>
  )

}

export default ComponentName
```

## Stack

- Next.js 15 (App Router)
- TypeScript (strict mode)
- styled-components v6 (SSR via registry pattern)
- Contentful (headless CMS, Content Delivery API)
- Framer-motion (Animations)

## Design System

### Fonts

- General sans
- Satoshi
- Zina regular
- Array

> All fonts coming from www.fontshare.com

### Color Palette

- Background: #FDECC0
- Title: #1A1A1A
- Text: #5C5C5C
- Auxiliar: #FF6B6B
- Auxiliar light: #FFA69E
- Secondary : #B7E8D6

### Design Style

- Glass liquid ornaments
- Grain texture for background
- Radial dot fade background for hero
