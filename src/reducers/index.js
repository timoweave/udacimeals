import {createStore, combineReducers} from 'redux';

import {ADD_RECIPE, REMOVE_FROM_CALENDAR} from '../actions';
// import {BREAKFAST, LUNCH, DINNER} from '../actions';
import {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY} from '../actions';
import type {Action, Day}  from '../actions';

export type MealInfo = {
    breakfast: ?string,
    lunch: ?string,
    dinner: ?string,
};

export type WeekMealInfo = {
    sunday: MealInfo,
    monday: MealInfo,
    tuesday: MealInfo,
    wednesday: MealInfo,
    thursday: MealInfo,
    friday: MealInfo,
    saturday: MealInfo,
};

const initialCalendarState: WeekMealInfo = {
    sunday: { breakfast: null,  lunch: null, dinner: null, },
    monday: { breakfast: null,  lunch: null, dinner: null, },
    tuesday: { breakfast: null,  lunch: null, dinner: null, },
    wednesday: { breakfast: null,  lunch: null, dinner: null, },
    thursday: { breakfast: null,  lunch: null, dinner: null, },
    friday: { breakfast: null,  lunch: null, dinner: null, },
    saturday: { breakfast: null,  lunch: null, dinner: null, },
}

export const redux_devtools = () => {
    return window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
};

export function calendar(state: WeekMealInfo = initialCalendarState, action: Action): WeekMealInfo {
    switch(action.type) {
    case ADD_RECIPE: {
        const {day, meal, recipe} = action;
        const new_meal = {...state[day], [meal]: recipe.label};
        return {...state, [day]: new_meal};
    }
    case REMOVE_FROM_CALENDAR: {
        const {day, meal} = action;
        const remove_meal = {...state[day], [meal]: null};
        return {...state, [day]: remove_meal};
    }
    default:
        return state;
    }
}

export type DayMeals = {
    day: Day,
    meals: MealInfo,
};

export type DayMealsArray = Array<DayMeals>;

export function getOrderedDayMeals(state: WeekMealInfo): DayMealsArray {
    const order = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY];
    return order.reduce((result, day) => {
        result.push({
            day: day,
            meals: state[day],
        });
        return result;
    }, []);
}

export const reducers = combineReducers({calendar, food});

export const store = () => createStore(reducers, redux_devtools());

export function food(state= {}, action) {
    switch (action.type) {
    case ADD_RECIPE: {
        const {recipe} = action;
        return {...state, [recipe.label]: recipe};
    }
    default:
        return state;
    }

}

export default reducers;
