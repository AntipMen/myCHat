import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { all, takeLatest, takeEvery, put, call } from "redux-saga/effects";
import {
  actionSearch,
  actionSearchResult,
  actionRejected,
  actionResolved,
  actionChatList,
  actionSaveChat,
} from "../actions";
import { sagaMiddleware, store } from "../reducers";
import { GQL } from "../graphQL";

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

function* everySearch({ query }) {
  console.log("search query started to server", query);
  console.log(yield delay(2000));
  const backQuery = `/${query}/`; //TODO: разбиение на слова, | для объединения в регулярке
  const users = yield GQL(
    `query User($query: String){
          UserFind(query: $query){
            _id
            login
            nick
          }
        }`,
    {
      query: JSON.stringify([
        { $or: [{ login: backQuery }, { nick: backQuery }] },
      ]),
    }
  );
  yield put(actionSearchResult(users.data.UserFind));
  console.log("search query finish", query);
}

function* searchCheck() {
  //console.log("watcher");
  yield takeLatest("SEARCH", everySearch);
}

function* fetchWorker({ key, promise, status }) {
  if (status === "PENDING") {
    try {
      const payload = yield promise
      yield put(actionResolved(key, payload));
      yield put(actionSaveChat(payload.data.ChatFind));
      //yield call(actionSaveChat);
    } catch (error) {
      yield put(actionRejected(key, error));
    }
  }
}

function* fetchCheck() {
  console.log("watcher");
  yield takeEvery(
    "PROMISE",
    // ({ type, status }) => type === "PROMISE" && status === "PENDING",
    fetchWorker
  );
}

function* rootSaga() {
  yield all([searchCheck(), fetchCheck()]);
}
export const SearchInput = connect(
  ({ search: { query } }) => ({ value: query, placeholder: "Search..." }),
  {
    onChange(event) {
      return actionSearch(event.target.value);
    },
  }
)("input");

const array = [
  { _id: "5e25df7f1719bf13be585723", login: "test2", nick: "" },
  { _id: "5e25e0a41719bf13be585729", login: "test3", nick: "" },
];

const SearchResult = ({ users = array }) => (
  <div style={{ border: "2px solid black" }}>
    {users.map((user) => (
      <div key={user._id}>
        <Link to={`/user/${user._id}`}>
          {user.login} ({user.nick})
        </Link>
      </div>
    ))}
  </div>
);

export const CSearchResult = connect(({ search: { result } }) => ({
  users: result || [],
}))(SearchResult);

sagaMiddleware.run(rootSaga);

store.dispatch(actionChatList());
