import {ADD_RECIPE, REMOVE_FROM_WEEK} from "./types";
import {LOADING_FOOD} from "./types";
import {SAVE_MODAL, OPEN_MODAL, CLOSE_MODAL} from "./types";
import {SEARCH_FOODS, SEARCH_FOODS_DONE, SEARCH_FOODS_ERROR} from "./types";
import {SEARCH_FOODS_CLEAR} from "./types";
import {fetchRecipes} from "./api";

import type {Dispatch, SearchAllFoodClearAction} from "./types";
import type {AddRecipeAction, RemoveFromWeekAction} from "./types";
import type {LoadingFoodAction, CloseModalAction} from "./types";
import type {SaveModalAction, OpenModalAction} from "./types";
import type {Time, Day, Meal, DayTimeMeal, Loaded} from "./types";

export function addRecipe({day, time, meal}: DayTimeMeal): AddRecipeAction {
    return {type: ADD_RECIPE, day, time, meal};
}

export function removeFromWeek(arg: DayTimeMeal): RemoveFromWeekAction {
    const {day, time, meal} = arg;
    return {type: REMOVE_FROM_WEEK, day, time};
}

export function openFoodModal(arg: DayTimeMeal): OpenModalAction {
    const {day, time, meal} = arg;
    console.log({day, time, meal});
    return {type: OPEN_MODAL, day, time, meal};
}

export function saveFoodModal(
    day: Day,
    time: Time,
    meal: Meal,
): SaveModalAction {
    return {type: SAVE_MODAL, day, time, meal};
}

export function closeFoodModal(): CloseModalAction {
    return {type: CLOSE_MODAL};
}

export function loadingFood({loaded}: Loaded): LoadingFoodAction {
    return {type: LOADING_FOOD, loaded};
}

export function clearSearchAllFoods(): SearchAllFoodClearAction {
    return {type: SEARCH_FOODS_CLEAR, founds: []};
}

export function searchAllFoods(query: string = ""): Dispatch {
    return (dispatch: *, state: *): void => {
        dispatch({type: SEARCH_FOODS, query});
        console.log({dispatch, state, query});

        fetchRecipes(query)
            .then(founds => {
                console.log({query, state, founds, SEARCH_FOODS_DONE: 1});
                dispatch({type: SEARCH_FOODS_DONE, query, founds});
            })
            .catch(error => {
                console.error({query, state, error});
                dispatch({type: SEARCH_FOODS_ERROR, query, error});
            });
    };
}
