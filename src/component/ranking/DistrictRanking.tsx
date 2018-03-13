import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import LineRanking from './LineRanking';
import { LineRank } from '../../state/observation/types';
import { getLineRanking } from '../../state/observation/selectors';

// import { Observation } from '../../state/observation/types'

export interface Props {
  rankings: LineRank[]
}

function DistrictRanking({rankings}: Props) {
  return (
      <div>
        <h1>DistrictRanking</h1>
        <LineRanking
            ranking={rankings}
        />
      </div>
  );
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state: Rootstate) => {
    return {
      rankings: getLineRanking(state)
    }
  };
  return mapStateToProps;
};

const mapDispatchToProps = null;

export default connect(makeMapStateToProps, mapDispatchToProps)(DistrictRanking);
