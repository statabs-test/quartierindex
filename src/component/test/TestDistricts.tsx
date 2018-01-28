import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { District } from '../../state/district/types'

export interface Props {
    districts: District[]
}

function TestDistricts({ districts }: Props) {
    return (
      <div>
        <h1>Alle Quartiere</h1>
            {
                // Create an element per indicator item
              districts.map(district => {
                    return (
                      <p key={district.id}>
                        {district.id} {district.name}
                      </p>
                    );
                })
            }
      </div>
        );
}

const mapStateToProps = (state: Rootstate) => ({
    districts: allDistricts(state)
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TestDistricts);
