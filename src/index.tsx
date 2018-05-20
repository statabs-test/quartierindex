import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import { store } from './state/index';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { theme } from './theme/theme';

ReactDOM.render(
    <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </Router>
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
