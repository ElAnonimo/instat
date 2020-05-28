import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Store } from "redux";
import { rootReducer } from "../reducers";

const store: Store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
