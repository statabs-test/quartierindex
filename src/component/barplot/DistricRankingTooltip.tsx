import * as React from 'react'
import {TooltipProps} from 'recharts'
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
  
    render() {
      const { active } = this.props;
      
      if (active) {
        const { payload } = this.props;
        let style = this.getStyle(payload[0].payload.id);
        return (
          <div className="districtRankingTooltip" style={style}>
            Berechneter Wert
            <ul>
              <li>{payload[0].value}</li>
            </ul>
          </div>
        );
      }
      return null;
    }
  };

export default DistrictRankingTooltip;
  