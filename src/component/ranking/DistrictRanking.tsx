import * as React from 'react';
import LineRanking from './LineRanking';

export interface PublicProps {
  className?: string
}

const DistrictRanking: React.StatelessComponent<PublicProps> = ({}) => {
  return (
      <div className="ranking-container">
        <LineRanking/>
      </div>
  );
};

export default DistrictRanking;
