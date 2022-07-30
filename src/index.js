import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store'
import { HashRouter as Router } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
// import "rsuite/dist/rsuite.min.css";

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <div>
            {/* <Router> */}
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-right"
                getState={(state) => state.toastr} // This is the default
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick
            />
                <App />
            {/* </Router> */}
        </div>
    </Provider>
);
