import { Grid } from '@material-ui/core'
import NavButton from '../customElements/NavButton'
import * as React from 'react'

interface WeightNavigationProps {}

const WeightNavigation: React.SFC<WeightNavigationProps> = props => {
  return (
    <div className="wizardFooter">
      <Grid container justify="flex-end">
        <Grid item xs={2}>
          <NavButton className="wizard-left-button" variant="raised" to={'/plot'}>
            Rangliste erstellen
          </NavButton>
        </Grid>

        <Grid item xs={8}>
          <p className="stepper-description">
            «Rangliste erstellen» zeigt die Rangliste als Ergebnis Ihrer Indikatoren-Auswahl und der
            oben eingestellten Gewichtung der Indikatoren an. Alle Bewertungen und Gewichtungen
            können auch direkt in der Ergebnisdarstellung beliebig oft neu eingestellt werden.
          </p>
        </Grid>

        <Grid item xs={2}>
          <NavButton className="wizard-right-button" variant="raised" to={'/ranking'}>
            Zurück zu Bewertung
          </NavButton>
          <NavButton className="wizard-right-button" variant="raised" to="/">
            Zurück zur Auswahl
          </NavButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default WeightNavigation
