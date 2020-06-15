import React, { Component, useRef, useEffect, useState } from "react";
import "./MessageForm.css";
import { Pending } from "../../../helpers";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";
import "emoji-mart/css/emoji-mart.css";
import { MessageMenu } from "./messageMenu";
import { RepliesMessage } from "./replyMessage";
import { ForwardedMessage } from "./forwardChats";
import { CMessageMedia } from "./messageMedia";

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
  return (
    <>
      <div
        className={message.owner.login === auth ? "message" : "partner"}
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
          <div>
           
              <CMessageMedia image={message.media} />
           
          </div>
          <span className="time">
            {message.createdAt.includes("T")
              ? message.createdAt.slice(11, 16)
              : message.createdAt.slice(11, 16)}
          </span>
        </div>

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
            <span className="circle-min">
              <h1>{message.owner.login.slice(0, 1)}</h1>
            </span>
          )}
        </div>
      </div>
    </>
  );
};
