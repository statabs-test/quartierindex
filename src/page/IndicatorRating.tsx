import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Rootstate } from '../state/index'
import { getSelectedIndicators } from '../state/indicator/selectors'
import { Indicator } from '../state/indicator/types'
import { toggleIndicatorSelectionVisibility } from '../state/util/actions'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
import IndicatorRatingLine from '../component/selection/IndicatorRatingLine'
import RatingNavigation from '../component/navigation/RatingNavigation'
import WizardLayout from 'src/component/layout/WizardLayout'

export interface Props {
  selectedIndicators: Indicator[]

  positiveValuation(id: string): void

  negativeValuation(id: string): void

  toggleVisibility(visibility: boolean): void
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
  })

const IndicatorRating: React.SFC<Props & WithStyles<typeof styles>> = props => {
  const { selectedIndicators } = props

  return (
    <WizardLayout>
      <div className="wizardDescription">
        Bitte legen Sie hier für jeden Indikator fest, ob ein hoher Wert für 
        Sie positiv oder negativ ist.<br />
        Ein Beispiel: Wenn Sie keinen hohen Anteil an Einfamilienhäuser haben wollen, 
        weisen Sie dem entsprechenden Indikator das Attribut "negativ" zu.<br />
        Die Ausgangseinstellung ist für jeden ausgewählten Indikator "positiv" gesetzt.
      </div>
      <div className="mainFrame">
      <h2 className="wizardTitle">
        Schritt 2: Bewerten Sie, ob der Indikator positiv oder negativ ausfällt
      </h2>
      <Grid container direction="row">
        {selectedIndicators.map(indicator => {
          return <IndicatorRatingLine key={indicator.id} indicator={indicator} />
        })}
      </Grid>
      <RatingNavigation />
      </div>
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
  ),
  withStyles(styles)
)(IndicatorRating)
