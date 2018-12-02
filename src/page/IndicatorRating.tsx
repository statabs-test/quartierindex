import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Rootstate } from '../state/index'
import { getSelectedIndicators } from '../state/indicator/selectors'
import { Indicator } from '../state/indicator/types'
import { toggleIndicatorSelectionVisibility } from '../state/util/actions'
// import Grid from '@material-ui/core/Grid'
import IndicatorRatingLine from '../component/selection/IndicatorRatingLine'
import RatingNavigation from '../component/navigation/RatingNavigation'
import WizardLayout from 'src/component/layout/WizardLayout'

export interface Props {
  selectedIndicators: Indicator[]

  positiveValuation(id: string): void

  negativeValuation(id: string): void

  toggleVisibility(visibility: boolean): void
}

const IndicatorRating: React.SFC<Props> = props => {
  const { selectedIndicators } = props

  return (
    <WizardLayout>
      <div className="wizardDescription">
        Bitte legen Sie hier für jeden Indikator fest, ob ein hoher Wert für Sie positiv oder
        negativ ist.
        <br />
        Ein Beispiel: Wenn Sie keinen hohen Anteil an Einfamilienhäuser haben wollen, weisen Sie dem
        entsprechenden Indikator das Attribut "negativ" zu.
        <br />
        Die Ausgangseinstellung ist für jeden ausgewählten Indikator "positiv" gesetzt.
      </div>
      <div className="mainFrame">
        <h2 className="wizardTitle">
          Schritt 2: Legen Sie fest, ob ein hoher Wert eines Indikators positiv oder negativ ist
        </h2>
          <div className="rating">
            <div className="ratingLeft">
              {selectedIndicators.map(indicator => {
                return <IndicatorRatingLine key={indicator.id} indicator={indicator} />
              })}
            </div>
            <div className="raitingRight">
              {selectedIndicators.map(indicator => {
                return <div className="indicatorRatingDescription" key={indicator.id}>{indicator.description}</div>
              })}
            </div>
          </div>
        </div>
        <RatingNavigation />
    </WizardLayout>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
})

const mapDispatchToProps = {
  toggleVisibility: toggleIndicatorSelectionVisibility,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorRating)
