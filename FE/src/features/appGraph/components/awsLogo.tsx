import { memo } from 'react'
import { FaAws } from 'react-icons/fa'

interface IAwsLogoProps {
  className?: string
  size?: number
}

export const AwsLogo = memo(function AwsLogo({
  className,
  size = 34,
}: IAwsLogoProps): JSX.Element {
  return <FaAws size={size} color="#ff9900" className={className} />
})
