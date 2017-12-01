import {ADD_RECIPE, REMOVE_FROM_WEEK} from './types';
import {TOGGLE_MODAL, LOADING_FOOD} from './types';

import type {AddRecipeAction, RemoveFromWeekAction, ToggleModalAction, LoadingFoodAction} from './types';
import type {DayTimeMeal, Opened, Loaded} from './types';

export function addRecipe({day, time, meal}: DayTimeMeal): AddRecipeAction {
    return {type: ADD_RECIPE, day, time, meal};
}

export function removeFromWeek({day, time, meal}: DayTimeMeal): RemoveFromWeekAction {
    return {type: REMOVE_FROM_WEEK, day, time};
}

export function toggleModal({opened}: Opened): ToggleModalAction {
    return {type: TOGGLE_MODAL, opened};
}

export function loadingFood({loaded}: Loaded): LoadingFoodAction {
    return {type: LOADING_FOOD, loaded};
}
