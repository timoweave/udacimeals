import {createStore, combineReducers} from 'redux';
import {TOGGLE_MODAL, LOADING_FOOD} from './types';
import {ADD_RECIPE, REMOVE_FROM_WEEK} from './types';
import {dayOrder, initAction, initWeekState, initFoodState, initAppState} from './types';

import type {WeekState, FoodState, AppState} from './types';
import type {BreakfastLunchDinner, WeekAction, AppAction} from './types';

export function week(state: WeekState = initWeekState, action: WeekAction = initAction): WeekState {
    switch(action.type) {
    case ADD_RECIPE: {
        const {day, time, meal} = action;
        const new_meal = {[day]: {...state[day], [time]: meal}};
        return {...state, ...new_meal};
    }
    case REMOVE_FROM_WEEK: {
        const {day, time} = action;
        const remove_meal = {[day]: {...state[day], [time]: null}};
        return {...state, ...remove_meal};
    }
    default:
        return state;
    }
}

export function getOrderedDayMeals(state: WeekState): Array<BreakfastLunchDinner> {
    return dayOrder.reduce((result, day) => {
        result.push({
            day: day,
            breakfast: state[day].breakfast,
            lunch: state[day].lunch,
            dinner: state[day].dinner,
        });
        return result;
    }, []);
}

export function food(state: FoodState = initFoodState, action: WeekAction = initAction): FoodState {
    switch (action.type) {
    case ADD_RECIPE: {
        const {meal} = action;
        if (meal && meal.label) {
            return {foods: [...state.foods, meal], [meal.label]: meal};
        } else {
            return state;
        }
    }
    default:
        return state;
    }
}

export function app(state: AppState = initAppState, action: AppAction = initAction): AppState {
    switch(action.type) {
    case TOGGLE_MODAL:
        return {...state, opened: action.opened};
    case LOADING_FOOD:
        return {...state, loaded: action.loaded};
    default:
        return state;
    }
}

export const redux_devtools = () => {
    return window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
};

export const reducers = combineReducers({week, food, app});

export const store = () => createStore(reducers, redux_devtools());

export default reducers;
