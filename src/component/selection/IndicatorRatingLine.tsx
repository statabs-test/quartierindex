import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { SetNegativeValuation, SetPositiveValuation, } from '../../state/indicator/actions';
import { getClassNameSelectedUnselected } from '../../helpers';

export interface Props {
  indicator: Indicator

  positiveValuation(id: string): void

  negativeValuation(id: string): void

}

type ClassNames = WithStyles<'root' | 'title' | 'textCentered' | 'positiveButton' | 'negativeButton'>

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: '#1D4E2C',
  } as React.CSSProperties,
  textCentered: {
    display: 'inline-block'
  } as React.CSSProperties,
  positiveButton: {
    color: 'white',
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textTransform: 'none'
  } as React.CSSProperties,
  negativeButton: {
    color: 'white',
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textTransform: 'none'
  } as React.CSSProperties,
});

const IndicatorRatingLine: React.SFC<Props & ClassNames> = (props) => {
  const {classes, positiveValuation, negativeValuation, indicator} = props;
  return (
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={8}>
          Einen hohe/n Anteil {indicator.name} ist für mich
        </Grid>
        <Grid item xs={4}>
          <Button
              variant="raised"
              component="span"
              className={classes.positiveButton + getClassNameSelectedUnselected(indicator, 'positive')}
              onClick={() => positiveValuation(indicator.id)}
          >
            <Icon style={{paddingRight: '5px'}}>mood</Icon>
            Positiv
          </Button>
          <Button
              className={classes.negativeButton + getClassNameSelectedUnselected(indicator, 'negative')}
              variant="raised"
              component="span"
              onClick={() => negativeValuation(indicator.id)}
          >
            <Icon style={{paddingRight: '5px'}}>mood_bad</Icon>
            Negativ
          </Button>
        </Grid>
      </Grid>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
(IndicatorRatingLine);