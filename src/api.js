import type {Meal} from './types';

// const fetch = require('isomorphic-fetch');
const API_ID: string = '72823deb';
const APP_KEY: string = '3338cc96ad23c28482f18f72aedaaebb';

export function fetchRecipes(food: string = ''): Promise<Array<Meal>> {
    food = food.trim()
    return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
        .then((res: *): Promise<*> => res.json())
        .then(({hits}: {hits: *} ): Promise<Array<Meal>> => hits.map(
            ({recipe: {uri, label, image, source, ingredientLines}}: {recipe: Meal}): Meal =>
                ({uri, label, image, source, ingredientLines, })))
}
