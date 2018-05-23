import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state/index';
import { getGroupedIndicators, getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import IndicatorSelectionGroup from './IndicatorSelectionGroup';
import NavButton from '../customElements/NavButton';

export interface Props {
  groupedIndicators: { [key: string]: Indicator[] }
  valid: boolean
}

type ClassNames = WithStyles<'root' | 'title'>

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  } as React.CSSProperties,
});

const IndicatorSelection: React.SFC<Props & ClassNames> = (props) => {
  const {classes, groupedIndicators, valid} = props;
  return (
      <div className="floating-container">
        <Grid item xs={12}>
          <div>
            <h2 className={classes.title}>
              Schritt 1: Wählen Sie mindestens einen Indikator für die Index Berechnung aus
            </h2>
            <Grid container spacing={0}>
              {
                _.map(groupedIndicators, (value, key) => (
                    <IndicatorSelectionGroup key={key} groupName={key} value={value} />
                ))
              }
            </Grid>
          </div>

          <Grid container justify="flex-end">
            <Grid item xs={2}>
              <NavButton disabled={!valid} variant="raised" to={'/plot'}>Rangliste</NavButton>
            </Grid>

            <Grid item xs={2}>
              <NavButton disabled={!valid} variant="raised" to={'/ranking'}>Weiter</NavButton>
            </Grid>
          </Grid>

        </Grid>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  groupedIndicators: getGroupedIndicators(state),
  valid: getSelectedIndicators(state).length > 0,
});

const mapDispatchToProps = ({
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
(IndicatorSelection);
