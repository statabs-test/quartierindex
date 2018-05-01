import * as React from 'react';
import './App.css';
import DistricRanking from './component/ranking/DistrictRanking';
import ParallelLinePlot from './component/parallelLinePlot/ParallelLinePlot';
import IndicatorSelection from './component/selection/IndicatorSelection';

class App extends React.Component {
  render() {
    return (
        <div className="App">

          <header className="App-header">
            <h1 className="App-title">Quartierindex</h1>
          </header>

          <IndicatorSelection/>
          <DistricRanking title={'District Ranking'}/>
          <ParallelLinePlot/>

        </div>
    );
  }
}

export default App;
