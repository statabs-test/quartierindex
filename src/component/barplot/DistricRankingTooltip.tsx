import * as React from 'react'
import { TooltipProps } from 'recharts'
import './districtRankingTooltip.css'

class DistrictRankingTooltip extends React.Component<TooltipProps> {

  constructor(props: TooltipProps) {
    super(props)
  }

  getStyle(id: string): React.CSSProperties {
    if (id === '99') {
      return {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'black'
      }
    }
    return {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#FFD300'
    }
  }

  getDistrictName(rankName: string): string {
    if (rankName.includes('X')) {
      return 'Kanton Basel-Stadt'
    }
    return rankName.split('.').slice(1).join().trim();
  }

  render() {
    const {active} = this.props;

    if (active) {
      const {payload} = this.props;
      let style = this.getStyle(payload[0].payload.id);
      return (
        <div className="districtRankingTooltip">
          <svg width={155} height={74} viewBox="-10 -4 190 80" style={{position: 'absolute', zIndex: -1}}>
            <rect x="0" y="0" rx="5" ry="5" width="155" height="74"
                  style={{fill: 'white', stroke: style.borderColor, strokeWidth: 1}}/>
            <rect x="-4" y="27" width="10" height="10" transform="rotate(45 -4 32)"
                  style={{fill: 'white', stroke: style.borderColor, strokeWidth: 1}}/>
            <rect x="-2" y="26" width="11" height="11" transform="rotate(45 -2 31)"
                  style={{fill: 'white', stroke: 'white', strokeWidth: 1}}/>
          </svg>

          <div style={{padding: 5, paddingLeft: 20}}>
            <p>Berechneter Wert<br />
            {this.getDistrictName(payload[0].payload.name)}<br />
            {payload[0].value} </p>
          </div>
        </div>
      );
    }
    return null;
  }
};

export default DistrictRankingTooltip;
  