import { formatDate } from "../helpers/time";
import { store } from "emoji-mart";

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
            var lastMessage = chat.messages[chat.messages.length - 1];
            list[mes._id] = mes;

            return { ...list, lastMessage: lastMessage };
          }, {})
        : [];
      // let lastMessage = Object.values(chatMessages).map(item)
      let time = chat.messages
        ? chat.messages.map(
            (oneChat) =>
              (oneChat.createdAt = formatDate(
                new Date(+oneChat.createdAt),
                "dd-MM-yyyy HH:mm EEE"
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
    if (state[message.chat._id]) {
      var messages = state[message.chat._id].messages;
      state[message.chat._id].messages = {
        ...messages,
        [message._id]: message,
        lastMessage: message,
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

  if (type === "AUTH_LOGOUT") {
    return {};
  }

  return state;
}
