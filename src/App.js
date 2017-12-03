import React, {Component} from "react";
import {connect} from "react-redux";
import Modal from "react-modal";
import Loading from "react-loading";
import RightArrow from "react-icons/lib/fa/arrow-circle-right";
import CalendarPlusO from "react-icons/lib/fa/calendar-plus-o";
import {push} from "react-router-redux";
import {Switch} from "react-router-dom";

import {getOrderedDayMeals} from "./reducers";
import {addRecipe, removeFromWeek, searchAllFoods} from "./actions";
import {openFoodModal, saveFoodModal, closeFoodModal} from "./actions";
import {capitalize} from "./helpers";
import {timeOrder, WeekTimeOrder, ShoppingList, MONDAY} from "./types";
import {fetchRecipes} from "./api";

import logo from "./logo.svg";
import "./App.css";

import type {Element} from "react";
import type {WeekState, FoodState, ConfigState, Store} from "./types";
import type {Day, DayTimeMeal, Meal, Time, BreakfastLunchDinner} from "./types";
import type {Actions, ContentProps, EntryProps} from "./types";

export type Props = Actions & {
    +week: WeekState,
    +recipes: FoodState,
    +config: ConfigState,
};

const Header = ({timeOrder}: {timeOrder: Array<Time>}): Element<"ul"> => (
    <ul className="meal-types">
        {timeOrder.map(meal_type => (
            <li key={meal_type} className="subheader">
                {capitalize(meal_type)}
            </li>
        ))}
    </ul>
);

const Entry = ({day, time, meal, open}: EntryProps): Element<"div"> =>
    meal !== null && meal !== undefined ? (
        <div className="food-item">
            <img src={meal.image} alt={meal.label} />
            <button onClick={() => open("/list", day, time, meal)}>
                Clear
            </button>
        </div>
    ) : (
        <div>
            <button
                className="icon-btn"
                onClick={() => open("/add", day, time, meal)}
            >
                <CalendarPlusO size={30} />
            </button>
        </div>
    );

const mapDispatchToEntry = dispatch => ({
    open: (url: string, day: Day, time: Time, meal: Meal): void => {
        dispatch(push(`${url}/${day}/${time}`));
        dispatch(openFoodModal(day, time, meal));
    },
});

const ConnectedEntry = connect(null, mapDispatchToEntry)(Entry);

const Content = ({week, timeOrder}: ContentProps): Element<"div"> => (
    <div>
        <div className="calendar">
            <div className="days">
                {week.map(({day}: BreakfastLunchDinner): Element<"h3"> => (
                    <h3 key={day} className="subheader">
                        {capitalize(day)}
                    </h3>
                ))}
            </div>
            <div className="icon-grid">
                {week.map((meals: BreakfastLunchDinner): Element<"ul"> => (
                    <ul key={meals.day}>
                        {timeOrder.map(time => (
                            <li key={time} className="meal">
                                <ConnectedEntry
                                    day={meals.day}
                                    time={time}
                                    meal={meals[time]}
                                />
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    </div>
);

export const ShoppingItems = ({list}: ShoppingList): Element<"div"> => (
    <div className="ingredients-list">
        <h3 className="subheader">Your Shopping List</h3>
        <ul>
            {list.map((item: string): Element<"li"> => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);

export const FoodList = ({food_list, onSelect}: any): Element<"ul" | "p"> => {
    if (food_list.length === 0) {
        return <p>Your search has 0 results.</p>;
    }

    const trim = str =>
        str && str.length > 16 ? str.slice(0, 16) + "..." : str;

    return (
        <ul className="food-list">
            {food_list.map(({label, image, calories, source}: Meal): Element<
                "li",
            > => (
                <li
                    onClick={() => onSelect({label, image, calories, source})}
                    key={label}
                >
                    <h3>{trim(label)}</h3>
                    <img src={image} alt={label} />
                    <div>{Math.floor(calories || 0)} Calories</div>
                    <div>{source}</div>
                </li>
            ))}
        </ul>
    );
};

export const AddFood = ({
    day,
    time,
    meal,
    foods,
    path,
    opened,
    save,
    search,
    close,
}: *): Element<typeof Modal> => (
    <Modal isOpen={opened || path} style={{width: "80%", height: "80%"}}>
        <h1>
            {day !== null && time !== null
                ? `Meal for ${capitalize(day)} ${capitalize(time)}`
                : `Please specify which day and time`}
        </h1>
        <input placeholder="search food" onChange={search} />
        <button onClick={() => close("/")}>Cancel</button>
        <button onClick={save("/", day, time, meal)}>Save</button>
        {foods.length ? <h2>Found </h2> : null}
        <ul>
            {foods.map(f => (
                <li key={f.id}>
                    <div>
                        <img src={f.image} />
                        <p>{f.label}</p>
                    </div>
                </li>
            ))}
        </ul>
    </Modal>
);

const mapStateToAddFood = (state: Store): * => ({
    ...state.config,
    foods: state.recipes.foods,
    path: state.router.location.pathname.match("/add"),
});

const mapDispatchToAddFood = (dispatch: *): void => ({
    close: (url: string): void => {
        dispatch(closeFoodModal());
        dispatch(push(url));
    },
    search: (event: *): void => {
        const query: string = event.target.value;
        dispatch(searchAllFoods(query));
    },
    save: (url: string, day: Day, time: Time, meal: Meal): * => (
        event: *,
    ): void => {
        dispatch(saveFoodModal(day, time, meal));
        dispatch(push(url));
    },
});

export const ConnectedAddFood = connect(
    mapStateToAddFood,
    mapDispatchToAddFood,
)(AddFood);

export class App extends Component<Props> {
    render(): Element<"div"> {
        const {week} = this.props;
        return (
            <div className="container">
                <Header timeOrder={timeOrder} />
                <Content
                    week={getOrderedDayMeals(week)}
                    timeOrder={timeOrder}
                />
            </div>
        );
    }
}

export const ConnectedSwitch = connect(state => ({
    location: state.location,
}))(Switch);

const mapStateToApp = (state: Store): Props => ({
    week: state.week,
    recipes: state.recipes,
    config: state.config,
    router: state.router,
});

const mapDispatchToApp = dispatch => ({
    add: ({day, time, meal}: DayTimeMeal): void =>
        dispatch(addRecipe({day, time, meal})),
    del: ({day, time}: DayTimeMeal): void =>
        dispatch(removeFromWeek({day, time, meal: null})),
    goto: (url: string): void => dispatch(push(url)),
});

export const ConnectedApp = connect(mapStateToApp, mapDispatchToApp)(App);
export default ConnectedApp;
