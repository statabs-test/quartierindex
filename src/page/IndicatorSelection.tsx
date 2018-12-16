import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../state/index'
import { getGroupedIndicators, getSelectedIndicators } from '../state/indicator/selectors'
import { Indicator } from '../state/indicator/types'
// import Grid from '@material-ui/core/Grid'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import IndicatorSelectionGroup from '../component/selection/IndicatorSelectionGroup'
import SelectionNavigation from '../component/navigation/SelectionNavigation'
import WizardLayout from '../component/layout/WizardLayout'
import Disclaimer from '../component/disclaimer/Disclaimer'
import { welcome } from './welcome';

export interface PublicProps {
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

export type Props = {
  groupedIndicators: { [key: string]: Indicator[] }
  valid: boolean
} & WithStyles<typeof styles>

const IndicatorSelection: React.SFC<Props> = props => {
  const { groupedIndicators, valid } = props
  const numIndicators = _.reduce(
    groupedIndicators,
    (sum, indicatorGroup) => indicatorGroup.length + sum,
    0
    )
  return (
    <WizardLayout ignoreRedirect>

      {welcome(
        `Herzlich Willkommen bei "Finden Sie Ihr Lieblingswohnviertel"!
              Auf dieser Seite können Sie Ihre ganz persönliche Rangliste der
              Basler Wohnviertel und Gemeinden erstellen.
          `
      )}
      <div className="wizardDescription text">
        Bitte wählen Sie in einem ersten Schritt zwischen 1 und {numIndicators} Indikatoren aus,
        welche in die Index-Berechnung einfliessen sollen.
        <br/>
        In einem nächsten Schritt können Sie bestimmen, ob Sie einen hohen Wert eines Indikators als
        positiv oder als negativ beurteilen.
        <br/>
        Im dritten Schritt können Sie festlegen, mit welcher Gewichtung ein ausgewählter Indikator
        in Ihre Berechnung einfliessen soll.
      </div>
      <div className="mainFrame">
        <h2 className="wizardTitle">
          Schritt 1: Wählen Sie mindestends einen Indikator aus
        </h2>
        <div className="selections">
          {_.map(groupedIndicators, (value, key) => (
            <IndicatorSelectionGroup key={key} groupName={key} value={value}/>
          ))}
        </div>
        <SelectionNavigation valid={valid} />
        <Disclaimer />
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
