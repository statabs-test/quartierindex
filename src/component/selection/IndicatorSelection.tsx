import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state/index';
import { getGroupedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { getUtil } from '../../state/util/selectors';
import { Util } from '../../state/util/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import IndicatorSelectionGroup from './IndicatorSelectionGroup';

export interface Props {
  groupedIndicators: { [key: string]: Indicator[] }
  util: Util
}

type ClassNames = WithStyles<'root' | 'title' | 'nav_button'>

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
  nav_button: {
    color: 'white',
    backgroundColor: '#1d4e2c',
    '&:hover': {
      backgroundColor: '#1d4e2c'[700],
    },
  } as React.CSSProperties,
});

// const isVisible = (util: Util): any => ({
//   'visibility': util.selectIndicatorConf.visible ? 'visible' : 'hidden'
// });

const IndicatorSelection: React.SFC<Props & ClassNames> = (props) => {
  const {classes, groupedIndicators, util} = props;
  return (
      <div className="floating-container">
        <Grid item xs={12}>
          <div>
            {console.log(util)}
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
            <Grid item xs={1}>
              <Link to={'/ranking'}>
                <Button variant="raised" className={classes.title} >Weiter</Button>
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  groupedIndicators: getGroupedIndicators(state),
  util: getUtil(state)
});

const mapDispatchToProps = ({
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
(IndicatorSelection);