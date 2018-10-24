import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state/index'
import { getGroupedIndicators } from '../../state/indicator/selectors'
import { Indicator } from '../../state/indicator/types'
import { deselectIndicator, selectIndicator } from '../../state/indicator/actions'
import { getUtil } from '../../state/util/selectors'
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

const IndicatorSelectionGroup: React.SFC<
  Props & PublicProps & WithStyles<typeof styles>
> = props => {
  const { classes, value, groupName, select, deselect } = props
  // console.log(classes);
  return (
    <Grid item xs={4}>
      <h3>{groupName}</h3>
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
              style={{ padding: '5px' }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  groupedIndicators: getGroupedIndicators(state),
  util: getUtil(state),
})

const mapDispatchToProps = {
  select: selectIndicator,
  deselect: deselectIndicator,
}

export default compose<Props, PublicProps>(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorSelectionGroup)
