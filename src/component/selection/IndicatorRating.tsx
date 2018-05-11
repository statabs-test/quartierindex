import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import IndicatorRatingLine from './IndicatorRatingLine';

export interface Props {
  selectedIndicators: Indicator[]

  positiveValuation(id: string): void

  negativeValuation(id: string): void

  toggleVisibility(visibility: boolean): void
}

type ClassNames = WithStyles<'root' | 'title' | 'leftIcon'>

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: '#1D4E2C',
  } as React.CSSProperties,
  leftIcon: {
    marginRight: theme.spacing.unit,
  } as React.CSSProperties,
});

const IndicatorRating: React.SFC<Props & ClassNames> = (props) => {
  const {classes, selectedIndicators} = props;
  console.log(classes);
  return (
      <div className="floating-container">
        <Grid item xs={12}>
          <h2 className={classes.title}>
            Schritt 2: Bewerten Sie, ob der Indikator positiv oder negativ ausfällt
          </h2>
          <Grid container direction="row">
            {
              selectedIndicators.map(indicator => {
                return <IndicatorRatingLine key={indicator.id} indicator={indicator}/>
              })}
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={1}>
              <Link to={'/'}>
                <Button variant="raised">Zurück</Button>
              </Link>
            </Grid>
            <Grid item xs={1}>
              <Link to={'/importance'}>
                <Button variant="raised">Weiter</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  toggleVisibility: toggleIndicatorSelectionVisibility,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
(IndicatorRating);