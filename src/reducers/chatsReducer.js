import { store } from ".";

export default function chatsReducer(state, { type, payload, message }) {
  //debugger
  if (!state) {
    return {};
  }
  // if (type === "AUTH_LOGIN") {
  //   type = "SAVE_CHATS";
  // }
  if (type === "SAVE_CHATS") {
    console.log(payload)
    for (let chat of payload) {
      var chatMessages = chat.messages ? chat.messages.reduce((list, mes) => {
        list[mes._id] = mes;
        return list;
      }, {}) : []
      chat.messages = chatMessages;
    }
    const chats = payload;
    var allchats = chats.reduce((res, chat) => {
      res[chat._id] = chat;
      return res;
    }, {});

    return {
      ...state,
      ...allchats,
    };
  }
  if (type === "SAVE_MESSAGE") {
    if (state[message.chat._id]) {
      var messages = state[message.chat._id].messages;
      state[message.chat._id].messages = {
        ...messages,
        [message._id]: message,
      };
    }
    return {
      ...state,
    };
  }

  if (type === "AUTH_LOGOUT") {
    return {};
  }

  return state;
}
