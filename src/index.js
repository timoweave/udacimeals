import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

export function index(): void {
    const root: ?HTMLElement = document.getElementById('root');
    if (root === null || root === undefined || (root && !(root instanceof HTMLElement))) {
        throw new Error('\'#root\' must be a html element.');
    }
    ReactDOM.render(<App />, root);
}

index();
