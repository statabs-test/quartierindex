import * as React from 'react';
import { Button } from 'material-ui';
import * as H from 'history';
import { ButtonProps } from 'material-ui/Button';
import { Link } from 'react-router-dom';

interface NavButtonProps extends ButtonProps {
  to: H.LocationDescriptor;
}

/**
 * Additional functionality for navigation for material ui buttons
 */
const NavButton: React.StatelessComponent<NavButtonProps> = ({to, children, ...rest}) => {
  return (
    <Button
      {...rest}
      component={(b) => <Link to={to} className={b.className}>
                          {b.children}
                        </Link>}
    >
        {children}
    </Button>
  );
};

export default NavButton;