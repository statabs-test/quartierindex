import { AxisDomain } from 'recharts';

export const getTicks = (domain: [AxisDomain, AxisDomain], nTicks: number): Number[] => {
  const calcOffset = (n1: number, n2: number): number => {
    if ((n1 <= 0 && n2 <= 0) || (n1 >= 0 && n2 >= 0))
      return Math.abs(Math.abs(n1) - Math.abs(n2)) / (nTicks - 1)

    return (Math.abs(n1) + Math.abs(n2)) / (nTicks - 1)
  }
  const min = Number(domain[0])
  const max = Number(domain[1])
  const offset = calcOffset(min, max)

  return Array(nTicks)
    .fill(min)
    .map((v, index) => v + offset * index)
}

export const domainOf = (
  data: { id: string; name: string; value: number }[]
): [AxisDomain, AxisDomain] => {
  const values = data.map(d => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (values.length === 0) return [0, 0]
  return [min, max]
}


