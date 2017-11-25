import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getOrderedDayMeals} from '../reducers';
import {addRecipe, removeFromCalendar} from '../actions';
import logo from './logo.svg';
import './App.css';

import type {Element} from 'react';
import type {WeekMealInfo} from '../reducers';
import type {DayMeal, DayMealRecipe} from '../actions';

export type Props = {
    +calendar: WeekMealInfo,
    +add: (arg: DayMealRecipe) => void,
    +del: (arg: DayMeal) => void,
};

export type State = {
};

export class App extends Component<Props, State> {

    setMondayMeal = (event: *): void => {
        const {value} = this.input;
        this.props.add({day: 'sunday', meal: 'breakfast', recipe: { label: value} });
    };

    render(): Element<'div'> {
        const [meal] = this.props.calendar.filter((c) => c.day === 'sunday').map(i=> i.meals.breakfast);
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
                <input type="text" placeholder="Sunday's breakfast meal" ref={(i) => {this.input = i;}}/>
              </div>
              <div>
                <button onClick={this.setMondayMeal}>submit</button>
              </div>
              <div>
                {(meal !== null && meal.length > 0) ? `Sunday Meal is "${meal}"!`: null}
              </div>
            </div>
        );
  }
}

const mapStateToProps = (state: {calendar: WeekMealInfo, food: *}): Props => ({
    calendar: getOrderedDayMeals(state.calendar),
    food: state.food,
});

const mapDispatchToProps = (dispatch) => ({
    add: ({day, recipe, meal}: DayMealRecipe): void => dispatch(addRecipe({day, recipe, meal})),
    del: ({day, meal}: DayMeal): void => dispatch(removeFromCalendar({day, meal})),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
