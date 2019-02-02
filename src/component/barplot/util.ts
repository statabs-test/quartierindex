import { AxisDomain } from 'recharts';

export const asDomain = (ticks: number[])
  : [AxisDomain, AxisDomain] => {
  if (ticks.length === 0) return [0, 0]
  else return [ticks[0], ticks[ticks.length - 1]]
}

export const getTicks = (
  data: { id: string; name: string; value: number }[]
)
  : number[] => {
  const minMax = getMinMax(data)
  const baseTicks = getBaseTicks(minMax)
  const exponent = getExponent(minMax, baseTicks)
  const ticks = baseTicks.map(b => b * Math.pow(10, exponent))
  return ticks
}

const getBaseTicks = (minMax: { min: number, max: number })
  : number[] => {
  const min = minMax.min
  const max = minMax.max
  const getCondition = ()
    : 'bothNegative' | 'negativePositive' | 'bothPositive' => {
    if (min < 0 && max < 0) return 'bothNegative'
    else if (min < 0 && max > 0) return 'negativePositive'
    else return 'bothPositive'
  }

  switch (getCondition()) {
    case 'bothNegative':
      return [-1, -0.75, -0.5, -0.25, 0]
    case 'negativePositive':
      return [-1, -0.5, 0, 0.5, 1]
    case 'bothPositive':
      return [0, 0.25, 0.5, 0.75, 1]
  }
}

const getExponent = (minMax: { min: number, max: number }, bases: number[])
  : number => {
  return -1
}

const getMinMax = (
  data: { id: string; name: string; value: number }[]
): { min: number, max: number } => {
  const values = data.map(d => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (values.length === 0) return {min: 0, max: 0}
  return {min: min, max: max}
}

