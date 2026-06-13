import {
  Cog,
  Database,
  Image,
  Lightbulb,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import { memo } from 'react'
import type { IconType } from 'react-icons'
import { SiMongodb, SiPostgresql, SiRedis } from 'react-icons/si'

import type { TAppIcon, TServiceBrand } from '@/api/types'
import { cn } from '@/lib/utils'

const appIconMap: Record<TAppIcon, LucideIcon> = {
  lightbulb: Lightbulb,
  cog: Cog,
  rocket: Rocket,
  image: Image,
  database: Database,
}

interface IAppGlyphProps {
  icon: TAppIcon
  color: string
  className?: string
}

export const AppGlyph = memo(function AppGlyph({
  icon,
  color,
  className,
}: IAppGlyphProps): JSX.Element {
  const Icon = appIconMap[icon]
  return (
    <span
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
        className
      )}
      style={{ backgroundColor: color }}
    >
      <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2.2} />
    </span>
  )
})

const brandMap: Record<TServiceBrand, { Icon: IconType; color: string }> = {
  postgres: { Icon: SiPostgresql, color: '#4f9bd9' },
  redis: { Icon: SiRedis, color: '#ff4438' },
  mongodb: { Icon: SiMongodb, color: '#4faa41' },
}

interface IServiceBrandGlyphProps {
  brand: TServiceBrand
  className?: string
}

export const ServiceBrandGlyph = memo(function ServiceBrandGlyph({
  brand,
  className,
}: IServiceBrandGlyphProps): JSX.Element {
  const { Icon, color } = brandMap[brand]
  return (
    <span
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.04]',
        className
      )}
    >
      <Icon size={17} color={color} />
    </span>
  )
})
