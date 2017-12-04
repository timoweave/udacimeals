import type {Meal} from "./types";

const API_URL: string = "https://api.edamam.com/search";
const API_ID: string = "72823deb";
const APP_KEY: string = "3338cc96ad23c28482f18f72aedaaebb";

export function fetchRecipes(query: string = ""): Promise<Array<Meal>> {
    const food = query.trim();
    const url = `${API_URL}?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`;
    console.log({fetchRecipes: 1, food, url});
    return fetch(url)
        .then((res: *): Promise<*> => {
            return res.json();
        })
        .then((res: *): Promise<Array<Meal>> => {
            const {hits} = res;
            console.log({res, hits});
            return hits.map(({recipe}: {recipe: Meal}): Meal => {
                const {uri, label, image, calories} = recipe;
                const {source, ingredientLines} = recipe;
                const [, id] = uri.split("#recipe_");
                return {
                    ...{id, uri, label, image, calories, source},
                    ...{ingredientLines},
                };
            });
        });
}
