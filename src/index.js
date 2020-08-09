import React, {useEffect} from 'react'
import ReactDOM from "react-dom";
import App from './App'
import "./styles/index.scss";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore, { history } from './configureStore'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import reducers from './reducers';
const { store, persistor } = configureStore();



ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{
                        alignContent:"center",
                        width: "3rem",
                        height: "3rem"
                    }}
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        } persistor={persistor}>
            <Router history={history}>
                <App persistor={persistor}/>
            </Router>
        </PersistGate>
    </Provider>,

    document.querySelector("#root")
);
