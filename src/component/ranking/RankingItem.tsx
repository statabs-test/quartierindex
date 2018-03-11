import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';

export interface Props {
  test: number;
}

const y = (yPos: number): string => {
  const yy = yPos * 100;
  console.log(yy)
  return yy.toString() + '%';
};

function RankingItem({test}: Props) {
  return (
      <circle cx="50%" cy={y(test)} r={10} stroke="red"/>
  );
}

const mapStateToProps = (state: Rootstate, ownProps: {test: number}) => ({
  test: ownProps.test
});

const mapDispatchToProps = null;

export default connect<Props, null , {test: number}>(mapStateToProps, mapDispatchToProps)(RankingItem);