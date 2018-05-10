import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state/index';
import { getGroupedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { deselectIndicator, selectIndicator, } from '../../state/indicator/actions';
import { getUtil } from '../../state/util/selectors';
import { Util } from '../../state/util/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import { Link } from 'react-router-dom';

export interface Props {
  groupedIndicators: {[key: string]: Indicator[]}
  util: Util

  select(id: string): void

  deselect(id: string): void

  toggleVisibility(visibility: boolean): void
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
    color: '#1d4e2c',
  } as React.CSSProperties,
});

// const isVisible = (util: Util): any => ({
//   'visibility': util.selectIndicatorConf.visible ? 'visible' : 'hidden'
// });

const IndicatorSelection: React.SFC<Props & ClassNames> = (props) => {
  const {classes, groupedIndicators, select, deselect, util} = props;
  return (
    <Grid item xs={8}>
      <div className="floating-container">
        {console.log(util)}
        <div className="selection-container">
          <h2 className={classes.title}>
            Schritt 1: Wählen Sie mindestens einen Indikator für die Index Berechnung aus
          </h2>
          <Grid container spacing={8}>
          {
            _.map(groupedIndicators, (value, key) => (
              <Grid item xs={4} key={key}>
                  <h3>Bereich {key}</h3>
                <Grid container>
                {
                  value.map(indicator => (
                    <Grid item xs={12} key={indicator.id}>
                      <FormControlLabel
                        key={indicator.id}
                        control={
                          <Checkbox
                            checked={indicator.selected}
                            onChange={(e) => {
                              return e.target.checked ? select(indicator.id) : deselect(indicator.id)}
                            }
                            value={indicator.id}
                          />
                        }
                        label={indicator.name}
                      />
                    </Grid>
                  ))
                }
                </Grid>
              </Grid>
            ))
          }
        </Grid>
        </div>
      </div>
      <Grid container justify="flex-end">
        <Grid item xs={1}>
          <Link to={'/ranking'}>
          <Button variant="raised">Weiter</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  groupedIndicators: getGroupedIndicators(state),
  util: getUtil(state)
});

const mapDispatchToProps = ({
  select: selectIndicator,
  deselect: deselectIndicator,
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default compose (
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))
  (IndicatorSelection);
