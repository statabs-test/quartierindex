import * as React from 'react'
import { connect } from 'react-redux'
import { Rootstate } from '../../state'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import { Indicator } from '../../state/indicator/types'
import NavButton from '../customElements/NavButton'
import './navigation.css'
import { compose } from 'recompose'

export interface Props {
  selectedIndicators: Indicator[]
}

const AppNaviation: React.SFC<Props> = ({ selectedIndicators }) => {
  const disabled = selectedIndicators.length <= 0

  return (
    <div className="right-grid navigation">
      <NavButton className="nav-button" variant="contained" to={'/'}>
        Auswahl ändern
      </NavButton>

      <NavButton className="nav-button" disabled={disabled} variant="contained" to={'ranking'}>
        Bewertung ändern
      </NavButton>

      <NavButton className="nav-button" disabled={disabled} variant="contained" to={'/importance'}>
        Gewichtung ändern
      </NavButton>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
})

export default compose<Props, {}>(
  connect(
    mapStateToProps,
    undefined
  )
)(AppNaviation)
