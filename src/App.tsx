import * as React from 'react';
import './App.css';
import TestIndicator from './component/test/TestIndicator';
import TestDistricts from './component/test/TestDistricts';
import TestSelectedIndicator from './component/test/TestSelectedIndicator'
import TestRanking from './component/test/TestRanking'
import DistricRanking from './component/ranking/DistrictRanking';
import ParallelLinePlot from './component/parallelLinePlot/ParallelLinePlot';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Quartierindex</h1>
          </header>

          <DistricRanking title={'District Ranking'}/>
          <ParallelLinePlot/>

          <div className="just-for-dev">
            <TestIndicator/>

            <TestSelectedIndicator/>

            <TestDistricts/>

            <TestRanking/>
          </div>
        </div>
    );
  }
}

export default App;
