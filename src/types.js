export const SUNDAY: 'sunday' = 'sunday';
export const MONDAY: 'monday' = 'monday';
export const TUESDAY: 'tuesday' = 'tuesday';
export const WEDNESDAY: 'wednesday' = 'wednesday';
export const THURSDAY: 'thursday' = 'thursday';
export const FRIDAY: 'friday' = 'friday';
export const SATURDAY: 'saturday' = 'saturday';

export type Day = typeof SUNDAY | typeof MONDAY | typeof TUESDAY
                | typeof WEDNESDAY | typeof THURSDAY | typeof FRIDAY | typeof SATURDAY;

export const dayOrder: Array<Day> = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY];

export const BREAKFAST: 'breakfast' = 'breakfast';
export const LUNCH: 'lunch' = 'lunch';
export const DINNER: 'dinner' = 'dinner';

export const NO_ACTION: 'NO_ACTION' = 'NO_ACTION';

export type Time = typeof BREAKFAST | typeof LUNCH | typeof DINNER;

export const timeOrder: Array<Time> = [BREAKFAST, LUNCH, DINNER];

export type Meal = {
    +uri?: string, // key
    +label?: string,
    +image?: string,
    +calories?: number,
    +source?: string,
    +ingredientLines?: Array<string>,
};

export type DayTimeMeal = {
    +day: Day,
    +time: Time,
    +meal: ?Meal,
};

export type BreakfastLunchDinner = {
    breakfast: ?Meal,
    lunch: ?Meal,
    dinner: ?Meal,
    day: Day,
};

export const ADD_RECIPE: 'ADD_RECIPE' = 'ADD_RECIPE';
export const REMOVE_FROM_WEEK: 'REMOVE_FROM_WEEK' = 'REMOVE_FROM_WEEK';

export type AddRecipeAction = {
    +type: typeof ADD_RECIPE,
    +day: Day,
    +time: Time,
    +meal: ?Meal,
};

export type RemoveFromWeekAction = {
    +type: typeof REMOVE_FROM_WEEK,
    +day: Day,
    +time: Time,
};

export const TOGGLE_MODAL: 'TOGGLE_MODAL' = 'TOGGLE_MODAL';
export const LOADING_FOOD: 'LOADING_FOOD' = 'LOADING_FOOD';

export type ToggleModalAction = {
    +type: typeof TOGGLE_MODAL,
    opened: boolean,
};

export type LoadingFoodAction = {
    +type: typeof LOADING_FOOD,
    loaded: boolean,
};
export type NoAction =  {type: typeof NO_ACTION};
export type WeekAction = AddRecipeAction | RemoveFromWeekAction | NoAction;
export type AppAction = LoadingFoodAction | ToggleModalAction | NoAction;
export type Action =  WeekAction | AppAction | NoAction;

export type Opened = {opened: boolean};
export type Loaded = {loaded: boolean};

export type WeekState = {
    sunday: BreakfastLunchDinner,
    monday: BreakfastLunchDinner,
    tuesday: BreakfastLunchDinner,
    wednesday: BreakfastLunchDinner,
    thursday: BreakfastLunchDinner,
    friday: BreakfastLunchDinner,
    saturday: BreakfastLunchDinner,
};

export type FoodState = {
    foods: Array<Meal>,
    [string]: Meal,
};

export type AppState = {
    opened: boolean,
    loading: boolean,
};

export type State = {
    week: WeekState,
    foods: FoodState,
    app: AppState,
};

export const initAction: NoAction = {
    type: NO_ACTION,
};

export const initWeekState: WeekState = {
    sunday: { breakfast: null,  lunch: null, dinner: null, day: SUNDAY},
    monday: { breakfast: null,  lunch: null, dinner: null, day: MONDAY},
    tuesday: { breakfast: null,  lunch: null, dinner: null, day: TUESDAY},
    wednesday: { breakfast: null,  lunch: null, dinner: null, day: WEDNESDAY },
    thursday: { breakfast: null,  lunch: null, dinner: null, day: THURSDAY},
    friday: { breakfast: null,  lunch: null, dinner: null, day: FRIDAY},
    saturday: { breakfast: null,  lunch: null, dinner: null, day: SATURDAY},
}

export const initFoodState: FoodState = {
    foods: [],
};

export const initAppState: AppState = {
    opened: false, // modal is opened (if true)
    loading: false,
};
