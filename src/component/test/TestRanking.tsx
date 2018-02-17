import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { groupObservationsByDistrict, calculatedRankingByDistrictOverall } from '../../state/observation/selectors';
import { District } from '../../state/district/types'
// import { Observation } from '../../state/observation/types'

export interface Props {

  districts: District[],
  observations: any
  test: any
}

function TestRanking({ districts, test }: Props) {
    return (
      <div>
        <h1>Test Ranking ohne Schritt 2 + 3</h1>
            {
                // Create an element per indicator item
              districts.map(district => {
                    return (
                      <p key={district.id}>
                        {district.id} {district.name}
                        calculated value: {
                        JSON.stringify(test[district.id])
                        /*observations[district.id].map(observation => {
                          return <span key={observation.id}>{observations.value}, </span>
                        })*/
                        }
                      </p>
                    );
                })
            }
      </div>
        );
}

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  observations: groupObservationsByDistrict(state),
  test: calculatedRankingByDistrictOverall(state)
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TestRanking);
