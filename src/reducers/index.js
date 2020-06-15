import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./AuthReducer";
import promiseReducer from "./PromiseReducer";
import chatsReducer from "./chatsReducer";
import { searchReducer } from "./searchReducer";
import createSagaMiddleware from "redux-saga";
import routerReducer from "./routerReducer";
import messageReducer from "./messageReducer";
import usersReducer from "./usersReducer";

export const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  auth: authReducer,
  promise: promiseReducer,
  chats: chatsReducer,
  search: searchReducer,
  router: routerReducer,
  message: messageReducer,
  users: usersReducer,
});

export const store = createStore(
  reducers,
  applyMiddleware(thunk, sagaMiddleware)
);

store.subscribe(() => console.log(store.getState()));
