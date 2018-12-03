import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import { Indicator } from '../../state/indicator/types'
// import Grid from '@material-ui/core/Grid'
// import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { setNegativeValuation, setPositiveValuation } from '../../state/indicator/actions'
import { getClassNameSelectedUnselected } from '../../helpers'

export interface PublicProps {
  indicator: Indicator
}

type Props = {
  positiveValuation(id: string): void
  negativeValuation(id: string): void
} & PublicProps

const IndicatorRatingLine: React.SFC<Props> = props => {
  const { positiveValuation, negativeValuation, indicator } = props
  return (
    <div className="ratingLine">
      <div className="ratingLineText">
        <p>{indicator.valuationText}</p>
      </div>
      <div className="ratingLineButtons">
        <button
          className={'ratingButton' + getClassNameSelectedUnselected(indicator, 'positive')}
          onClick={() => positiveValuation(indicator.id)}
        >
          <Icon style={{ paddingRight: '5px' }}>mood</Icon>
          Positiv
        </button>

        <button
          className={'ratingButton' + getClassNameSelectedUnselected(indicator, 'negative')}
          onClick={() => negativeValuation(indicator.id)}
        >
          <Icon style={{ paddingRight: '5px' }}>mood_bad</Icon>
          Negativ
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
})

const mapDispatchToProps = {
  positiveValuation: setPositiveValuation,
  negativeValuation: setNegativeValuation,
}

export default compose<Props, PublicProps>(
  // withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorRatingLine)
