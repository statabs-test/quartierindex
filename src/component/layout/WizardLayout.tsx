import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Rootstate } from 'src/state'
import { getSelectedIndicators } from 'src/state/indicator/selectors'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'

interface WizardLayoutProps {
  isValid: boolean
  ignoreRedirect?: boolean
}

const WizardLayout: React.SFC<WizardLayoutProps> = props => {
  const { children, isValid, ignoreRedirect } = props

  if (!isValid && !ignoreRedirect) {
    //  Redirect to selection page if nothing is selected in wizard
    return <Redirect to="/" />
  }

  return (
    <div className="floating-container">
      <Grid item xs={12}>
        {children}
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  isValid: getSelectedIndicators(state).length > 0,
})

export default compose(connect(mapStateToProps))(WizardLayout)
