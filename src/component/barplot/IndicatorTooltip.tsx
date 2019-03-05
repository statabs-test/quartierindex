import * as React from 'react'
import { connect } from 'react-redux'
import { TooltipProps } from 'recharts'
import { Indicator, NegativePositive } from '../../state/indicator/types'
import { District } from '../../state/district/types'
import { Observation } from '../../state/observation/types'
import { Rootstate } from '../../state'
import { allDistricts } from '../../state/district/selectors'
import { getAllObservations } from '../../state/observation/selectors'
import { getColor } from '../../helpers'
import './indicatorTooltip.css'

const getObservationText = (indicator: Indicator, observation: Observation): any => {
  let value = observation.value_txt
  return <p style={getParagraphStyle(indicator, false)}>{value}, Rang {observation.ranking}</p>
}
const getParagraphStyle = (indicator: Indicator, top: boolean): React.CSSProperties => {
  const style = {
    margin: 0,
    paddingLeft: 20
  }
  /*
  This is a special hack have 'Anteil Einfamilienhäuser 2017' with a paddingTop of 15 
  but 'Erwerbstätigenqutoe 2012-2016' with a padding of 9 because both have the length 
  of 28, but the browser will write 'Erwerbstätigenqutoe 2012-2016' in two lines
  and 'Anteil Einfamilienhäuser 2017' in one.
  */
  let size = (indicator.name + indicator.yearText).length;
  if (indicator.yearText.indexOf('-') > 0) {
    size += 1;
  }
  if (size <= 28 && top) {
    style['paddingTop'] = 15
    return style
  }
  if (top) {
    style['paddingTop'] = 9
  }
  return style
}

const getIndicatorYear = (indicator: Indicator): string => {
  if (indicator.yearText.includes('-')) {
    let yearText = indicator.yearText;
    return yearText.replace('-', '\u2011')
  }
  return indicator.yearText
}

export interface PublicProps extends TooltipProps {
  indicator: Indicator,
  districts: District[],
  observations: Observation[],
}

class IndicatorTooltip extends React.Component<PublicProps> {

  constructor(props: PublicProps) {
    super(props)
  }

  getDistrictByName(name: string): District {
    return this.props.districts.filter(district => district.name === name)[0]
  }

  getObservation(indicatorId: string, districtId: string): Observation {
    return this.props.observations.filter(observation => observation.districtId === districtId
      && observation.indicatorId === indicatorId)[0]
  }

  getRectStyle(indicator: Indicator): any {
    const color = getColor(indicator.valuation === NegativePositive.Positive)
    return {
      fill: 'white',
      stroke: color.borderColor,
      strokeWidth: 1
    }
  }

  render() {
    const {active} = this.props;
    if (active) {
      const {payload, indicator} = this.props;
      const district = this.getDistrictByName(payload[0].payload.name)
      const observation = this.getObservation(indicator.id, district.id);
      const style = this.getRectStyle(indicator)
      return (
        <div className="indicatorTooltip">
          <svg width={190} height={74} viewBox="-10 -4 200 80" style={{position: 'absolute', zIndex: -1}}>
            <rect x="0" y="0" rx="5" ry="5" width="190" height="74" style={style}/>
            <rect x="-4" y="27" width="10" height="10" transform="rotate(45 -4 32)" style={style}/>
            <rect x="-2" y="26" width="11" height="11" transform="rotate(45 -2 31)"
                  style={{fill: 'white', stroke: 'white', strokeWidth: 1}}/>
          </svg>
          <p style={getParagraphStyle(indicator, true)}> {indicator.name} {getIndicatorYear(indicator)} </p>
          <p style={getParagraphStyle(indicator, false)}> {district.name} </p>
          {getObservationText(indicator, observation)}
        </div>
      );
    }
    return null;
  }
};

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  observations: getAllObservations(state)
})


export default connect(mapStateToProps)(IndicatorTooltip);

  