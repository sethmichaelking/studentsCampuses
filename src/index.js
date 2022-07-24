import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store'
import { HashRouter as Router } from 'react-router-dom'

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
