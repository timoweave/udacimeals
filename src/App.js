import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Loading from 'react-loading';
import RightArrow from 'react-icons/lib/fa/arrow-circle-right';
import CalendarPlusO from 'react-icons/lib/fa/calendar-plus-o';

import {getOrderedDayMeals} from './reducers';
import {addRecipe, removeFromWeek} from './actions';
import {capitalize} from './helpers';
import {timeOrder, MONDAY} from './types';
import {fetchRecipes} from './api';

import logo from './logo.svg';
import './App.css';

import type {Element} from 'react';
import type {WeekState, FoodState, AppState, State} from './types';
import type {Day, DayTimeMeal, Meal, Time, BreakfastLunchDinner} from './types';

export type Props = {
    +week: WeekState,
    +foods: FoodState,
    +app: AppState,
    +add?: (arg: DayTimeMeal) => void,
    +del?: (arg: DayTimeMeal) => void,
};

const Header = ({timeOrder}: {timeOrder: Array<Time>}): Element<'ul'> => (
    <ul className="meal-types">
        {timeOrder.map((meal_type) => (
            <li key={meal_type} className="subheader">
                {capitalize(meal_type)}
            </li>
        ))}
    </ul>
);

const Entry = ({day, time, meal}: {day: Day, time: Time, meal: ?Meal}): Element<'div'> => (
    ((meal !== null) && (meal !== undefined))
    ? (<div className="food-item">
           <img src={meal.image} alt={meal.label}/>
           <button onClick={() => {console.log({day, time, meal});}}>Clear</button>
       </div>)
    : (<div>
           <button className="icon-btn" onClick={() => {console.log({day, time, meal})}}>
               <CalendarPlusO size={30}/>
           </button>
       </div>)
);

const Content = ({week, timeOrder}: {week: Array<BreakfastLunchDinner>, timeOrder: Array<Time>}): Element<'div'> => (
    <div>
        <div className="calendar">
            <div className="days">
                {week.map(({day}: BreakfastLunchDinner): Element<'h3'> => (
                <h3 key={day} className="subheader">
                    {capitalize(day)}
                </h3>
                ))}
            </div>
            <div className="icon-grid">
                {week.map((three_meals: BreakfastLunchDinner): Element<'ul'> => (
                <ul key={three_meals.day}>
                    {timeOrder.map((time) => (
                        <li key={time} className="meal">
                            <Entry day={three_meals.day} time={time} meal={three_meals[time]}/>
                        </li>
                    ))}
                </ul>
                ))}
            </div>
         </div>
    </div>
);

export const ShoppingList = ({ list }: {list: Array<string> }): Element<'div'> => (
    <div className='ingredients-list'>
      <h3 className='subheader'>
        Your Shopping List
      </h3>
      <ul>
        {list.map((item: string): Element<'li'> => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
);

export const FoodList = ({ food_list, onSelect }: any): Element<'ul'|'p'> => {
    if (food_list.length === 0) {
        return <p>Your search has 0 results.</p>
    }

    const trim = (str) => (str && str.length > 16)? str.slice(0, 16) + '...' : str;

    return (
      <ul className='food-list'>
          {food_list.map(({label, image, calories, source}: Meal): Element<'li'> => (
          <li onClick={() => onSelect({label, image, calories, source})} key={label}>
              <h3>{trim(label)}</h3>
              <img src={image} alt={label} />
              <div>{Math.floor(calories||0)} Calories</div>
              <div>{source}</div>
          </li>
        ))}
      </ul>
    );
}

export class App extends Component<Props> {
    input = {};

    setMondayMeal = (event: *): void => {
        const {add = (any): any => {}} = this.props;
        const {value = ""} = this.input;
        add({day: MONDAY, time: 'breakfast', meal: {label: value} });
    };

    render(): Element<'div'> {
        console.log({props: this.props});
        const {week, add, del} = this.props;
        return (
            <div className="container">
                <Header timeOrder={timeOrder}/>
                <Content week={getOrderedDayMeals(week)} timeOrder={timeOrder}/>
            </div>
        );
  }
}

const mapStateToProps = (state: State): Props => ({
    week: state.week,
    foods: state.foods,
    app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
    add: ({day, time, meal}: DayTimeMeal): void => dispatch(addRecipe({day, time, meal})),
    del: ({day, time}: DayTimeMeal): void => dispatch(removeFromWeek({day, time, meal: null})),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
