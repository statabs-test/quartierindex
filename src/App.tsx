import * as React from 'react';
// import './App.css';
// import DistricRanking from './component/ranking/DistrictRanking';
import ParallelLinePlot from './component/parallelLinePlot/ParallelLinePlot';
import IndicatorSelection from './component/selection/IndicatorSelection';
import IndicatorRating from './component/selection/IndicatorRating';
import IndicatorImportance from './component/selection/IndicatorImportance';
import { Theme, WithStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom';
type ClassNames = WithStyles<'root' | 'title'>

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  } as React.CSSProperties,
});

class App extends React.Component<ClassNames> {
  render() {
    const {classes} = this.props;
    return (
      <div>
        {/* Whole container */}
        <Grid container spacing={24}>
          <Grid item xs={12} className="App">
          {/* Title */}
            <Grid container justify="center">
              <Grid item xs={8}>
                <header className={classes.title}>
                  <h1 className="App-title">Quartier-Index: Wohnviertel und Gemeinden vergleich</h1>
                </header>
                </Grid>
              </Grid>
          </Grid>
          {/* Components */}
          <Grid container justify="center">
            <Route exact path="/" component={IndicatorSelection}/>
            <Route exact path="/ranking" component={IndicatorRating}/>
            <Route exact path="/importance" component={IndicatorImportance}/>
            <Route exact path="/plot" component={ParallelLinePlot}/>
            {/* <Route exact path="/ranking" component={DistricRanking title={'District Ranking'}}/> */}
            
          </Grid>
          {/* <Grid container justify="center">
            <ParallelLinePlot/>
            
          </Grid> */}
          </Grid>
        </div>
    );
  }
}
export default withStyles(styles)(App);