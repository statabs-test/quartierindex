import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state/index';
import { getGroupedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { deselectIndicator, selectIndicator, } from '../../state/indicator/actions';
import { getUtil } from '../../state/util/selectors';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles, withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

export interface Props {
  value: Indicator[]
  groupName: String

  select(id: string): void
  deselect(id: string): void
}

type ClassNames = WithStyles<'root' | 'title' | 'checkbox'>

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
  checkbox: {
    color: '#1d4e2c',
  } as React.CSSProperties,
});

const IndicatorSelectionGroup: React.SFC<Props & ClassNames> = (props) => {
  const {classes, value, groupName, select, deselect} = props;
  console.log(classes);
  return (
    <Grid item xs={4}>
        <h3>{groupName}</h3>
        <Grid container>
        {
            value.map(indicator => (
                <Grid item xs={12} key={indicator.id}>
                <FormControlLabel
                    key={indicator.id}
                    control={
                        <Checkbox
                            className={classes.checkbox}
                            checked={indicator.selected}
                            onChange={(e) => {
                            return e.target.checked ? select(indicator.id) : deselect(indicator.id)
                            }
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
  );
}

const mapStateToProps = (state: Rootstate) => ({
  groupedIndicators: getGroupedIndicators(state),
  util: getUtil(state)
});

const mapDispatchToProps = ({
  select: selectIndicator,
  deselect: deselectIndicator,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
(IndicatorSelectionGroup);
