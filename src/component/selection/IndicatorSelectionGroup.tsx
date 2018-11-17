import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state/index'
import { Indicator } from '../../state/indicator/types'
import { deselectIndicator, selectIndicator, toggleGroupIndicators } from '../../state/indicator/actions'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'

interface PublicProps {
  groupName: string
  value: Indicator[]
}

export interface Props {
  select(id: string): void
  deselect(id: string): void
  toggleGroup(subject: string, selected: boolean): void
}

export const styles = (theme: Theme) =>
  createStyles({
    checkbox: {
      marginLeft: '15px',
    },
    checked: {
      color: '#1d4e2c',
      '&$checked': {
        color: '#1d4e2c'[500],
      },
    },
    sizeIcon: {
      fontSize: 20,
    },
  })

const IndicatorSelectionGroup: React.SFC<Props & PublicProps & WithStyles<typeof styles>> = props => {
  const { classes, value, groupName, select, deselect, toggleGroup } = props;
  const groupSelectedCount = _.filter(value, indicator => indicator.selected).length; 
  return (
    <Grid item xs={4}>
    <div className="selection">
      <h3>{groupName} ({groupSelectedCount})</h3>
      <Grid container>
        {value.map(indicator => (
          <Grid item xs={12} key={indicator.id}>
            <FormControlLabel
              key={indicator.id}
              control={
                <input
                  type="checkbox"
                  id={indicator.id}
                  className={classes.checkbox}
                  checked={indicator.selected}
                  onChange={e => {
                    return e.target.checked ? select(indicator.id) : deselect(indicator.id)
                  }}
                  value={indicator.id}
                />
              }
              label={indicator.name}
              style={{ paddingBottom: '2px' }}
            />
          </Grid>
        ))}
        
        <Grid item xs={12} alignItems={'flex-end'}>
      <FormControlLabel
        key={groupName}
        control={
          <input
            type="checkbox"
            id={groupName}
            className={classes.checkbox}
            onChange={e => {
              return toggleGroup(groupName, e.target.checked);
            }}
            value={groupName}
          />
        }
        label={<div>Alle {groupName} Indikatoren</div>}
        style={{ paddingBottom: '2px' }}
      />
      </Grid> 
      </Grid>
      
    </div>
    </Grid>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  // empty
})

const mapDispatchToProps = {
  select: selectIndicator,
  deselect: deselectIndicator,
  toggleGroup: toggleGroupIndicators,
}

export default compose<Props, PublicProps>(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorSelectionGroup)
