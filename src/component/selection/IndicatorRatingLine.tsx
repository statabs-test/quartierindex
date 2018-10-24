import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import { Indicator } from '../../state/indicator/types'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { SetNegativeValuation, SetPositiveValuation } from '../../state/indicator/actions'
import { getClassNameSelectedUnselected } from '../../helpers'

export interface PublicProps {
  indicator: Indicator
}

export interface Props {
  positiveValuation(id: string): void

  negativeValuation(id: string): void
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#1D4E2C',
    },
    textCentered: {
      display: 'inline-block',
    },
    positiveButton: {
      color: 'white',
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      textTransform: 'none',
    },
    negativeButton: {
      color: 'white',
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      textTransform: 'none',
    },
  })

const IndicatorRatingLine: React.SFC<Props & PublicProps & WithStyles<typeof styles>> = props => {
  const { classes, positiveValuation, negativeValuation, indicator } = props
  return (
    <Grid container spacing={0}>
      <Grid item xs={8}>
        {indicator.valuationText}
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="raised"
          component="span"
          className={classes.positiveButton + getClassNameSelectedUnselected(indicator, 'positive')}
          onClick={() => positiveValuation(indicator.id)}
        >
          <Icon style={{ paddingRight: '5px' }}>mood</Icon>
          Positiv
        </Button>
        <Button
          className={classes.negativeButton + getClassNameSelectedUnselected(indicator, 'negative')}
          variant="raised"
          component="span"
          onClick={() => negativeValuation(indicator.id)}
        >
          <Icon style={{ paddingRight: '5px' }}>mood_bad</Icon>
          Negativ
        </Button>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
})

const mapDispatchToProps = {
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
}

export default compose<Props, PublicProps>(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorRatingLine)
