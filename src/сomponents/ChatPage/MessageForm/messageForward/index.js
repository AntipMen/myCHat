import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Button, Popover } from "antd";
import { ShareAltOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { actionForwardMessage, actionCleanMessage } from "../../../../actions";
import { ChatAvatar } from "../../ChatList";
import { CMessageMedia } from "../messageMedia";
import { MessageAudio } from "../messageAudio";
import { MessageVideo } from "../messageVideo";

const ForwardChatsList = ({ chats, router, onForward, forwardMessage }) => {
  return (
    <div style={{ width: "250px" }}>
      {Object.values(chats).map((chat) => (
        <Link to={`/chat/${chat._id}`} key={chat._id}>
          <div key={chat._id} chat={chat} className="forward-chat-list">
            <ChatAvatar chat={chat} />
            <h3>{chat.title}</h3>
            <Button
              type="primary"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => onForward(forwardMessage, router)}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export const CForwardChatsList = connect(
  (state, props) => ({
    chats: state.chats,
    router: state.router.match.params._id,
    forwardMessage: props.forwardMessage,
  }),
  { onForward: actionForwardMessage }
)(ForwardChatsList);

export const ForwardList = ({ forwardMessage }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <div>
        <Popover
          content={<CForwardChatsList forwardMessage={forwardMessage} />}
          title="Choose chat..."
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          placement="left"
        >
          <Button className="button-menu" type="dashed">
            Forward Message
          </Button>
        </Popover>
      </div>
    </>
  );
};

const ForwardMessage = ({ onClean, message }) => (
  <>
    <div className="forward-to">
      <ShareAltOutlined />
      <div>
        <span style={{ fontWeight: "bold" }}>{message.messageOwner}</span>
        <span>{message.messageText}</span>
        <span>{message.messageMedia != null ? "+File attachment" : null}</span>
      </div>

      <Button
        className="ant-button"
        type="dashed"
        shape="circle"
        onClick={() => onClean()}
      >
        X
      </Button>
    </div>
  </>
);

export const CForwardMessage = connect((state, props) => ({ props: props }), {
  onClean: actionCleanMessage,
})(ForwardMessage);

export const ForwardedMessage = ({ message }) => {
  return (
    <>
      <div className="forward-message">
        <span>
          {"Forwarded from" +
            " " +
            (message.forwarded.owner && message.forwarded.owner.login)}
        </span>
        <span>{message.forwarded.text}</span>
        {message.forwarded.media !== null &&
        message.forwarded.media !== undefined ? (
          <div className="forward-media">
            {message.forwarded.media[0].type === "image/jpeg" ||
            message.forwarded.media[0].type === "image/png" ? (
              <CMessageMedia image={message.forwarded.media} />
            ) : message.forwarded.media[0].type === "audio/x-m4a" ||
              message.forwarded.media[0].type === "audio/mpeg" ||
              message.forwarded.media[0].type === "audio/mp3" ||
              message.forwarded.media[0].type === "audio/ogg" ||
              message.forwarded.media[0].type === "audio/mp4" ? (
              <MessageAudio audio={message.forwarded.media} />
            ) : message.forwarded.media[0].type === "video/mp4" ||
              message.forwarded.media[0].type === "video/ogg" ||
              message.forwarded.media[0].type === "video/webm" ? (
              <MessageVideo video={message.forwarded.media} />
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};
