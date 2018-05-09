import * as React from 'react';
// import './App.css';
import DistricRanking from './component/ranking/DistrictRanking';
import ParallelLinePlot from './component/parallelLinePlot/ParallelLinePlot';
import IndicatorSelection from './component/selection/IndicatorSelection';
import { Theme, WithStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

type ClassNames = WithStyles<'root' | 'title'>

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  } as React.CSSProperties,
});

class App extends React.Component<ClassNames> {
  render() {
    const {classes} = this.props;
    return (
     
        <Grid container spacing={24}>
          <div className="App">
          <Grid item xs={12}>
            <header className={classes.title}>
              <h1 className="App-title">Quartierindex</h1>
            </header>
          </Grid>
          <Grid container justify="center">
            <IndicatorSelection/>
          </Grid>
          <Grid container justify="center">
            <ParallelLinePlot/>
            <DistricRanking title={'District Ranking'}/>
          </Grid>
          </div>
          </Grid>
    );
  }
}

export default withStyles(styles)(App);
