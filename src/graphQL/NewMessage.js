import { actionFetch, GQL } from "./actionFetch-GQL";
// import { Input } from "../ChatPage/MessageForm/MessageForm";
import { store } from "../../reducers/index.js";



export const CInput = (state) =>
  ({
    newmessage:
      state.promise.newmessage &&
      state.promise.newmessage.payload &&
      state.promise.newmessage.payload.data.MessageUpsert,
  }());
