import * as React from 'react'
import { Button } from '@material-ui/core'
import * as H from 'history'
import { ButtonProps } from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

interface NavButtonProps extends ButtonProps {
  to: H.LocationDescriptor
}

const styleEnabledButton = {
  backgroundColor: '#225b33',
  border: '1px solid #225b33',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05)',
  color: 'white',
  textTransform: 'none',
} as React.CSSProperties

const styleDisabledButton = {
  backgroundColor: '#f5f5f5',
  border: '1px solid #cccccc',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05)',
  color: 'black',
  textTransform: 'none',
} as React.CSSProperties

/**
 * Additional functionality for navigation for material ui buttons
 */
const NavButton: React.StatelessComponent<NavButtonProps> = ({ to, children, ...rest }) => {
  return (
    <Button
      {...rest}
      component={b => (
        <Link to={to} className={b.className} style={rest.disabled ? styleDisabledButton : styleEnabledButton}>
          {b.children}
        </Link>
      )}
    >
      {children}
    </Button>
  )
}

export default NavButton
