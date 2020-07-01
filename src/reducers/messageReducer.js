export default function messageReducer(
  state,
  {
    type,
    chatId,
    replyMessage,
    forwardMessage,
    media,
    avatar,
    editMessage,
    audio,
    match,
  }
) {
  if (!state) {
    return {};
  }
  if (type === "REPLY_MESSAGE") {
    return {
      ...state,
      type: "reply",
      chatId,
      messageId: replyMessage._id,
      messageText: replyMessage.text,
      messageOwner: replyMessage.owner.login,
      messageMedia: replyMessage.media,
    };
  }
  if (type === "FORWARD_MESSAGE") {
    return {
      ...state,
      type: "forward",

      messageId: forwardMessage._id,
      messageText: forwardMessage.text,
      messageOwner: forwardMessage.owner.login,
      messageMedia: forwardMessage.media,
    };
  }
  if (type === "EDIT_MESSAGE") {
    return {
      ...state,
      type: "edit",

      messageId: editMessage._id,
      messageText: editMessage.text,
      messageOwner: editMessage.owner.login,
      messageMedia: editMessage.media,
    };
  }
  if (type === "ROUTE") {
    if (match.url.includes("chat")) {
      var activeChat = match.params._id;
    }
    return { ...state, activeChat: activeChat };
  }
  if (type === "MEDIA_MESSAGE") {
    return { ...state, media, type: "media" };
  }
  if (type === "AUDIO_MESSAGE") {
    return { ...state, audio, type: audio };
  }
  if (type === "CHANGE_AVATAR") {
    return { ...state, avatar, type: "avatar" };
  }
  if (type === "CLEAN_MESSAGE") {
    return { type: "clean" };
  }
  if (type === "ERROR_MESSAGE") {
    return "Error Media";
  }
  return state;
}
