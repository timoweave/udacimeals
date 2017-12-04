import thunk from "redux-thunk";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {createBrowserHistory} from "history";
import {routerReducer as router} from "react-router-redux";
import {routerMiddleware} from "react-router-redux";
import {composeWithDevTools as compose} from "redux-devtools-extension";

import {SAVE_MODAL, OPEN_MODAL, CLOSE_MODAL} from "./types";
import {LOADING_FOOD, NO_ACTION} from "./types";
import {ADD_RECIPE, REMOVE_FROM_WEEK} from "./types";
import {SEARCH_FOODS, SEARCH_FOODS_CLEAR} from "./types";
import {SEARCH_FOODS_DONE, SEARCH_FOODS_ERROR} from "./types";
import {ADD_ONE_FOOD} from "./types";
import {dayOrder} from "./types";
import {initAction} from "./types";
import {initWeekState, initFoodState, initConfigState} from "./types";
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

export function foods(
    state: FoodState = initFoodState,
    action: FoodAction = initAction,
): FoodState {
    switch (action.type) {
        case SEARCH_FOODS: {
            return {...state, founds: []};
        }
        case SEARCH_FOODS_CLEAR: {
            return {...state, founds: []};
        }
        case SEARCH_FOODS_DONE: {
            const {founds} = action;
            const recipes = founds.reduce((ans, food) => {
                ans[food.id] = food;
                return ans;
            }, {});
            return {...state, founds, ...recipes};
        }
        case SEARCH_FOODS_ERROR: {
            console.error({state, action});
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
            return {...state, meal: null};
        case SAVE_MODAL: {
            return {...state, meal: action.meal};
        }
        case OPEN_MODAL: {
            return {...state, meal: action.meal};
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
export const location = routerMiddleware(history);
export const reducers = combineReducers({week, foods, config, router});
export const middlewares = compose(applyMiddleware(thunk, location));
export const store = () => createStore(reducers, middlewares);

export default reducers;
