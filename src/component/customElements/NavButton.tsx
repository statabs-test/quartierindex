import * as React from 'react';
import { Button } from 'material-ui';
import * as H from 'history';
import { ButtonProps } from 'material-ui/Button';
import { Link } from 'react-router-dom';

interface NavButtonProps extends ButtonProps {
  to: H.LocationDescriptor;
}

const style = {
  backgroundColor: '#f5f5f5',
  border: '1px solid #e3e3e3',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05)',
  textTransform: 'none'
}

/**
 * Additional functionality for navigation for material ui buttons
 */
const NavButton: React.StatelessComponent<NavButtonProps> = ({to, children, ...rest}) => {
  return (
    <Button
      {...rest}
      component={(b) => <Link to={to} className={b.className} style={style}>
                          {b.children}
                        </Link>}
    >
        {children}
    </Button>
  );
};

export default NavButton;