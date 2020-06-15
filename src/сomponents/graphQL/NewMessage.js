import { actionFetch, GQL } from "./actionFetch-GQL";
// import { Input } from "../ChatPage/MessageForm/MessageForm";
import { store } from "../../reducers/index.js";

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
              _id:"5ea823fbd265602706d7393b"
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

export const CInput = (state) =>
  ({
    newmessage:
      state.promise.newmessage &&
      state.promise.newmessage.payload &&
      state.promise.newmessage.payload.data.MessageUpsert,
  }());
