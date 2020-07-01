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
  select,
  actionChannel,
  take,
} from "redux-saga/effects";
import { buffers } from "redux-saga";
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
  actionAuthLogin,
  actionChatList,
  actionAllUsers,
  actionPending,
} from "../actions";
import { sagaMiddleware } from "../reducers";
import { getGQL } from "../graphQL";
import { getMediaFile } from "../сomponents/ChatPage/MessageForm/upload/index";
import { AvatarColors } from "../сomponents/ChatPage/MessageForm/messageList/avatars";

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

function* everySearch({ query }) {
  console.log("search query started to server", query);
  console.log(yield delay(2000));
  const backQuery = `/${query}/`; //TODO: разбиение на слова, | для объединения в регулярке

  const userToken = yield select((state) => state.auth.jwt);
  const users = yield getGQL(
    {
      Authorization: "Bearer " + userToken,
    },
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
      if (payload.data.login) {
        yield put(actionAuthLogin(payload.data.login));
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

function* loginWorker({ token }) {
  if (token !== null && token !== undefined) {
    try {
      const userId = yield select((state) => state.auth.data.sub.id);
      yield put(actionChatList(token, userId));
      yield put(actionAllUsers(token));
    } catch (error) {
      yield put(actionRejected(error));
    }
  }
}

function* loginCheck() {
  yield takeEvery("AUTH_LOGIN", loginWorker);
}

function* watchRequests() {
  const auth = yield select((state) => state.auth.jwt);
  if (auth !== null && auth !== undefined) {
    const userToken = yield select((state) => state.auth.jwt);
    const userId = yield select((state) => state.auth.data.sub.id);
    const requestChan = yield actionChannel("ROUTE", buffers.sliding(1));
    while (true) {
      yield take(requestChan);
      const promise = yield call(actionChatList, userToken, userId);
      yield putResolve(actionPending("chats", promise.promise));
      const promiseUser = yield call(actionAllUsers, userToken);
      yield putResolve(actionPending("users", promiseUser.promise));
    }
  }
}

function* rootSaga() {
  yield all([
    searchCheck(),
    fetchCheck(),
    mediaCheck(),
    avatarCheck(),
    loginCheck(),
    watchRequests(),
  ]);
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

const SearchResult = ({ users = array, onClear, router }) => {
  return (
    <div style={{ padding: "10px" }}>
      <Button
        type="dashed"
        shape="circle"
        onClick={() => onClear()}
        icon={<VerticalAlignTopOutlined />}
        style={{
          margin: "5px",
        }}
      />
      {users.map((user) => (
        <Link to={`/user/${user._id}`}>
          <div
            className={user._id === router ? "selected-user" : "search-user"}
            key={user._id}
          >
            <UserAvatar user={user} />
            <h3>
              {user.login} ({user.nick})
            </h3>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              style={{ flex: "0 0 30px" }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export const CSearchResult = connect(
  ({ search: { result }, router }) => ({
    users: result || [],
    router: router.match.params._id,
  }),
  { onClear: actionCleanResult }
)(SearchResult);

const UserAvatar = ({ user }) => {
  const { color, colorLighten } = AvatarColors(user.login + "a");
  return user.avatar !== null && user.avatar !== undefined ? (
    <img
      src={user.avatar && `http://chat.fs.a-level.com.ua/${user.avatar.url}`}
      width="50px"
      height="50px"
      alt="avatar"
      style={{
        borderRadius: "100%",
        border: "solid 2px #1890ff",
        marginRight: "5px",
      }}
    />
  ) : (
    <span
      className="circle-min-chat"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
      }}
    >
      {user.login ? <h1>{user.login.slice(0, 1)}</h1> : ""}
    </span>
  );
};

sagaMiddleware.run(rootSaga);
