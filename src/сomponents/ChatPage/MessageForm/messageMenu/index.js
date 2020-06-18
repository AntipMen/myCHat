import React from "react";
import { connect } from "react-redux";
import "./index.css";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
  actionReplyMessage,
  actionEditMessage,
  actionDeleteMessage,
} from "../../../../actions";
import { CForwardChatsList } from "../messageForward";

const Content = ({ onReply, replyMessage, chatId, onDelete, onEdit }) => (
  <>
    {console.log(replyMessage)}
    <div className="content-menu">
      <Button
        className="button-menu"
        type="dashed"
        onClick={() => onReply(chatId, replyMessage)}
      >
        Reply Message
      </Button>
      <CForwardChatsList forwardMessage={replyMessage} />
      <Button
        className="button-menu"
        type="dashed"
        onClick={() => onEdit(replyMessage)}
      >
        Edit Message
      </Button>
      <Button
        className="button-menu"
        type="dashed"
        onClick={() => onDelete(chatId, replyMessage)}
      >
        Delete Message
      </Button>
    </div>
  </>
);

const CContent = connect(
  (state, props) => ({
    chatId: state.router.match.params._id,
    replyMessage: props.replyMessage,
  }),
  {
    onReply: actionReplyMessage,
    onDelete: actionDeleteMessage,
    onEdit: actionEditMessage,
  }
)(Content);

export const MessageMenu = (replyMessage) => (
  <>
    <Popover
      content={<CContent replyMessage={replyMessage.message} />}
      trigger="click"
    >
      <MoreOutlined />
    </Popover>
  </>
);
