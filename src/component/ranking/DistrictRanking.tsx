import * as React from 'react';
import LineRanking from './LineRanking';

export interface PublicProps {
  title: string
  className?: string
}

const DistrictRanking: React.StatelessComponent<PublicProps> = ({ title}) => {
  return (
      <div className="ranking-container">
        <div className="title">{title}</div>
        <LineRanking/>
      </div>
  );
};

export default DistrictRanking;
