import { memo } from 'react'

import { Slider } from '@/components/ui/slider'

interface IMetricSliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  className?: string
}

export const MetricSlider = memo(function MetricSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className,
}: IMetricSliderProps): JSX.Element {
  return (
    <Slider
      className={className}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(next) => onValueChange?.(next[0])}
      trackClassName="h-2 bg-[linear-gradient(90deg,#3b82f6_0%,#22c55e_55%,#ef4444_100%)]"
      rangeClassName="bg-transparent"
    />
  )
})
