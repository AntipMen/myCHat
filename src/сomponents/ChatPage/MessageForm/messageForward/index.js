import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { actionForwardMessage, actionCleanMessage } from "../../../../actions";

export const ForwardChatsList = ({
  chats,
  router,
  onForward,
  forwardMessage,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        <Button className="button-menu" type="dashed" onClick={showModal}>
          Forward Message
        </Button>
        <Modal
          title="Choose chat..."
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ width: "400px" }}
        >
          <div style={{ width: "250px" }}>
            {Object.values(chats).map((chat) => (
              <Link to={`/chat/${chat._id}`} key={chat._id}>
                <div key={chat._id} chat={chat} className="forward-chat-list">
                  {chat.avatar != null ? (
                    <img
                      src={
                        chat.avatar &&
                        `http://chat.fs.a-level.com.ua/${chat.avatar.url}`
                      }
                      width="50px"
                      alt="avatar"
                    />
                  ) : (
                    <span className="circle-min-chat">
                      {chat.title ? <h1>{chat.title.slice(0, 1)}</h1> : ""}
                    </span>
                  )}
                  <h3>{chat.title}</h3>
                  <button onClick={() => onForward(forwardMessage, router)}>
                    forward
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </Modal>
      </div>
    </>
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
        <span className="line-forward"></span>
        <span>
          {"Forwarded from" +
            " " +
            (message.forwarded.owner && message.forwarded.owner.login)}
        </span>
        <span>{message.forwarded.text}</span>
      </div>
    </>
  );
};
