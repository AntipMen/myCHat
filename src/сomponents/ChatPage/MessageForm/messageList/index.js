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
import { connect } from "react-redux";

export const Messages = ({ messages, members, auth, blockRef }) => {
  let messagesObject = { ...messages };
  delete messagesObject.lastMessage;

  return messagesObject ? (
    <>
      <div ref={blockRef} className="chat-messages-list">
        {Object.values(messagesObject).map((message) => (
          <Message
            message={message}
            key={message._id}
            auth={auth}
            members={members}
          />
        ))}
      </div>
    </>
  ) : (
    <Pending />
  );
};

const Message = ({ message, auth, members }) => {
  const isMe = auth.id;
  const partner = members.find((member) => member._id !== isMe);

  return (
    <>
      {message.id !== message._id ? (
        <div
          className={message.owner._id === isMe ? "message" : "partner"}
          key={message._id}
          id={message._id}
        >
          <div className="message-content">
            <MessageMenu message={message} />
          </div>

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
              <CMediaType message={message} />
            ) : null}

            <LinkMessage message={message} />
            <span className="time">
              {message.createdAt.includes("Z")
                ? message.createdAt
                    .slice(5, 10)
                    .split("-")
                    .reverse()
                    .join("/") +
                  " " +
                  message.createdAt.slice(11, 16)
                : message.createdAt
                    .slice(5, 10)
                    .split("-")
                    .reverse()
                    .join("/") +
                  " " +
                  message.createdAt.slice(11, 16)}
            </span>
          </div>
          <CUserAvatar message={message} partner={partner} />
        </div>
      ) : null}
    </>
  );
};

export const UserAvatar = ({ auth, message, partner }) => {
  const isMe = auth.data.sub.id;
  const avatar = auth.avatar;
  const { color, colorLighten } = AvatarColors(message.owner.login);
  return (
    <div className="user-avatar">
      {message !== null && message !== undefined ? (
        <>
          {message.owner._id === isMe && avatar !== null ? (
            <img
              src={avatar && `http://chat.fs.a-level.com.ua/${avatar.url}`}
              width="50px"
              alt="avatar"
            />
          ) : partner._id === message.owner._id &&
            partner.avatar !== null &&
            partner.avatar !== undefined ? (
            <img
              src={
                partner.avatar &&
                `http://chat.fs.a-level.com.ua/${partner.avatar.url}`
              }
              width="50px"
              alt="avatar"
            />
          ) : message.owner._id !== isMe && message.owner.avatar !== null ? (
            <img
              src={
                partner.avatar &&
                `http://chat.fs.a-level.com.ua/${partner.avatar.url}`
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
        </>
      ) : null}
    </div>
  );
};

const CUserAvatar = connect((state, props) => ({
  auth: state.auth,
  message: props.message,
}))(UserAvatar);

const MediaType = ({ message, media }) => {
  return (
    <>
      {message.media && message.media[0] ? (
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
          ) : null}{" "}
        </div>
      ) : media && media !== null && media !== undefined ? (
        <div>
          {media[0].type === "image/jpeg" || media[0].type === "image/png" ? (
            <CMessageMedia image={media} />
          ) : media[0].type === "audio/x-m4a" ||
            media[0].type === "audio/mpeg" ||
            media[0].type === "audio/mp3" ||
            media[0].type === "audio/ogg" ||
            media[0].type === "audio/mp4" ? (
            <MessageAudio audio={media} />
          ) : media[0].type === "video/mp4" ||
            media[0].type === "video/ogg" ||
            media[0].type === "video/webm" ? (
            <MessageVideo video={media} />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

const CMediaType = connect((state, props) => ({
  message: props.message,
  media:
    state.promise.newmesmedia &&
    state.promise.newmesmedia.payload &&
    state.promise.newmesmedia.payload.data.MessageUpsert &&
    state.promise.newmesmedia.payload.data.MessageUpsert.media,
}))(MediaType);
