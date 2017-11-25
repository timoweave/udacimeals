import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {store} from './reducers';

import './index.css';

export function index(): void {
    const root: ?HTMLElement = document.getElementById('root');
    if (root === null || root === undefined || (root && !(root instanceof HTMLElement))) {
        throw new Error('\'#root\' must be a html element.');
    }

    const app = (
        <Provider store={store()}>
          <App/>
        </Provider>
    );
    ReactDOM.render(app, root);
}

index();
