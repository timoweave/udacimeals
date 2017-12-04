import React from "react";
import ReactDOM from "react-dom";
import {Provider, connect} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {ConnectedRouter as Router} from "react-router-redux";
import {ConnectedApp} from "./App";
import {ConnectedSearch} from "./App";
import {ConnectedShop} from "./App";
import {store, history} from "./reducers";

import "./index.css";

export function index(): void {
    const root: ?HTMLElement = document.getElementById("root");
    if (
        root === null ||
        root === undefined ||
        (root && !(root instanceof HTMLElement))
    ) {
        throw new Error("'#root' must be a html element.");
    }

    const app = (
        <Provider store={store()}>
            <div>
                <Router history={history}>
                    <div>
                        <Route path="/" component={ConnectedApp} />
                        <Route path="/search" component={ConnectedSearch} />
                        <Route path="/shop" component={ConnectedShop} />
                        <Route path="/help" render={() => <div>help</div>} />
                    </div>
                </Router>
            </div>
        </Provider>
    );
    ReactDOM.render(app, root);
}

index();
