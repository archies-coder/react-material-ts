import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#192949'
    }
  },
  shape: {
     borderRadius: 15
  },
  typography: {
    fontFamily: [
        'Poppins',
      'sans-serif',
    ].join(','),
  }
});

export default theme;
