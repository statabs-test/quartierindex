import * as React from 'react';
import './App.css';
import IndicatorSelection from './component/selection/IndicatorSelection';
import IndicatorRating from './component/selection/IndicatorRating';
import IndicatorImportance from './component/selection/IndicatorImportance';
import { Route } from 'react-router-dom';
import MainView from './component/MainView';

class App extends React.Component {
  render() {

    return (
        <div className="App">
          <h1 className="App-header">Quartier-Index: Wohnviertel und Gemeinden vergleich</h1>

          <Route exact path="/" component={IndicatorSelection}/>
          <Route exact path="/ranking" component={IndicatorRating}/>
          <Route exact path="/importance" component={IndicatorImportance}/>
          <Route exact path="/plot" component={MainView}/>

        </div>
    );
  }
}

export default App;