import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import Legend from './legend/Legend';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import { Redirect } from 'react-router';
import './paralell-line-plot.css'

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

function IndicatorRanking({selectedIndicators, toggleVisibility}: Props) {
  if (selectedIndicators.length === 0) {
    return <Redirect to="/"/>
  }
  return (
      <div id="scroll-area" className="right-grid parallel-line-plot-scroll-area">
        <div className="parallel-line-plot-container">
          <Legend selectedIndicators={selectedIndicators}/>

        </div>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorRanking);