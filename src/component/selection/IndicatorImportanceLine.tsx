import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator, WeightNumber } from '../../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import { setWeight } from '../../state/indicator/actions';
import { labels } from '../../helpers';
import FormLabel from 'material-ui/Form/FormLabel';

export interface Props {
  indicator: Indicator

  setIndicatorWeight(id: string, weight: WeightNumber): void
}

type ClassNames = WithStyles<'root' | 'title' | 'leftIcon' | 'textCentered' | 'sizeIcon' | 'checked'>

export const styles = (theme: Theme) => ({
  root: {
    paddingBottom: '5px'
  } as React.CSSProperties,
  checked: {
    color: '#1d4e2c',
    '&$checked': {
      color: '#1d4e2c',
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
  sizeIcon: {
    fontSize: 20,
  } as React.CSSProperties,
});

const IndicatorImportanceLine: React.SFC<Props & ClassNames> = (props) => {
  const {classes, indicator, setIndicatorWeight} = props;

  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={4} >
      Der Anteil {indicator.name} ist für mich
      </Grid>
      <Grid item xs={8} >
      <Grid container spacing={0}>
      {
        [WeightNumber.ONE, WeightNumber.TWO, WeightNumber.THREE, WeightNumber.FOUR].map((weight, idx) => (
          <Grid item xs={3} key={indicator.id + weight.toString()}>

            <input
                type="radio"
                id={indicator.id + weight.toString()}
                checked={indicator.weight === weight}
                className={classes.root}
                onChange={(value) => setIndicatorWeight(indicator.id, weight)}
                value={weight.toString()}
                name={indicator.id}
            />
            <FormLabel htmlFor={indicator.id + weight.toString()} >
              {labels[idx]}
            </FormLabel>
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
  (IndicatorImportanceLine);