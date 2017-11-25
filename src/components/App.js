import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export type Props  = {
};

export type State = {
};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello Udacity Meals</h1>
        </header>
        <p className="App-intro">
          Hello Udacity Meals...
        </p>
      </div>
    );
  }
}

export default App;
