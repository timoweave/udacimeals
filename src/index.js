import React from "react";
import ReactDOM from "react-dom";
import {Provider, connect} from "react-redux";
import {Route, BrowserRouter} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import {ConnectedApp, ConnectedAddFood, ConnectedSwitch} from "./App";
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
                <ConnectedRouter history={history}>
                    <div>
                        <Route path="/" component={ConnectedApp} />
                        <Route path="/find" render={() => <div>find</div>} />
                        <Route path="/list" render={() => <div>list</div>} />
                        <Route path="/help" render={() => <div>help</div>} />
                        <Route
                            path="/add/:day/:time"
                            component={ConnectedAddFood}
                        />
                    </div>
                </ConnectedRouter>
                <ConnectedRouter history={history} />
            </div>
        </Provider>
    );
    ReactDOM.render(app, root);
}

index();
