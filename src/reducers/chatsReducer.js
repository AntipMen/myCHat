export default function chatsReducer(state, { type, payload, message }) {
  if (!state) {
    return {};
  }

  if (type === "SAVE_CHATS") {
    for (let chat of payload) {
      var chatMessages = chat.messages.reduce((list, mes) => {
        list[mes._id] = mes;
        return list;
      }, {});
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
  return state;
}
