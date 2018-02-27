import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { groupObservationsByDistrict, getSortedGlobalRanking } from '../../state/observation/selectors';
import { District } from '../../state/district/types'
import { Ranking } from '../../state/observation/types'
import { error } from 'util';
// import { Observation } from '../../state/observation/types'

export interface Props {
  districts: District[]
  observations: any
  rankings: Ranking[]
}

function TestRanking({ districts, rankings }: Props) {
    return (
      <div>
        <h1>Test Ranking</h1>
            {
                // Create an element per indicator item
              rankings.map(ranking => {
                  const district = _.find(districts, { 'id': ranking.districtId });
                    if (district) {
                      return (
                        <p key={ranking.districtId}>
                          {district.id} {district.name}
                          calculated value: {
                          JSON.stringify(ranking)
                          /*observations[district.id].map(observation => {
                            return <span key={observation.id}>{observations.value}, </span>
                          })*/
                        }
                        </p>
                      );
                    } else {
                      throw error('Every districtId of ranking needs to exist in districts');
                    }
                })
            }
      </div>
        );
}

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  observations: groupObservationsByDistrict(state),
  rankings: getSortedGlobalRanking(state), // calculatedRankingByDistrictOverall(state)
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TestRanking);
