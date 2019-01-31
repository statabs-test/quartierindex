import * as React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import IndicatorSelection from './page/IndicatorSelection'
import IndicatorRating from './page/IndicatorRating'
import IndicatorImportance from './page/IndicatorWeight'
import MainView from './page/MainView'
// import './app.debug.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={IndicatorSelection} />
        <Route exact path="/ranking" component={IndicatorRating} />
        <Route exact path="/importance" component={IndicatorImportance} />
        <Route exact path="/plot" component={MainView} />
      </div>
    )
  }
}

export default App
