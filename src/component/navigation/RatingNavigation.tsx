import { Grid } from '@material-ui/core'
import NavButton from '../customElements/NavButton'
import * as React from 'react'

interface RatingNavigationProps {}

const RatingNavigation: React.SFC<RatingNavigationProps> = props => {
  return (
    <div className="wizardFooter">
      <Grid container justify="flex-end">
        <Grid item xs={2}>
          <NavButton className="wizard-left-button" variant="contained" to="/">
            Zurück zur Auswahl
          </NavButton>
        </Grid>

        <Grid item xs={8}>
          <p className="stepper-description text">
            «Rangliste erstellen» zeigt direkt die Rangliste als Ergebnis Ihrer Indikatoren-Auswahl
            und der oben eingestellten Bewertung der Indikatoren an. Alle Indikatoren fliessen mit
            demselben Gewicht von 1 (= sehr wichtig) in die Berechnung ein. Alternativ dazu können
            Sie die Gewichtung im nächsten Arbeitsschritt für jeden ausgewählten Indikator anpassen.
          </p>
        </Grid>

        <Grid item xs={2}>
          <NavButton className="wizard-right-button" variant="contained" to={'/importance'}>
            Weiter zur Gewichtung
          </NavButton>
          <NavButton className="wizard-right-button" variant="contained" to={'/plot'}>
            Rangliste erstellen
          </NavButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default RatingNavigation
