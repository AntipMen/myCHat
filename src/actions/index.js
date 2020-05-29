import { actionFetch } from "../reducers/PromiseReducer";
import { GQL } from "../graphQL";
import { store } from "../reducers";

export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

export const actionSearch = (query) => ({ type: "SEARCH", query });
export const actionSearchResult = (result) => ({
  type: "SEARCH_RESULT",
  result,
});

export const actionPending = (key, promise) => {
  return {
    status: "PENDING",
    payload: null,
    error: null,
    type: "PROMISE",
    key,
    promise,
  };
};

export const actionResolved = (key, payload) => {
  return { status: "RESOLVED", payload, error: null, type: "PROMISE", key };
};

export const actionRejected = (key, error) => {
  return {
    status: "REJECTED",
    payload: null,
    error: error,
    type: "PROMISE",
    key,
  };
};

export const actionSaveChat = (payload) => ({ type: "SAVE_CHATS", payload });
export const actionSaveMes = (message) => (
  console.log(message),
  {
    type: "SAVE_MESSAGE",
    message,
  }
);

export function actionChatList() {
  let owner = JSON.stringify([
    { ___owner: "5e97105693e2915e617c6fc1" },
    { sort: [{ _id: -1 }] },
  ]);
  return actionPending(
    "chats",
    GQL(
      `query ChatF($owner: String){
            ChatFind(query: $owner) {
              _id
              owner {
                login
              }
              title
              members {
                login
              }
              messages {
                _id
                text
                chat {
                  title
                }
                owner {
                  login
                }
              }
            }
          }`,
      { owner: owner }
    )
  );
}

export function actionAllMessages(_id) {
  let chat = [{ _id }];
  return async (dispatch) => {
    let allmessages = await dispatch(
      actionFetch(
        "allmessages",
        GQL(
          ` query CFO($q: String){
            ChatFindOne(query: $q){
              _id
             
              messages {
                text
                owner {
                  login
                }
              }
            }
          }
          `,
          { q: JSON.stringify(chat) }
        )
      )
    );
  };
}
store.dispatch(actionAllMessages());

export function actionCreateMessage(value) {
  return async (dispatch) => {
    let newmessage = await dispatch(
      actionFetch(
        "newmessage",
        GQL(
          `mutation MesRedAll($text: String){
              MessageUpsert (message: {
              text: $text
              chat: {
              _id:"5ec6589b346e9e2323178740"
              }
              }){
              _id
              text
              owner {
              login
              }
              }
              }`,
          { text: value }
        )
      )
    );
  };
}

store.dispatch(actionCreateMessage());
