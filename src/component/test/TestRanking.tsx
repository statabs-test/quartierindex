import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { Rootstate } from '../../state'
import { allDistricts } from '../../state/district/selectors'
import {
  groupObservationsByDistrict,
  getSortedGlobalRanking,
} from '../../state/observation/selectors'
import { District } from '../../state/district/types'
import { Rank } from '../../state/observation/types'
import { Indicator } from '../../state/indicator/types'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import TestIndicatorRanking from './TestIndicatorRanking'
// import { Observation } from '../../state/observation/types'

export interface Props {
  districts: District[]
  observations: any
  rankings: Rank[]
  selectedIndicators: Indicator[]
}

function TestRanking({ districts, rankings, selectedIndicators }: Props) {
  return (
    <div>
      <h1>Test Ranking</h1>
      {// Create an element per indicator item
      rankings.map(ranking => {
        const district = _.find(districts, { id: ranking.districtId })
        if (district) {
          return (
            <p key={ranking.districtId}>
              {district.id} {district.name}
              calculated value:{' '}
              {JSON.stringify(ranking)
              /*observations[district.id].map(observation => {
                            return <span key={observation.id}>{observations.value}, </span>
                          })*/
              }
            </p>
          )
        } else {
          throw new RangeError('Every districtId of ranking needs to exist in districts')
        }
      })}

      <h1>Test indicator Rating</h1>
      {selectedIndicators.map(indicator => {
        return <TestIndicatorRanking key={indicator.id} id={indicator.id} />
      })}
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  observations: groupObservationsByDistrict(state),
  rankings: getSortedGlobalRanking(state), // calculatedRankingByDistrictOverall(state)
  selectedIndicators: getSelectedIndicators(state),
})

export default connect(mapStateToProps)(TestRanking)
