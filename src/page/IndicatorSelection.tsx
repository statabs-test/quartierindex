import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../state/index'
import { getGroupedIndicators, getSelectedIndicators } from '../state/indicator/selectors'
import { Indicator } from '../state/indicator/types'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
import IndicatorSelectionGroup from '../component/selection/IndicatorSelectionGroup'
import SelectionNavigation from 'src/component/navigation/SelectionNavigation'
import WizardLayout from 'src/component/layout/WizardLayout'

export interface PublicProps {}

export interface Props {
  groupedIndicators: { [key: string]: Indicator[] }
  valid: boolean
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3,
    },
    title: {
      padding: theme.spacing.unit * 2,
    },
  })

const IndicatorSelection: React.SFC<Props & WithStyles<typeof styles>> = props => {
  const { groupedIndicators, valid } = props
  const numIndicators = _.reduce(groupedIndicators, (sum, indicatorGroup) => (indicatorGroup.length + sum), 0); 
  return (
    <WizardLayout ignoreRedirect>
      <div className="wizardDescription">
        Willkommen beim Wohnviertel- und Gemeinde-Index. Hier können Sie anhand ausgesuchter Merkmale Ihre eigene
        Quartier-Rangliste erstellen.<br />
        Bitte wählen Sie in einem ersten Schritt zwischen 1 und {numIndicators} Indikatoren aus, welche in die 
        Index-Berechnung einfliessen sollen.<br />
        In einem nächsten Schritt können Sie bestimmen, ob Sie einen hohen Wert eines Indikators als positiv 
        oder als negativ beurteilen.<br />
        Im dritten Schritt können Sie festlegen, mit welcher Gewichtung ein ausgewählter Indikator in Ihre 
        Berechnung einfliessen soll.
      </div>
        <div className="mainFrame">
          <h2 className="wizardTitle">
            Schritt 1: Wählen Sie mindestens einen Indikator für die Index Berechnung aus
          </h2>
          <Grid container spacing={0}>
            {_.map(groupedIndicators, (value, key) => (
              <IndicatorSelectionGroup key={key} groupName={key} value={value} />
            ))}
          </Grid>

        <SelectionNavigation valid={valid} />
      </div>
    </WizardLayout>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  groupedIndicators: getGroupedIndicators(state),
  valid: getSelectedIndicators(state).length > 0,
})

const mapDispatchToProps = {}

export default compose<Props, PublicProps>(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorSelection)
