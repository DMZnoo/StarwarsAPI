import { combineReducers } from "redux";
import linkReducer from "./linkReducer";
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    links:linkReducer

});
export default createRootReducer
