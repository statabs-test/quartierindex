import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';

export interface Props {
  indicator: Indicator
}

type ClassNames = WithStyles<'root' | 'title' | 'leftIcon' | 'textCentered' >

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
    marginBottom: theme.spacing.unit
  } as React.CSSProperties,
  textCentered: {
    display: 'inline-block'
  } as React.CSSProperties,
});

const IndicatorRatingLine: React.SFC<Props & ClassNames> = (props) => {
  const {indicator} = props;
  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={6} >
        Der Anteil {indicator.name} ist für mich
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))
  (IndicatorRatingLine);