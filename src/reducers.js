import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {createBrowserHistory} from "history";
import {routerReducer as router} from "react-router-redux";
import {routerMiddleware} from "react-router-redux";
import {composeWithDevTools as compose} from "redux-devtools-extension";

import {NO_ACTION} from "./types";
import {SAVE_MODAL, OPEN_MODAL, CLOSE_MODAL} from "./types";
import {LOADING_FOOD, SELECT_FOOD, LOAD_CACHED_FOODS} from "./types";
import {ADD_RECIPE, REMOVE_FROM_WEEK} from "./types";
import {SEARCH_FOODS, SEARCH_FOODS_CLEAR} from "./types";
import {SEARCH_FOODS_DONE, SEARCH_FOODS_ERROR} from "./types";
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
            console.log({add_recipe: 1, new_meal, day, time, meal});
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
        case LOADING_FOOD: {
            // spinner
            return state;
        }
        case SEARCH_FOODS: {
            return {...state, founds: []};
        }
        case SEARCH_FOODS_CLEAR: {
            return {...state, founds: []};
        }
        case SEARCH_FOODS_DONE: {
            const {founds: new_founds} = action;
            const old_foods = Object.assign({}, state);
            delete old_foods.founds;
            delete old_foods.selected;
            const old_founds = Object.keys(old_foods).reduce((a, f) => {
                a.push(old_foods[f]);
                return a;
            }, []);

            const new_recipes = new_founds.reduce((ans, food) => {
                ans[food.id] = food;
                return ans;
            }, {});
            // return {...state, founds: [...founds, ...state.founds], ...new_recipes};
            const founds = [...new_founds, ...old_founds];
            return {...state, founds, ...new_recipes};
        }
        case SEARCH_FOODS_ERROR: {
            console.error({state, action});
            return state;
        }
        case LOAD_CACHED_FOODS: {
            const {selected} = action;
            const foods = Object.assign({}, state);
            delete foods.founds;
            delete foods.selected;
            const founds = Object.keys(foods).reduce((a, f) => {
                a.push(foods[f]);
                return a;
            }, []);
            return {...state, founds, selected: null};
        }
        case SELECT_FOOD: {
            const {selected} = action;
            return {...state, founds: [], selected};
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
            return {...state, meal: null}; // TBD meal
        case SAVE_MODAL: {
            return {...state, meal: action.meal}; // TBD meal
        }
        case OPEN_MODAL: {
            return {...state, meal: action.meal}; // TBD meal
        }
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
