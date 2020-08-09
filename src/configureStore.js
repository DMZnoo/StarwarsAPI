import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createRootReducer from './reducers'
export const history = createBrowserHistory()




const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['router']
};

const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
);


export default preloadedState => {
    const store = createStore(
        persistedReducer,
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

        ),


);
    const persistor = persistStore(store);
    return { store, persistor };
};

