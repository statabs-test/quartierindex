import * as React from 'react'
import { Rootstate } from '../../../state'
import { connect } from 'react-redux'
import { Grid, Icon } from '@material-ui/core'
import { Indicator, NegativePositive, WeightNumber } from '../../../state/indicator/types'
import Cancel from '@material-ui/icons/Cancel'
import {
  deselectIndicator,
  SetNegativeValuation,
  SetPositiveValuation,
  setWeight,
} from '../../../state/indicator/actions'

import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'
import {
  getClassNameNegPosBorder,
  getClassNameSelectedUnselected,
  getColor,
  getLabelBy,
} from '../../../helpers'

interface Props {
  positiveValuation(id: string): void

  negativeValuation(id: string): void

  setIndicatorWeight(id: string, weight: WeightNumber): void

  deselect(id: string): void
}

export interface PublicProps {
  indicator: Indicator
  style: React.CSSProperties
}

const LegendItem = ({
  indicator,
  style,
  negativeValuation,
  positiveValuation,
  setIndicatorWeight,
  deselect,
}: Props & PublicProps) => {
  const sliderStyle = getColor(indicator.valuation === NegativePositive.Positive)

  return (
    <div
      key={indicator.id}
      className={'legend-container' + getClassNameNegPosBorder(indicator)}
      style={style}
    >
      <Grid container>
        <Grid item xs={10}>
          <div className={'legend-name'}> {indicator.name}</div>
        </Grid>
        <Grid item xs={2} alignContent={'flex-end'}>
          <Cancel className={'remove'} onClick={() => deselect(indicator.id)} />
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={12}>
              <div className="rate-positive" onClick={() => positiveValuation(indicator.id)}>
                <Icon
                  className={'rating-icon ' + getClassNameSelectedUnselected(indicator, 'positive')}
                >
                  mood
                </Icon>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="rate-negativ" onClick={() => negativeValuation(indicator.id)}>
                <Icon
                  className={'rating-icon' + getClassNameSelectedUnselected(indicator, 'negative')}
                >
                  mood_bad
                </Icon>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="weight" xs={10}>
          <Grid container direction={'column'} justify={'space-around'}>
            <Grid item xs={12}>
              <Slider
                min={0.25}
                max={1.0}
                step={0.25}
                value={indicator.weight}
                marks={{
                  0.25: '',
                  0.5: '',
                  0.75: '',
                  1: '',
                }}
                activeDotStyle={sliderStyle}
                trackStyle={sliderStyle}
                handleStyle={sliderStyle}
                style={{
                  paddingRight: '5px',
                  marginTop: '5px',
                }}
                onChange={value => setIndicatorWeight(indicator.id, value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="weight-label">{getLabelBy(indicator.weight)}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: Rootstate, props: PublicProps) => ({
  ...props,
})

const mapDispatchToProps: Partial<Props> = {
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
  setIndicatorWeight: setWeight,
  deselect: deselectIndicator,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LegendItem)
