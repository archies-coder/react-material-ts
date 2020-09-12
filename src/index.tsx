import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import './app/styles.css'
import App from './app/App';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <Router>
            <CssBaseline/>
            <App/>
        </Router>
    </ThemeProvider>
    </Provider>,
    document.querySelector('#root'),
);
