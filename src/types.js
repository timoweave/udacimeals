export const SUNDAY: "sunday" = "sunday";
export const MONDAY: "monday" = "monday";
export const TUESDAY: "tuesday" = "tuesday";
export const WEDNESDAY: "wednesday" = "wednesday";
export const THURSDAY: "thursday" = "thursday";
export const FRIDAY: "friday" = "friday";
export const SATURDAY: "saturday" = "saturday";

export type Day =
    | typeof SUNDAY
    | typeof MONDAY
    | typeof TUESDAY
    | typeof WEDNESDAY
    | typeof THURSDAY
    | typeof FRIDAY
    | typeof SATURDAY;

export const dayOrder: Array<Day> = [
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
];

export const BREAKFAST: "breakfast" = "breakfast";
export const LUNCH: "lunch" = "lunch";
export const DINNER: "dinner" = "dinner";

export const NO_ACTION: "NO_ACTION" = "NO_ACTION";

export type Time = typeof BREAKFAST | typeof LUNCH | typeof DINNER;

export const timeOrder: Array<Time> = [BREAKFAST, LUNCH, DINNER];

export type Meal = {
    +id: string,
    +uri: string,
    +label: string,
    +image: string,
    +calories: number,
    +source: string,
    +ingredientLines: Array<string>,
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

export type WeekTimeOrder = {
    week: Array<BreakfastLunchDinner>,
    timeOrder: Array<Time>,
};

export type ShoppingListProps = {
    list: Array<string>,
};

export type Dispatch = (dispatch: *, state: *) => void;
// export type AsyncDispatch = async function (dispatch: *, state: *): Promise<*>;

export type Actions = {
    +add?: (arg: DayTimeMeal) => void,
    +del?: (arg: DayTimeMeal) => void,
    +search?: (query?: string) => void,
    +goto?: (url: string) => void,
    +open?: (url: string, day: Day, time: Time, meal: ?Meal) => void,
    +close?: () => void,
};

export type HeaderProps = {timeOrder: Array<Time>};
export type EntryProps = {
    +day: Day,
    +time: Time,
    +meal: ?Meal,
    +open: ?(url: string, day: Day, time: Time, meal: ?Meal) => void,
};
export type ContentProps = WeekTimeOrder;
export type AppProps = {
    +week: WeekState,
    +foods: FoodState,
    +config: ConfigState,
    +router: *,
    +add?: (arg: DayTimeMeal) => void,
    +del?: (arg: DayTimeMeal) => void,
    +search?: (query?: string) => void,
    +goto?: (url: string) => void,
    +open?: (url: string, day: Day, time: Time, meal: ?Meal) => void,
    +close?: () => void,
};

export const ADD_RECIPE: "ADD_RECIPE" = "ADD_RECIPE";
export const REMOVE_FROM_WEEK: "REMOVE_FROM_WEEK" = "REMOVE_FROM_WEEK";

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

export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const SAVE_MODAL: "SAVE_MODAL" = "SAVE_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";
export const LOADING_FOOD: "LOADING_FOOD" = "LOADING_FOOD";

export type OpenModalAction = {
    +type: typeof OPEN_MODAL,
    day: Day,
    time: Time,
    meal: ?Meal,
};

export type SaveModalAction = {
    +type: typeof SAVE_MODAL,
    day: Day,
    time: Time,
    meal: ?Meal,
};

export type CloseModalAction = {
    +type: typeof CLOSE_MODAL,
};

export type LoadingFoodAction = {
    +type: typeof LOADING_FOOD,
    loaded: boolean,
};

export const SEARCH_FOODS: "SEARCH_FOODS" = "SEARCH_FOODS";
export const SEARCH_FOODS_DONE: "SEARCH_FOODS_DONE" = "SEARCH_FOODS_DONE";
export const SEARCH_FOODS_ERROR: "SEARCH_FOODS_ERROR" = "SEARCH_FOODS_ERROR";
export const SEARCH_FOODS_CLEAR: "SEARCH_FOODS_CLEAR" = "SEARCH_FOODS_CLEAR";
export const ADD_ONE_FOOD: "ADD_ONE_FOOD" = "ADD_ONE_FOOD";

export type SearchAllFoodAction = {
    +type: typeof SEARCH_FOODS,
    +query: string,
};

export type SearchAllFoodDoneAction = {
    +type: typeof SEARCH_FOODS_DONE,
    +query: string,
    +founds: Array<Meal>,
};

export type SearchAllFoodErrorAction = {
    +type: typeof SEARCH_FOODS_ERROR,
    +query: string,
    +error: *,
};

export type SearchAllFoodClearAction = {
    +type: typeof SEARCH_FOODS_CLEAR,
    +founds: [],
};

export type AddFoodAction = {
    +type: typeof ADD_ONE_FOOD,
    +meal: Meal,
};

export type NoAction = {type: typeof NO_ACTION};
export type WeekAction = AddRecipeAction | RemoveFromWeekAction | NoAction;
export type FoodAction =
    | SearchAllFoodAction
    | SearchAllFoodDoneAction
    | SearchAllFoodErrorAction
    | SearchAllFoodClearAction
    | AddFoodAction
    | NoAction;

export type ConfigAction =
    | LoadingFoodAction
    | OpenModalAction
    | CloseModalAction
    | SaveModalAction
    | NoAction;

export type Action = WeekAction | FoodAction | ConfigAction | NoAction;

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
    founds: Array<Meal>,
    [string]: Meal,
};

export type ConfigState = {
    loading: boolean,
    meal: ?Meal,
};

export type Store = {
    week: WeekState,
    foods: FoodState,
    config: ConfigState,
    router: *,
};

export const initAction: NoAction = {
    type: NO_ACTION,
};

export const initWeekState: WeekState = {
    sunday: {breakfast: null, lunch: null, dinner: null, day: SUNDAY},
    monday: {breakfast: null, lunch: null, dinner: null, day: MONDAY},
    tuesday: {breakfast: null, lunch: null, dinner: null, day: TUESDAY},
    wednesday: {breakfast: null, lunch: null, dinner: null, day: WEDNESDAY},
    thursday: {breakfast: null, lunch: null, dinner: null, day: THURSDAY},
    friday: {breakfast: null, lunch: null, dinner: null, day: FRIDAY},
    saturday: {breakfast: null, lunch: null, dinner: null, day: SATURDAY},
};

export const initFoodState: FoodState = {
    founds: [],
};

export const initConfigState: ConfigState = {
    loading: false,
    meal: null,
};
