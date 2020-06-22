import React from "react";
import "./index.css";
import { Pending } from "../../../../helpers";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";
import "emoji-mart/css/emoji-mart.css";
import { MessageMenu } from "../messageMenu";
import { RepliesMessage } from "../messageReply";
import { ForwardedMessage } from "../messageForward";
import { CMessageMedia } from "../messageMedia";
import { MessageAudio } from "../messageAudio";
import { AvatarColors } from "./avatars";
import { MessageVideo, LinkMessage } from "../messageVideo";

export const Messages = ({ messages, auth, blockRef }) => {
  return messages ? (
    <>
      <div ref={blockRef} className="chat-messages-list">
        {Object.values(messages).map((message) => (
          <Message message={message} key={message._id} auth={auth} />
        ))}
      </div>
    </>
  ) : (
    <Pending />
  );
};

const Message = ({ message, auth }) => {
  const isMe = auth.id;

  return (
    <>
      <div
        className={message.owner._id === isMe ? "message" : "partner"}
        key={message._id}
        id={message._id}
      >
        <MessageMenu message={message} />
        <div className="message-text">
          {message.replyTo != null ? (
            <RepliesMessage message={message} />
          ) : null}
          {message.forwarded != null ? (
            <ForwardedMessage message={message} />
          ) : null}

          <div className="message-username">{message.owner.login}</div>
          <span>
            {reactStringReplace(message.text, (emoji, props) => (
              <Emoji
                emoji={emoji}
                set="apple"
                size={20}
                fallback={(emoji, props) =>
                  emoji ? `${emoji.native}` : props.emoji
                }
              />
            ))}
          </span>
          {message.media !== null && message.media !== undefined ? (
            <div>
              {message.media[0].type === "image/jpeg" ||
              message.media[0].type === "image/png" ? (
                <CMessageMedia image={message.media} />
              ) : message.media[0].type === "audio/x-m4a" ||
                message.media[0].type === "audio/mpeg" ||
                message.media[0].type === "audio/mp3" ||
                message.media[0].type === "audio/ogg" ||
                message.media[0].type === "audio/mp4" ? (
                <MessageAudio audio={message.media} />
              ) : message.media[0].type === "video/mp4" ||
                message.media[0].type === "video/ogg" ||
                message.media[0].type === "video/webm" ? (
                <MessageVideo video={message.media} />
              ) : null}
            </div>
          ) : null}
          <LinkMessage message={message} />
          <span className="time">
            {message.createdAt.includes("T")
              ? message.createdAt.slice(11, 16)
              : message.createdAt.slice(11, 16)}
          </span>
        </div>
        <UserAvatar message={message} />
      </div>
    </>
  );
};

export const UserAvatar = ({ message }) => {
  const { color, colorLighten } = AvatarColors(message.owner.login);
  return (
    <div className="user-avatar">
      {message.owner.avatar != null ? (
        <img
          src={
            message.owner.avatar &&
            `http://chat.fs.a-level.com.ua/${message.owner.avatar.url}`
          }
          width="50px"
          alt="avatar"
        />
      ) : (
        <span
          className="circle-min"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
          }}
        >
          <h1>{message.owner.login.slice(0, 1)}</h1>
        </span>
      )}
    </div>
  );
};
