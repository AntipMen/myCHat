import React from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
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
  actionPending,
  actionUser,
} from "../actions";
import { sagaMiddleware, store } from "../reducers";
import { GQL } from "../graphQL";
import authReducer from "../reducers/AuthReducer";
import { CUserInfo } from "../сomponents/ChatPage/ChatList/userInfo";

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
            avatar {
              _id
              url
            }
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
  yield takeLatest("SEARCH", everySearch);
}

function* fetchWorker({ key, promise, status }) {
  //debugger;
  if (status === "PENDING") {
    try {
      const payload = yield promise;
      yield put(actionResolved(key, payload));
      yield put(actionSaveChat(payload.data.ChatFind));
    } catch (error) {
      yield put(actionRejected(key, error));
    }
  }
}

function* fetchCheck() {
  yield takeEvery(
    "PROMISE",
    // ({ type, status }) => type === "PROMISE" && status === "PENDING",
    fetchWorker
  );
}

// function* routeWorker({ match: { path, auth, params, url } }) {
//   //debugger;
//   const path2gql = {
//     "/mychat": ({ params }) => ({
//       name: "chat",
//       query: `query ChatF($owner: String){
//       ChatFind(query: $owner) {
//         _id
//         owner {
//           login
//         }
//         title
//         members {
//           login
//         }
//         messages {
//           _id
//           text
//           media {
//             url
//             _id

//           }
//           chat {
//             title
//           }
//           owner {
//             login
//           }
//         }
//       }
//     }`,
//       variables: { owner: JSON.stringify([{ _id: params._id }]) },
//     }),
//   };
//   if (path in path2gql) {
//     const { name, query, variables } = path2gql[path]({
//       path,
//       url,
//       params,
//       auth,
//     });
//     yield put(actionPending(name, GQL(query, variables)));
//   }
// }

// function* routeCheck() {
//   console.log("watcher");
//   yield takeEvery("ROUTE", routeWorker);
// }

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
        {user.login} ({user.nick})
        <Link to={`/user/${user._id}`}>
          <Button type="primary" icon={<UserAddOutlined />} />
        </Link>
      </div>
    ))}
  </div>
);

export const CSearchResult = connect(({ search: { result } }) => ({
  users: result || [],
}))(SearchResult);

sagaMiddleware.run(rootSaga);

// if (store.getState().auth.jwt) {
  // store.dispatch(actionChatList(store.getState()));
// }
