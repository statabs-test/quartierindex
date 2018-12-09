import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export interface EmptyIndicatorPlotProps {}

const EmptyIndicatorPlot: React.SFC<EmptyIndicatorPlotProps> = ({}) => {
  const data: any = [] // }, { value: , name: 'test' }]

  const ticks = [0, 0.25, 0.5, 0.75, 1]
  return (
    <div className="bar-plot bar-plot-empty">
      <BarChart data={data} layout="vertical" width={190} height={530}>
        <CartesianGrid />

        <XAxis
          axisLine={false}
          domain={[0, 1]}
          type="number"
          tickLine={false}
          ticks={ticks}
          tickFormatter={tick => (ticks.indexOf(tick) % 2 === 0 ? tick : '')}
        />
        {
          <YAxis
            dataKey="name"
            type="category"
            orientation="right"
            axisLine={false}
            hide={true}
            tickLine={false}
          />
        }
        <Bar dataKey="value" />
      </BarChart>
    </div>
  )
}

export default EmptyIndicatorPlot
