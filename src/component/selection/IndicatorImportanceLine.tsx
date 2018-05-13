import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator, WeightNumber } from '../../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Radio from 'material-ui/Radio';
import { setWeight } from '../../state/indicator/actions';

export interface Props {
  indicator: Indicator

  setIndicatorWeight(id: string, weight: WeightNumber): void
}

type ClassNames = WithStyles<'root' | 'title' | 'leftIcon' | 'textCentered' >

export const styles = (theme: Theme) => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: '#1D4E2C',
  } as React.CSSProperties,
  leftIcon: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  } as React.CSSProperties,
  textCentered: {
    display: 'inline-block'
  } as React.CSSProperties,
});

const IndicatorRatingLine: React.SFC<Props & ClassNames> = (props) => {
  const {classes, indicator, setIndicatorWeight} = props;
  const labels = ['sehr unwichtig', 'eher unwichtig', 'eher wichtig', 'sehr wichtig'];
  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={4} >
      Der Anteil {indicator.name} ist für mich
      </Grid>
      <Grid item xs={8} >
      <Grid container spacing={0}>
      {
        [WeightNumber.ONE, WeightNumber.TWO, WeightNumber.THREE, WeightNumber.FOUR].map((weight, idx) => (
          <Grid item xs={3}>
            <Radio
              checked={indicator.weight === weight}
              onChange={(value) => setIndicatorWeight(indicator.id, weight)}
              value={weight.toString()}
              name={weight.toString()}
              classes={{ root: classes.root }}
            />
              {labels[idx]}
          </Grid>
      ))
      }  
      </Grid>
    </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  setIndicatorWeight: setWeight,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))
  (IndicatorRatingLine);