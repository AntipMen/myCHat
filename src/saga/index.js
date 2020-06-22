import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Button } from "antd";
import { UserAddOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  putResolve,
  takeLeading,
} from "redux-saga/effects";
import {
  actionSearch,
  actionSearchResult,
  actionRejected,
  actionResolved,
  actionSaveChat,
  actionCleanResult,
  actionSaveUsers,
  actionUserChange,
  actionMediaMessage,
  actionErrorMessage,
  actionChangeAvatar,
  actionAudioMessage,
} from "../actions";
import { sagaMiddleware } from "../reducers";
import { GQL } from "../graphQL";
import {
  getMediaFile,
  getAudioFile,
} from "../сomponents/ChatPage/MessageForm/upload/index";

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
  if (status === "PENDING") {
    try {
      const payload = yield promise;
      yield put(actionResolved(key, payload));
      if (payload.data.ChatFind) {
        yield put(actionSaveChat(payload.data.ChatFind));
      } else if (payload.data.UserFind) {
        yield put(actionSaveUsers(payload.data.UserFind));
      } else if (payload.data.UserUpsert) {
        yield put(actionUserChange(payload.data.UserUpsert));
      }
      if (payload.media) {
        yield put(actionMediaMessage(payload));
      }
    } catch (error) {
      yield put(actionRejected(key, error));
    }
  }
}

function* fetchCheck() {
  yield takeEvery("PROMISE", fetchWorker);
}

function* mediaWorker({ media }) {
  try {
    const mediaFile = yield call(getMediaFile, media);
    yield putResolve(actionMediaMessage(mediaFile));
  } catch (error) {
    yield put(actionErrorMessage());
  }
}

function* mediaCheck() {
  yield takeLeading("MEDIA_MESSAGE", mediaWorker);
}
function* avatarWorker({ avatar }) {
  try {
    const mediaFile = yield call(getMediaFile, avatar);

    yield putResolve(actionChangeAvatar(mediaFile));
  } catch (error) {
    yield put(actionErrorMessage());
  }
}
function* avatarCheck() {
  yield takeLeading("CHANGE_AVATAR", avatarWorker);
}

function* rootSaga() {
  yield all([searchCheck(), fetchCheck(), mediaCheck(), avatarCheck()]);
}
export const SearchInput = connect(
  ({ search: { query } }) => ({
    value: query,
    placeholder: "Search...",
  }),
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

const SearchResult = ({ users = array, onClear }) => (
  <div style={{ border: "2px solid #096dd9", padding: "30px" }}>
    <Button
      type="dashed"
      shape="circle"
      onClick={() => onClear()}
      icon={<VerticalAlignTopOutlined />}
    />
    {users.map((user) => (
      <Link to={`/user/${user._id}`}>
        <div className="search-user" key={user._id}>
          {user.login} ({user.nick})
          <Button type="primary" icon={<UserAddOutlined />} />
        </div>
      </Link>
    ))}
  </div>
);

export const CSearchResult = connect(
  ({ search: { result } }) => ({
    users: result || [],
  }),
  { onClear: actionCleanResult }
)(SearchResult);

sagaMiddleware.run(rootSaga);
