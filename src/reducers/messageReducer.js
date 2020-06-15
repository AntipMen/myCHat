import { message } from "antd";

export default function messageReducer(
  state,
  { type, chatId, replyMessage, forwardMessage, media }
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
    };
  }
  if (type === "FORWARD_MESSAGE") {
    return {
      ...state,
      type: "forward",

      messageId: forwardMessage._id,
      messageText: forwardMessage.text,
      messageOwner: forwardMessage.owner.login,
    };
  }
  if (type === "MEDIA_MESSAGE") {
    return { media, type: "media" };
  }
  if (type === "CLEAN_MESSAGE") {
    debugger;

    return { type: "clean" };
  }
  return state;
}

export const actionReplyMessage = (chatId, replyMessage) => ({
  type: "REPLY_MESSAGE",
  chatId,
  replyMessage,
});

export const actionForwardMessage = (forwardMessage) => ({
  type: "FORWARD_MESSAGE",
  forwardMessage,
});

export const actionCleanMessage = () => ({ type: "CLEAN_MESSAGE" });

export const actionMediaMessage = (media) => ({ type: "MEDIA_MESSAGE", media });
