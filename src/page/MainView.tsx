import * as React from 'react'
import { connect } from 'react-redux'
import { Rootstate } from '../state/index'
import { getLineRanking } from '../state/observation/selectors'
import ParallelLinePlot from '../component/parallelLinePlot/ParallelLinePlot'
import DistrictRanking from '../component/ranking/DistrictRanking'
import AppNavigation from '../component/navigation/MainNavigation'

// import { Observation } from '../../state/observation/types'

export interface Props {}

const MainView: React.StatelessComponent<Props> = ({}) => {
  return (
    <div className="App">
      <AppNavigation />
      <ParallelLinePlot />
      <DistrictRanking />
    </div>
  )
}

const mapStateToProps = (state: Rootstate): Props => ({
  rankings: getLineRanking(state),
})

export default connect<Props>(mapStateToProps)(MainView)
