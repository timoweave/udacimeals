export const SUNDAY: 'sunday' = 'sunday';
export const MONDAY: 'monday' = 'monday';
export const TUESDAY: 'tuesday' = 'tuesday';
export const WEDNESDAY: 'wednesday' = 'wednesday';
export const THURSDAY: 'thursday' = 'thursday';
export const FRIDAY: 'friday' = 'friday';
export const SATURDAY: 'saturday' = 'saturday';

export type Day = typeof SUNDAY | typeof MONDAY | typeof TUESDAY
    | typeof WEDNESDAY | typeof THURSDAY | typeof FRIDAY | typeof SATURDAY;

export const BREAKFAST: 'breakfast' = 'breakfast';
export const LUNCH: 'lunch' = 'lunch';
export const DINNER: 'dinner' = 'dinner';

export type Meal= typeof BREAKFAST | typeof LUNCH | typeof DINNER;

export type DayMeal = {
    +day: Day,
    +meal: Meal,        
};

export type Recipe = {
    +label: string,
};

export type DayMealRecipe = {
    +day: Day,
    +meal: Meal,
    +recipe: Recipe,
};

export const ADD_RECIPE: 'ADD_RECIPE' = 'ADD_RECIPE';
export const REMOVE_FROM_CALENDAR: 'REMOVE_FROM_CALENDAR' = 'REMOVE_FROM_CALENDAR';

export type AddRecipeAction = {
    +type: typeof ADD_RECIPE,
    +day: Day,
    +recipe: Recipe,
    +meal: Meal,
};

export type RemoveFromCalendarAction = {
    +type: typeof REMOVE_FROM_CALENDAR,
    +day: Day,
    +meal: Meal,
};

export type Action = AddRecipeAction | RemoveFromCalendarAction;

export function addRecipe({day, recipe, meal}: DayMealRecipe): AddRecipeAction {
    return {type: ADD_RECIPE, day, recipe, meal};
}

export function removeFromCalendar({day, meal}: DayMeal): RemoveFromCalendarAction {
    return {type: REMOVE_FROM_CALENDAR, day, meal};
}
