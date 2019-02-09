import * as React from 'react'
import { connect } from 'react-redux'
import {TooltipProps} from 'recharts'
import { Indicator } from '../../state/indicator/types'
import { District } from '../../state/district/types'
import { Observation } from '../../state/observation/types'
import { Rootstate } from '../../state'
import {allDistricts} from  '../../state/district/selectors'
import {getAllObservations} from '../../state/observation/selectors'
import './indicatorTooltip.css'


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

  render() {
    const { active } = this.props;
    if (active) {
      const { payload, indicator } = this.props;
      const district = this.getDistrictByName(payload[0].payload.name)
      const observation = this.getObservation(indicator.id, district.id);
      return (
        <div className="indicatorTooltip">
        {indicator.name} {indicator.yearText} <br />
        {district.name} <br />
        {observation.value_txt} | Rang {observation.ranking}
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

  