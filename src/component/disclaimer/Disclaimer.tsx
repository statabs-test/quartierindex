import * as React from 'react'
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state'
import { disableDisclaimer } from '../../state/util/actions'

import './disclaimer.css'


export interface PublicProps {
    // empty
}
  
type Props = {
    disableDisclaimer(visible: boolean): void
} & PublicProps

const Disclaimer: React.SFC<Props> = props => {
    const { disableDisclaimer } = props
    return(
        <div className="disclaimer">
            <div className="disclaimerText">
                Die von Ihnen vorgenommenen Einstellungen (Auswah, Bewertung und Gewichtung) werden nicht gepsichert.<br />
                Sie werden ausschliesslich für die Berechnung der Rangliste genutzt.
            </div>
            <div className="disclaimerButton">
            <button
                className="disclaimerCloseButton"
                onClick={() => disableDisclaimer(false)}
            >
                <Icon>cancel</Icon>
            </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: Rootstate) => ({
    // empty
})

const mapDispatchToProps = {
    disableDisclaimer: disableDisclaimer,
  }

export default compose<Props, PublicProps>(
    // withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Disclaimer)
  