import {ADD_RECIPE, REMOVE_FROM_CALENDAR} from '../actions';
// import {BREAKFAST, LUNCH, DINNER} from '../actions';
// import {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY} from '../actions';
import type {Action, Meal}  from '../actions';

export type MealTime = {
    breakfast: ?string,
    lunch: ?string,
    dinner: ?string,
};

export type CalendarMeal = {
    sunday: MealTime,
    monday: MealTime,
    tuesday: MealTime,
    wednesday: MealTime,
    thursday: MealTime,
    friday: MealTime,
    saturday: MealTime,
};

const initialCalendarState: CalendarMeal = {
    sunday: { breakfast: null,  lunch: null, dinner: null, },
    monday: { breakfast: null,  lunch: null, dinner: null, },
    tuesday: { breakfast: null,  lunch: null, dinner: null, },
    wednesday: { breakfast: null,  lunch: null, dinner: null, },
    thursday: { breakfast: null,  lunch: null, dinner: null, },
    friday: { breakfast: null,  lunch: null, dinner: null, },
    saturday: { breakfast: null,  lunch: null, dinner: null, },
}

export default function calendar(state: CalendarMeal = initialCalendarState, action: Action) {
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
