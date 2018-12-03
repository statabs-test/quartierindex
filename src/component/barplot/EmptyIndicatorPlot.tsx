import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export interface EmptyIndicatorPlotProps {}

const EmptyIndicatorPlot: React.SFC<EmptyIndicatorPlotProps> = ({}) => {
  const data: any = [] // }, { value: , name: 'test' }]

  return (
    <div className="bar-plot bar-plot-empty">
      <BarChart data={data} layout="vertical" width={190} height={530}>
        <CartesianGrid />

        <XAxis domain={[0, 1]} type="number" />
        {<YAxis dataKey="name" type="category" orientation="right" axisLine={false} hide={true} />}
        <Bar dataKey="value" />
      </BarChart>
    </div>
  )
}

export default EmptyIndicatorPlot
