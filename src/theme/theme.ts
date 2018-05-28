import { createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';

export const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: 'balck',
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '12px !important',
      },
    },
  }
});
