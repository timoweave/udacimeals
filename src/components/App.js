import React, { Component } from 'react';
import logo from './logo.svg';
import {addRecipe} from '../actions';
import './App.css';

import type {Element} from 'react';

export type Props = {
    store: *,
};

export type State = {
    calendar: *,
};

class App extends Component<Props, State> {
    state = {
        calendar: this.props.store.getState(),
    };

    componentDidMount(): void {
        const {store} = this.props;
        store.subscribe(() => {
            this.setState(() => ({calendar: store.getState()}));
        });
    }

    setMondayMeal = (event) => {
        const {store} = this.props;
        const {value: meal} = this.input;
        const action = addRecipe({day: 'monday', meal: 'breakfast',  recipe: {label: meal}});
        store.dispatch(action);
    };

    render(): Element<'div'> {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Hello Udacity Meals</h1>
              </header>
              <p className="App-intro">
                Hello Udacity Meals...
                </p>
              <div>
                <input type="text" placeholder="Monday's breakfast meal" ref={(i) => {this.input = i;}}/>
              </div>
              <div>
                <button onClick={this.setMondayMeal}>submit</button>
              </div>
              <div>
                Sunday Meal is '{this.state.calendar.monday.breakfast}'
              </div>
            </div>
        );
  }
}

export default App;
