
const API_ID: string = process.env.REACT_APP_API_ID || 'TBD';
const APP_KEY: string = process.env.REACT_APP_APP_KEY || 'TBD';

export function fetchRecipes(food: string = ''): Promise<*> {
    food = food.trim()

    return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
        .then((res) => res.json())
        .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
