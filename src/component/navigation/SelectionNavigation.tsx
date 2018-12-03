import * as React from 'react'
import { Grid } from '@material-ui/core'
import NavButton from '../customElements/NavButton'

interface SelectionNavigationProps {
  valid: boolean
}

const SelectionNavigation: React.SFC<SelectionNavigationProps> = ({ valid }) => {
  return (
    <div className="wizardFooter">
      <Grid container justify="space-between">
        <Grid item xs={2}>
          <NavButton className="wizard-left-button" disabled={!valid} variant="raised" to={'/plot'}>
            Rangliste erstellen
          </NavButton>
        </Grid>
        <Grid className={valid ? 'showDescription' : 'hideDescription'} item xs={8}>
          {}
          <p className="stepper-description">
            «Rangliste erstellen» zeigt direkt die Rangliste als Ergebnis Ihrer Indikatoren-Auswahl
            an.
            <br />
            In diesem Fall wird für jeden ausgewählten Indikator angenommen, dass ein hoher Wert für
            Sie positiv und der Indikator sehr wichtig ist. Alternativ dazu können sie die Bewertung
            und die Gewichtung in separaten Arbeitsschritten für jeden ausgewählten Indikator
            einzeln anpassen.
          </p>
        </Grid>

        <Grid item xs={2}>
          <NavButton
            className="wizard-right-button"
            disabled={!valid}
            variant="raised"
            to={'/ranking'}
          >
            Weiter zur Bewertung
          </NavButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default SelectionNavigation
