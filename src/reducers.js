import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {ConnectedRouter, routerReducer as router} from "react-router-redux";
import {routerMiddleware} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {SAVE_MODAL, OPEN_MODAL, CLOSE_MODAL} from "./types";
import {LOADING_FOOD, NO_ACTION} from "./types";
import {ADD_RECIPE, REMOVE_FROM_WEEK} from "./types";
import {SEARCH_FOODS, SEARCH_FOODS_DONE, SEARCH_FOODS_ERROR} from "./types";
import {ADD_ONE_FOOD} from "./types";
import {dayOrder} from "./types";
import {
    initAction,
    initWeekState,
    initFoodState,
    initConfigState,
} from "./types";
import {searchAllFoods} from "./actions";
import {fetchRecipes} from "./api";

import type {WeekState, FoodState, ConfigState} from "./types";
import type {BreakfastLunchDinner} from "./types";
import type {WeekAction, FoodAction, ConfigAction} from "./types";

export function week(
    state: WeekState = initWeekState,
    action: WeekAction = initAction,
): WeekState {
    switch (action.type) {
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
        case NO_ACTION:
        default:
            return state;
    }
}

export function getOrderedDayMeals(
    state: WeekState,
): Array<BreakfastLunchDinner> {
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

export function recipes(
    state: FoodState = initFoodState,
    action: FoodAction = initAction,
): FoodState {
    switch (action.type) {
        case SEARCH_FOODS: {
            console.log({state, action});
            return {...state, foods: []};
        }
        case SEARCH_FOODS_DONE: {
            const {foods} = action;
            console.log({state, action});
            return {...state, foods};
        }
        case SEARCH_FOODS_ERROR: {
            console.log({state, action});
            // const foods = fetchRecipes(action.query);
            return state;
        }
        case ADD_ONE_FOOD: {
            return state;
            /*
        if (action && action.meal && action.meal.label) {
            return state;
        } else {
            return state;
        }
        */
        }
        case NO_ACTION:
        default:
            return state;
    }
}

export function config(
    state: ConfigState = initConfigState,
    action: ConfigAction = initAction,
): ConfigState {
    switch (action.type) {
        case CLOSE_MODAL:
            console.log({action, state});
            return {...state, meal: null};
        case SAVE_MODAL: {
            const {meal} = action;
            return {...state, meal};
        }
        case OPEN_MODAL: {
            const {meal} = action;
            return {...state, meal};
        }
        case LOADING_FOOD:
            console.log({action, state});
            return {...state, loaded: action.loaded};
        case NO_ACTION:
        default:
            return state;
    }
}

export const history = createBrowserHistory();
const router_history = routerMiddleware(history);

export const reducers = combineReducers({
    week,
    recipes,
    config,
    router,
});

export const store = () =>
    createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunk, router_history)),
    );

export default reducers;
