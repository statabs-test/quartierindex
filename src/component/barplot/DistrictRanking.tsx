import * as React from 'react'
import { round } from 'lodash'
import { connect } from 'react-redux'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Rootstate } from '../../state'
import { getSortedGlobalRanking } from '../../state/observation/selectors'
import { Rank } from 'src/state/observation/types'
import { Indicator } from 'src/state/indicator/types'
import { allDistrictsById } from 'src/state/district/selectors'
import { getSelectedIndicators } from 'src/state/indicator/selectors'
import { District } from 'src/state/district/types'

export interface PublicProps {
    className?: string
}

interface InjectedProps {
    ranks: Rank[]
    districts: { [key: string]: District }
    indicators: Indicator[]
}

const DistrictRanking: React.StatelessComponent<PublicProps & InjectedProps> = ({
                                                                                    districts,
                                                                                    ranks,
                                                                                    indicators,
                                                                                }) => {
    const data = ranks.map((rank, i) => {
        const rankNum = i + 1
        return {
            name: rankNum + '. ' + districts[rank.districtId].name,
            value: round(rank.value, 2),
        }
    })

    return (
        <div className="left-grid district-ranking">
            <div className="container">
                {/* District ranking bar plot */}
                <BarChart data={data} width={280} height={530} layout="vertical">
                    <CartesianGrid/>
                    // TODO: Check color of bar
                    <XAxis domain={[-1, 1]} type="number" />
                    <YAxis
                        width={130}
                        // mirror
                        dataKey="name"
                        type="category"
                        orientation="right"
                        axisLine={false}
                    />
                    <Bar dataKey="value" fill="#FFD300"/>
                </BarChart>
                <div className="districtRankingExplanation">
                    Berechnungsergebnis aus:
                    <div className="districtRankingExplanationList">
                    {indicators.map((indicator, i) => {
                        return <div key={indicator.id}>
                                - {indicator.name} mit einer Gewichtung von {indicator.weight * indicator.valuation}
                                </div>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: Rootstate) => ({
    ranks: getSortedGlobalRanking(state),
    districts: allDistrictsById(state),
    indicators: getSelectedIndicators(state),
})

export default connect(mapStateToProps)(DistrictRanking)
