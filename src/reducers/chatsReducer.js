import { formatDate } from "../helpers/time";

export default function chatsReducer(
  state,
  { type, payload, message, chatId, messageId, media, ...action }
) {
  if (!state) {
    return {};
  }
  if (type === "SAVE_CHATS") {
    for (let chat of payload) {
      var chatMessages = chat.messages
        ? chat.messages.reduce((list, mes) => {
            list[mes._id] = mes;
            return list;
          }, {})
        : [];
      let time = chat.messages
        ? chat.messages.map(
            (oneChat) =>
              (oneChat.createdAt = formatDate(
                new Date(+oneChat.createdAt),
                "dd-MM-yyyy HH:mm"
              ))
          )
        : [];
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
    debugger;

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
  if (type === "DELETE_MESSAGE") {
    let newChats = { ...state };
    const chatFind = Object.values(newChats).find(
      (chatI) => chatI._id === chatId
    );
    delete chatFind.messages[messageId._id];
    return newChats;
  }
  // if (type === "UPSERT_CHATS") {
  //   console.log(action);
  //   return { action };
  // }

  if (type === "AUTH_LOGOUT") {
    return {};
  }

  return state;
}

export const actionDeleteMessage = (chatId, messageId) => ({
  type: "DELETE_MESSAGE",
  chatId,
  messageId,
});

// export const actionUpsertChats = (upsert) => ({ type: "UPSERT_CHATS", upsert})
