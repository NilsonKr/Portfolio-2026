import { IoMdDownload } from "react-icons/io";

import { StyledButton } from './downloadCVButton.styled'

import ParagraphComponent from '@/app/components/ParagraphComponent'

type ComponentProps = {
  cvUrl?: string
  fileName?: string
}

const DownloadCVButton: React.FC<ComponentProps> = ({ cvUrl, fileName = 'Nilson_Diaz_CV.pdf' }) => {

  const handleDownload = async () => {
    if (!cvUrl) return

    const response = await fetch(`https:${cvUrl}`)
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = objectUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(objectUrl)
  }

  return (
    <StyledButton
      onClick={handleDownload}
      disabled={!cvUrl}
      aria-label='Download updated CV'
      aria-disabled={!cvUrl}
    >
      <ParagraphComponent fontSize='1.1rem' fontWeight={600}>
        <span style={{ marginRight: 15 }}>[</span>
        <IoMdDownload size={24} style={{ marginRight: 10, transform: 'translateY(7px)' }} />
        Download updated CV
        <span style={{ marginLeft: 15 }}>]</span>
      </ParagraphComponent>
    </StyledButton>
  )
}

export default DownloadCVButton