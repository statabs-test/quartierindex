import * as React from 'react';
import './App.css';
import TestIndicator from './component/test/TestIndicator';
import TestDistricts from './component/test/TestDistricts';
import TestSelectedIndicator from './component/test/TestSelectedIndicator'
import TestRanking from './component/test/TestRanking'

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <TestIndicator />

        <TestSelectedIndicator />

        <TestDistricts />

        <TestRanking />
      </div>
    );
  }
}

export default App;
