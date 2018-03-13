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

export interface PublicProps {
  title: string
  className?: string
}

const DistrictRanking: React.StatelessComponent<Props & PublicProps> = ({ rankings, title }) => {
  return (
      <div>
        <h1>DistrictRanking</h1>
        <LineRanking
            ranking={rankings}
        />
      </div>
  );
}

const mapStateToProps = (state: Rootstate): Props => ({
  rankings: getLineRanking(state),
});

export default connect<Props, PublicProps>(mapStateToProps)(DistrictRanking);
