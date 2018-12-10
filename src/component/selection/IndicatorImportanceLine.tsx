import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import { Indicator, WeightNumber } from '../../state/indicator/types'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles, createStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import { setWeight } from '../../state/indicator/actions'
import { labels } from '../../helpers'
import FormLabel from '@material-ui/core/FormLabel'

export interface PublicProps {
  indicator: Indicator
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: '5px',
    },
    checked: {
      color: '#1d4e2c',
      '&$checked': {
        color: '#1d4e2c',
      },
    },
    title: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#1D4E2C',
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    textCentered: {
      display: 'inline-block',
    },
    sizeIcon: {
      fontSize: 20,
    },
  })

type Props = {
  setIndicatorWeight(id: string, weight: WeightNumber): void
} & PublicProps &
  WithStyles<typeof styles>

const IndicatorImportanceLine: React.SFC<Props> = props => {
  const { classes, indicator, setIndicatorWeight } = props
  let indexPrefix = indicator.weightText.indexOf(indicator.name.split(' ')[0])
  /* Hack for Sesshaftigkeit */
  if (indexPrefix === -1) {
    indexPrefix = 4;
  }
  const prefix = indicator.weightText.substring(0, indexPrefix)
  const suffixIndex = indicator.weightText.indexOf(' ', indexPrefix + indicator.name.length)
  const suffix = indicator.weightText.substring(suffixIndex, indicator.weightText.length)
  const text = indicator.weightText.substring(indexPrefix, suffixIndex)
  return (
    <Grid container alignItems="center" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
      <Grid item xs={6}>
        <p>
          {prefix} <span style={{ color: '#386c8e', fontWeight: 'bold' }}>{text} </span> {suffix}
        </p>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={0}>
          {[WeightNumber.ONE, WeightNumber.TWO, WeightNumber.THREE, WeightNumber.FOUR].map(
            (weight, idx) => (
              <Grid item xs={3} key={indicator.id + weight.toString()}>
                <input
                  type="radio"
                  id={indicator.id + weight.toString()}
                  checked={indicator.weight === weight}
                  className={classes.root}
                  onChange={value => setIndicatorWeight(indicator.id, weight)}
                  value={weight.toString()}
                  name={indicator.id}
                />
                <FormLabel htmlFor={indicator.id + weight.toString()}>{labels[idx]}</FormLabel>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: Rootstate, ownProps: PublicProps) => ({
  selectedIndicators: getSelectedIndicators(state),
  ...ownProps,
})

const mapDispatchToProps = {
  setIndicatorWeight: setWeight,
}

export default compose<Props, PublicProps>(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorImportanceLine)
