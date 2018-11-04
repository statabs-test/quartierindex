import * as React from 'react';

export interface PublicProps {
  className?: string
}

const DistrictRanking: React.StatelessComponent<PublicProps> = ({}) => {
  return (
      <div className="left-grid district-ranking">
        <div className="container">
          District ranking bar plot
        </div>
      </div>
  );
};

export default DistrictRanking;
