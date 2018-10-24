import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Rootstate } from '../state/index'
import { getSelectedIndicators } from '../state/indicator/selectors'
import { Indicator } from '../state/indicator/types'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
import IndicatorImportanceLine from '../component/selection/IndicatorImportanceLine'
import WeightNavigation from 'src/component/navigation/WeightNavigation'
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

const IndicatorWeight: React.SFC<Props & WithStyles<typeof styles>> = props => {
  const { selectedIndicators } = props
  return (
    <WizardLayout>
      <h2 className="wizardTitle">
        Schritt 3: Geben Sie an, wie wichtig der Indikator für Sie ist
      </h2>
      <p>
        Mit der Gewichtung wird festgelegt, wie stark ein Indikator in die Index-Berechnung
        einfliesst. Folgende Gewichte sind wählbar:
      </p>
      <p>sehr unwichtig: 0.25, eher unwichtig: 0.5, eher wichtig: 0.75, sehr wichtig: 1.0</p>

      <Grid container direction="row">
        {selectedIndicators.map(indicator => {
          return <IndicatorImportanceLine key={indicator.id} indicator={indicator} />
        })}
      </Grid>

      <WeightNavigation />
    </WizardLayout>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
})

const mapDispatchToProps = {}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorWeight)
