import * as React from 'react'
import './tooltip.css'

export interface PublicProps {
  title: string,
  description: string
}

export type TooltipState = {
  displayTooltip: boolean;
}

const tooltipStyle = {
  color: '#386c8e',
  fontWeight: 'bold',
} as React.CSSProperties

const tooltipTitleStyle = {
  fontWeight: 'bold',
} as React.CSSProperties

/**
 * Additional functionality for navigation for material ui buttons
 */
class Tooltip extends React.Component<PublicProps, TooltipState> {

  constructor(props: PublicProps) {
    super(props)
    this.state = {
      displayTooltip: false
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this);
  }

  hideTooltip(): void {
    this.setState(
       {displayTooltip: false}
    )
  }

  showTooltip(): void {
    this.setState(
       {displayTooltip: true}
    )
  }
  
  render() {
    const {title, description, children} = this.props;

    return (
      <span className='tooltip'
          onMouseLeave={this.hideTooltip}
          style={tooltipStyle}
      >
        {this.state.displayTooltip &&
        <div className={`tooltip-bubble tooltip-top`}>
          <div className='tooltip-message'><span style={tooltipTitleStyle}>{title}:</span> {description}</div>
        </div>
        }
        <span 
          className='tooltip-trigger'
          onMouseOver={this.showTooltip}
          style={tooltipStyle}
          >
          {children}
        </span>
      </span>
    )
  }
}

export default Tooltip;

