import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { makeGetIndicatorRanking } from '../../state/observation/selectors';
import { getIndicator } from '../../state/indicator/selectors';
import { District } from '../../state/district/types'
import { Ranking } from '../../state/observation/types'
import { Indicator } from '../../state/indicator/types';
import { allDistricts } from '../../state/district/selectors';
// import { Observation } from '../../state/observation/types'

export interface EnhancedProps {
  rankings: Ranking[]
  districts: District[]
  indicator: Indicator
}

export interface StateFromProps {
  id: string
}

function TestIndicatorRanking({ rankings, indicator, districts }: EnhancedProps) {
    return (
      <div key={indicator.id}>
        <h1>Ranking of indicator {indicator.name}</h1>
        {
          // Create an element per indicator ite
          rankings.map(ranking => {
            const district = _.find(districts, { 'id': ranking.districtId });
            if (district) {
              return (
                <p key={ranking.districtId}>
                  {district.id} {district.name}
                  calculated value: {JSON.stringify(ranking)}
                </p>
              );
            } else {
              throw new RangeError('Every districtId of ranking needs to exist in districts');
            }
          })
        }
      </div>
    );
}

const makeMapStateToProps = () => {
  const getIndicatorRanking = makeGetIndicatorRanking();
  const mapStateToProps = (state: Rootstate, props: StateFromProps) => {
    return {
      rankings: getIndicatorRanking(state, props),
      indicator: getIndicator(state, props),
      districts: allDistricts(state),
    }
  };
  return mapStateToProps;
};

const mapDispatchToProps = null;

export default connect(makeMapStateToProps, mapDispatchToProps)(TestIndicatorRanking);
