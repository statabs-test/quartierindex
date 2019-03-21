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
  const ticks = getBaseTicks(minMax)
  return ticks
}

const getBaseTicks = (minMax: { min: Number, max: Number })
  : number[] => {

  const min = minMax.min
  const max = minMax.max

  const getDecimals = (n: Number): Number => {
    const nAsString = n.toString().replace('.', '').replace('-', '')
    if (nAsString.charAt(0) !== '0') {
      return 0
    } else {
      let decimal = 1
      while (nAsString.charAt(decimal) === '0') {
        decimal++
      }

      return decimal
    }
  }


  const getSmallerDecimal = (): Number => {
    const minDecimal = getDecimals(min)
    const maxDecimal = getDecimals(max)
    if (minDecimal > maxDecimal) {
      return maxDecimal
    }
    return minDecimal
  }

  const decimals = getSmallerDecimal()
  const minTick = (): number => {
    if (min === -1 ) {
      return -1
    }
    return Number((min.valueOf() - Math.pow(10, - decimals.valueOf())).toFixed(decimals.valueOf()))
  }

  const maxTick = (): number => {
    if (max === 1) {
      return 1
    } else {
      const roundingErrorCorrection = Math.pow(10, -decimals)
      return Number((Number(max.toFixed(decimals.valueOf())) + roundingErrorCorrection).toFixed(decimals.valueOf()))
    }
  }

  const withMiddleTick = (minTick: number, maxTick: number): number[] => {
    let diff = 0
    if (minTick === maxTick) {
      const offset = Math.pow(10, decimals.valueOf())
      return [minTick - offset, minTick, maxTick + offset]
    }

    if (minTick + Math.pow(10, decimals.valueOf()).toFixed(decimals.valueOf()) === maxTick.toString()) {
      const offset = Math.pow(10, decimals.valueOf())
      return [minTick - offset, minTick, maxTick]
    }

    if (minTick < 0 && maxTick > 0) {
      diff = Math.abs(minTick) + maxTick
    } else {
      diff = Math.abs(Math.abs(minTick) - Math.abs(maxTick))
    }
    const middleTick = Number((minTick + diff / 2).toFixed(decimals.valueOf()))
    return [minTick, middleTick, maxTick]
  }

  return withMiddleTick(minTick(), maxTick())
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

