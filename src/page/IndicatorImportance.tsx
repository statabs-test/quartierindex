import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../state/index';
import { getSelectedIndicators } from '../state/indicator/selectors';
import { Indicator } from '../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import NavButton from '../component/customElements/NavButton';
import IndicatorImportanceLine from '../component/selection/IndicatorImportanceLine';
import { Redirect } from 'react-router';

export interface Props {
  selectedIndicators: Indicator[]

  positiveValuation(id: string): void

  negativeValuation(id: string): void

  toggleVisibility(visibility: boolean): void
}

type ClassNames = WithStyles<'root' | 'leftIcon'>

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  } as React.CSSProperties,
  leftIcon: {
    marginRight: theme.spacing.unit,
  } as React.CSSProperties,
});

const IndicatorImportance: React.SFC<Props & ClassNames> = (props) => {
  const {selectedIndicators} = props;
  if (selectedIndicators.length === 0) {
    return <Redirect to="/"/>
  }
  return (
      <div className="floating-container">
        <Grid item xs={12}>
          <h2>
            Schritt 3: Geben Sie an, wie wichtig der Indikator für Sie ist
          </h2>
          <p>
              Mit der Gewichtung wird festgelegt, wie stark ein Indikator in die Index-Berechnung einfliesst.
              Folgende Gewichte sind wählbar:
          </p>
          <p>
            sehr unwichtig: 0.25, eher unwichtig: 0.5, eher wichtig: 0.75, sehr wichtig: 1.0
          </p>
          <Grid container direction="row">
            {
              selectedIndicators.map(indicator => {
                return <IndicatorImportanceLine key={indicator.id} indicator={indicator}/>
              })}
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={1}>
              <NavButton variant="raised" to={'/ranking'}>Zurück</NavButton>
            </Grid>
            <Grid item xs={2}>
              <NavButton variant="raised" to={'plot'}>Weiter</NavButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
(IndicatorImportance);
