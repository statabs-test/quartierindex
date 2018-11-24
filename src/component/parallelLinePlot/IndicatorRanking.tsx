import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import Legend from './legend/Legend';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import { Redirect } from 'react-router';
import './paralell-line-plot.css'
import ChartContainer from './ChartContainer';

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

class IndicatorRanking extends React.Component<Props> {
  selectedIndicators: Indicator[];
  myRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props)
    this.selectedIndicators = props.selectedIndicators;
  }

  componentDidMount() {

    if (this.myRef.current) {
      this.myRef.current.style.setProperty('--number-of-selected-indicators', String(this.selectedIndicators.length))
    }
  }

  render() {
    if (this.selectedIndicators.length === 0) {
      return <Redirect to="/" />
    }

    return (
      <div ref={this.myRef} id="scroll-area" className="right-grid parallel-line-plot-scroll-area">
        <div className="parallel-line-plot-container">
          <Legend selectedIndicators={this.selectedIndicators} />
          <ChartContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorRanking);