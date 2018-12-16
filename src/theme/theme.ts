import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme'
import { teal } from '@material-ui/core/es/colors'

export const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal,
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
    MuiTooltip: {
      tooltip: {
        fontSize: '1rem',
      },
      tooltipPlacementTop: {
        margin: '8px 0',
        ['@media (min-width: 600px)']: {
          margin: '7px 0',
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
})
