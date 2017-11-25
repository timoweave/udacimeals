
export const ADD_RECIPE: 'ADD_RECIPE' = 'ADD_RECIPE';
export const REMOVE_FROM_CALENDAR: 'REMOVE_FROM_CALENDAR' = 'REMOVE_FROM_CALENDAR';

export type DayMealRecipe = {
    +day: string,
    +meal: string,
    +recipe: string,
};

export type DayMeal = {
    +day: string,
    +meal: string,
};

export type AddRecipeAction = {
    +type: typeof ADD_RECIPE,
    +day: string,
    +recipe: string,
    +meal: string,
};

export type RemoveFromCalendarAction = {
    +type: typeof REMOVE_FROM_CALENDAR,
    +day: string,
    +meal: string,
};

export function addRecipe({day, recipe, meal}: DayMealRecipe): AddRecipeAction {
    return {type: ADD_RECIPE, day, recipe, meal};
}

export function removeFromCalendar({day, meal}: DayMeal): RemoveFromCalendarAction {
    return {type: REMOVE_FROM_CALENDAR, day, meal};
}
