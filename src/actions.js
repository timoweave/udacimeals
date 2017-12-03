import {ADD_RECIPE, REMOVE_FROM_WEEK} from "./types";
import {LOADING_FOOD} from "./types";
import {TOGGLE_MODAL, SAVE_MODAL, OPEN_MODAL, CLOSE_MODAL} from "./types";
import {SEARCH_FOODS, SEARCH_FOODS_DONE, SEARCH_FOODS_ERROR} from "./types";
import {Dispatch} from "./types";
import {fetchRecipes} from "./api";

import type {
    AddRecipeAction,
    RemoveFromWeekAction,
    ToggleModalAction,
    LoadingFoodAction,
} from "./types";
import type {DayTimeMeal, Opened, Loaded} from "./types";

export function addRecipe({day, time, meal}: DayTimeMeal): AddRecipeAction {
    return {type: ADD_RECIPE, day, time, meal};
}

export function removeFromWeek({
    day,
    time,
    meal,
}: DayTimeMeal): RemoveFromWeekAction {
    return {type: REMOVE_FROM_WEEK, day, time};
}

export function openFoodModal(
    day: Day,
    time: Time,
    meal: Meal,
): ToggleModalAction {
    return {type: OPEN_MODAL, day, time, meal};
}

export function saveFoodModal(
    day: Day,
    time: Time,
    meal: Meal,
): ToggleModalAction {
    return {type: SAVE_MODAL, day, time, meal};
}

export function closeFoodModal(): ToggleModalAction {
    return {type: CLOSE_MODAL};
}

export function toggleModal({opened}: Opened): ToggleModalAction {
    return {type: TOGGLE_MODAL, opened};
}

export function loadingFood({loaded}: Loaded): LoadingFoodAction {
    return {type: LOADING_FOOD, loaded};
}

export function searchAllFoods(query: string = ""): Dispatch {
    return (dispatch: *, state: *): void => {
        dispatch({type: SEARCH_FOODS, query});
        console.log({dispatch, state, query});

        fetchRecipes(query)
            .then(foods => {
                console.log({query, state, foods, SEARCH_FOODS_DONE: 1});
                dispatch({type: SEARCH_FOODS_DONE, query, foods});
            })
            .catch(error => {
                console.error({query, state, error});
                dispatch({type: SEARCH_FOODS_ERROR, query, error});
            });
    };
}
