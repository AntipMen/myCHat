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
export const actionSaveMes = (message) => ({
  type: "SAVE_MESSAGE",
  message,
});

export function actionChatList(store) {
  //debugger
  console.log(store);
  if (store.auth.jwt) {
    const id = store.auth.data.sub.id;
    let owner = JSON.stringify([
      { "members._id": id },
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
                _id
              }
              messages {
                _id
                createdAt
                text
                media {
                  url
                  _id
                  
                }
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
}

export function actionUser(user) {
  //debugger;
  console.log(user);
  if (user.auth.data !== undefined) {
    const id = user.auth.data.sub.id;
    let userId = JSON.stringify([{ _id: id }]);
    return async (dispatch) => {
      let user = await dispatch(
        actionFetch(
          "user",
          GQL(
            ` query user($q: String){
            UserFind(query: $q){
              _id
              createdAt
              login
              nick
              acl
              avatar {
                _id
                url
              }
                }
          }
          `,
            { q: userId }
          )
        )
      );
    };
  }
}
//store.dispatch(actionUser(store.getState()));

export function actionCreateMessage(value, id) {
  return async (dispatch) => {
    let newmessage = await dispatch(
      actionFetch(
        "newmessage",
        GQL(
          `mutation MesRedAll($text: String){
              MessageUpsert (message: {
              text: $text
              chat: {
              _id: \"${id}\"
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

// store.dispatch(actionCreateMessage());

export function actionMedia(json, id) {
  //debugger;
  console.log(id, json);

  let mediaId = json._id;
  let chatId = id;

  return async (dispatch) => {
    let newmesmedia = await dispatch(
      actionFetch(
        "newmesmedia",
        GQL(
          `mutation MesRedAll{
                MessageUpsert (message: {
                text: ""
                media: {
                    _id: \"${mediaId}\"
                      }
                chat: {
                _id: \"${chatId}\"
                }
                }){
                _id
                text
                owner {
                login
                }
                }
                }`
        )
      )
    );
  };
}
//  store.dispatch(actionMedia(store.getState()));

export function actionCreateNewChat(userId, auth, chatName) {
  //debugger;
  console.log(userId, auth, chatName);
  return async (dispatch) => {
    let newchat = await dispatch(
      actionFetch(
        "newchat",
        GQL(
          `mutation chatId{
            ChatUpsert(chat: {
              title:  \"${chatName}\"
                 members: [
                 {
                  _id:  \"${userId._id}\"
                },
                  {
                    _id: \"${auth}\"
                  }
                ]
            }) {
              _id
              createdAt
              title
              members {
                login
              }
            }
          }`
        )
      )
    );
  };
}

export function actionAllUsers() {
  return async (dispatch) => {
    let allusers = await dispatch(
      actionFetch(
        "allusers",
        GQL(
          `query user{
            UserFind(query: "[{}]"){
              _id
              login
              nick
              avatar {
                _id
                url
              }
                }
          }
          `
        )
      )
    );
  };
}
store.dispatch(actionAllUsers());
