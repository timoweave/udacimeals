import React from "react";
import Modal from "react-modal";
import Loading from "react-loading";
import RightArrow from "react-icons/lib/fa/arrow-circle-right";
import CalendarPlusO from "react-icons/lib/fa/calendar-plus-o";
import CheckList from "react-icons/lib/go/checklist";
import TimesCircleO from "react-icons/lib/fa/times-circle-o";
import {DebounceInput as Input} from "react-debounce-input";

import {Component} from "react";
import {connect} from "react-redux";
import {push, goBack, CALL_HISTORY_METHOD} from "react-router-redux";
import {Switch} from "react-router-dom";

import {getOrderedDayMeals} from "./reducers";
import {addRecipe, removeFromWeek} from "./actions";
import {searchAllFoods, clearSearchAllFoods} from "./actions";
import {selectFood, loadCachedFoods} from "./actions";
import {openFoodModal, saveFoodModal, closeFoodModal} from "./actions";
import {timeOrder, MONDAY} from "./types";
import {capitalize} from "./helpers";
import {fetchRecipes} from "./api";

import type {Element} from "react";
import type {Connector} from "react-redux";
import type {ShoppingListProps} from "./types";
import type {WeekState, FoodState, ConfigState, Store} from "./types";
import type {Day, DayTimeMeal, Meal, Time, BreakfastLunchDinner} from "./types";
import type {AppProps, HeaderProps, ContentProps, EntryProps} from "./types";

import "./App.css";

export const ConnectedSwitch = connect(mapStateToSwitch)(Switch);

export function Header(props: HeaderProps): Element<"ul"> {
    const {timeOrder} = props;

    return (
        <ul className="meal-types">
            {timeOrder.map(time => (
                <li key={time} className="subheader">
                    {capitalize(time)}
                </li>
            ))}
        </ul>
    );
}

export function Entry(props: EntryProps): Element<"div"> {
    const {day, time, meal = null, open = null, remove = null} = props;
    const add = () => {
        console.log({day, time, meal, open});
        open && open("/search", day, time, meal);
    };
    const del = () => remove && remove({day, time});
    const list = () => () => open && open("/list", day, time, meal);
    const meal_picked = meal !== null && meal !== undefined;

    return meal_picked ? (
        <div className="food-item">
            <img src={meal && meal.image} alt={meal && meal.label} />
            <div className="bottom-btns">
                <button className="icon-btn" onClick={del}>
                    <TimesCircleO size={20} />
                </button>
                <button className="icon-btn" onClick={list}>
                    <CheckList size={20} />
                </button>
            </div>
        </div>
    ) : (
        <div>
            <button className="icon-btn" onClick={add}>
                <CalendarPlusO size={100} />
            </button>
        </div>
    );
}

function mapDispatchToEntry(dispatch: *): * {
    return {
        open: (url: string, day: Day, time: Time, meal: ?Meal): void => {
            dispatch(push(`${url}/${day}/${time}`));
            dispatch(loadCachedFoods());
            dispatch(openFoodModal({day, time, meal}));
        },
        remove: ({day, time}: DayTimeMeal): void =>
            dispatch(removeFromWeek({day, time, meal: null})),
    };
}

export const ConnectedEntry = connect(null, mapDispatchToEntry)(Entry);

export function Content(props: ContentProps): Element<"div"> {
    const {week, timeOrder} = props;

    return (
        <div>
            <div className="calendar">
                <div className="days">
                    {week.map((args: BreakfastLunchDinner): Element<"h3"> => {
                        const {day} = args;
                        return (
                            <h3 key={day} className="subheader">
                                {capitalize(day)}
                            </h3>
                        );
                    })}
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
}

function Shop(props: *): Element<typeof Modal> {
    return (
        <Modal
            overlayClassName="overlay"
            className="modal"
            isOpen={true}
            contentLabel="Modal"
        >
            <div>
                <h1>Hello Shopping Food </h1>
            </div>
        </Modal>
    );
}

function mapStateToShop(state: Store): * {
    const {founds} = state.foods;
    const {pathname} = state.router.location;
    const opened = pathname.match("^/search") === null ? false : true;
    const [root, add, day, time] = pathname.split("/");

    return {...state.config, founds, opened, day, time};
}

function mapDispatchToShop(dispatch: *): * {
    return {
        close: (): void => {
            dispatch(closeFoodModal());
            dispatch(clearSearchAllFoods());
            dispatch(goBack());
        },
        search: (event: *): void => {
            const query: string = event.target.value;
            dispatch(searchAllFoods(query));
        },
        select: ({label, image, calories, source}): void => {},
        save: (day: Day, time: Time, meal: Meal): * => {
            return (event: *): void => {
                dispatch(saveFoodModal(day, time, meal));
                dispatch(goBack());
            };
        },
    };
}

export const ConnectedShop = connect(mapStateToShop, mapDispatchToShop)(Shop);

export function ShoppingList(props: ShoppingListProps): Element<"div"> {
    const {list} = props;

    return (
        <div className="ingredients-list">
            <h3 className="subheader">Your Shopping List</h3>
            <ul>
                {list.map((item: string, ith: number): Element<"li"> => (
                    <li key={ith}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export function FoodList(props: any): Element<"div"> {
    const {day, time, foods, onSelect, onSave} = props;

    if (foods.length === 0) {
        return (
            <div>
                <p>Your search has 0 results.</p>
            </div>
        );
    }

    const trim = str =>
        str && str.length > 16 ? str.slice(0, 16) + "..." : str;
    console.log({FoodList: "component", len: foods.length, foods});
    return (
        <div>
            <ul className="food-list">
                {foods.map((meal: Meal): Element<"li"> => {
                    const {id, label, image, calories, source} = meal;
                    const select = () => {
                        onSelect(day, time, meal);
                        onSave(meal);
                    };
                    return (
                        <li onClick={select} key={id}>
                            <h3>{trim(label)}</h3>
                            <img src={image} alt={label} />
                            <div>{Math.floor(calories || 0)} Calories</div>
                            <div>{source}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function Search(props: *): Element<typeof Modal> {
    const {day, time, meal, founds, path} = props;
    const {opened, save, search, select, close} = props;
    const tip = "search food";
    console.log({day, time, meal});
    const presave = meal => save(day, time, meal);
    const style = {width: "80%", height: "80%"};
    return (
        <Modal
            isOpen={opened}
            style={style}
            overlayClassName="overlay"
            className="modal"
            contentLabel="Modal"
        >
            <h1>
                {day !== null && time !== null
                    ? `Meal for ${capitalize(day)} ${capitalize(time)}`
                    : `Please specify which day and time`}
            </h1>
            <Input debounceTimeout={300} placeholder={tip} onChange={search} />
            <button onClick={() => close()}>Cancel</button>
            {<button onClick={save(day, time, meal)}>Save</button>}
            {founds.length ? <h2>Recipes Found </h2> : null}
            <FoodList
                day={day}
                time={time}
                foods={founds}
                onSelect={select}
                onSave={presave}
            />
        </Modal>
    );
}

function mapStateToSearch(state: Store): * {
    const {founds, selected: meal} = state.foods;
    const {pathname} = state.router.location;
    const opened = pathname.match("^/search") === null ? false : true;
    const [root, add, day, time] = pathname.split("/");

    return {...state.config, founds, opened, day, time, meal};
}

function mapDispatchToSearch(dispatch: *): * {
    return {
        close: (): void => {
            dispatch(closeFoodModal());
            dispatch(goBack());
        },
        search: (event: *): void => {
            const query: string = event.target.value;
            if (query.length === 0) {
                dispatch(clearSearchAllFoods());
            } else {
                dispatch(searchAllFoods(query));
            }
        },
        select: (day: Day, time: Time, meal: Meal): void => {
            console.log({meal});
            dispatch(selectFood(meal));
            dispatch(addRecipe({day, time, meal}));
            dispatch(goBack());
        },
        save: (day: Day, time: Time, meal: Meal): * => {
            return (event: *): void => {
                console.log({save: "search", day, time, meal});
                // dispatch(selectFood(meal));
                dispatch(addRecipe({day, time, meal}));
                dispatch(goBack());
            };
        },
    };
}

export const ConnectedSearch = connect(mapStateToSearch, mapDispatchToSearch)(
    Search,
);

export function App(props: AppProps): Element<"div"> {
    const {week} = props;

    return (
        <div className="container">
            <Header timeOrder={timeOrder} />
            <Content week={getOrderedDayMeals(week)} timeOrder={timeOrder} />
        </div>
    );
}

function mapStateToSwitch(state: *): * {
    return {
        location: state.location,
    };
}

function mapStateToApp(state: Store): AppProps {
    return {
        week: state.week,
        foods: state.foods,
        config: state.config,
        router: state.router,
    };
}

function mapDispatchToApp(dispatch: *): * {
    return {
        add: ({day, time, meal}: DayTimeMeal): void =>
            dispatch(addRecipe({day, time, meal})),
        del: ({day, time}: DayTimeMeal): void =>
            dispatch(removeFromWeek({day, time, meal: null})),
        goto: (url: string): void => dispatch(push(url)),
    };
}

export const ConnectedApp = connect(mapStateToApp, mapDispatchToApp)(App);

export default ConnectedApp;
