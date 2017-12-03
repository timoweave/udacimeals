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

export type WeekTimeOrder = {
    week: Array<BreakfastLunchDinner>,
    timeOrder: Array<Time>,
};

export type ShoppingList = {
    list: Array<string>,
};

export type Dispatch = (dispatch: *, state: *) => void;
// export type AsyncDispatch = async function (dispatch: *, state: *): Promise<*>;

export type Actions = {
    +add?: (arg: DayTimeMeal) => void,
    +del?: (arg: DayTimeMeal) => void,
    +search?: (query?: string) => void,
    +goto?: (url: string) => void,
    open: () => void,
    close: () => void,
};

export type EntryProps = DayTimeMeal & Actions;
export type ContentProps = WeekTimeOrder & Actions;

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
export const TOGGLE_MODAL: "TOGGLE_MODAL" = "TOGGLE_MODAL";
export const LOADING_FOOD: "LOADING_FOOD" = "LOADING_FOOD";

export type ToggleModalAction = {
    +type: typeof TOGGLE_MODAL,
    opened: boolean,
};

export type OpenModalAction = {
    +type: typeof OPEN_MODAL,
    day: Day,
    time: Time,
    meal: Meal,
};

export type SaveModalAction = {
    +type: typeof SAVE_MODAL,
    day: Day,
    time: Time,
    meal: Meal,
};

export type CloseModalAction = {
    +type: typeof CLOSE_MODAL,
    opened: boolean,
};

export type LoadingFoodAction = {
    +type: typeof LOADING_FOOD,
    loaded: boolean,
};

export const SEARCH_FOODS: "SEARCH_FOODS" = "SEARCH_FOODS";
export const SEARCH_FOODS_DONE: "SEARCH_FOODS_DONE" = "SEARCH_FOODS_DONE";
export const SEARCH_FOODS_ERROR: "SEARCH_FOODS_ERROR" = "SEARCH_FOODS_ERROR";
export const ADD_ONE_FOOD: "ADD_ONE_FOOD" = "ADD_ONE_FOOD";

export type SearchAllFoodAction = {
    +type: typeof SEARCH_FOODS,
    +query: string,
};

export type SearchAllFoodDoneAction = {
    +type: typeof SEARCH_FOODS_DONE,
    +query: string,
    +foods: Array<Meal>,
};

export type SearchAllFoodErrorAction = {
    +type: typeof SEARCH_FOODS_ERROR,
    +query: string,
    +error: *,
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
    | AddFoodAction
    | NoAction;
export type ConfigAction =
    | LoadingFoodAction
    | ToggleModalAction
    | OpenModalAction
    | CloseModalAction
    | NoAction;
export type Action = WeekAction | FoodAction | ConfigAction | NoAction;

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

export type ConfigState = {
    opened: boolean,
    loading: boolean,
    day: ?Day,
    time: ?Time,
    meal: ?Meal,
};

export type Store = {
    week: WeekState,
    recipes: FoodState,
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
    foods: [],
};

export const initConfigState: ConfigState = {
    opened: false, // modal is opened (if true)
    loading: false,
    day: null,
    time: null,
    meal: null,
};
