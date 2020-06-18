import React, { useState } from "react";
import "./index.css";
import { EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Button } from "antd";
import { actionCleanMessage } from "../../../../actions";

const EditFormMessage = ({ selectMessage, onClean }) => (
  <>
    <div className="edit-message">
      <EditOutlined />
      <div className="edit-text">
        <span>Edit message</span>
        <span>{selectMessage.messageText}</span>
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

export const CEditFormMessage = connect(
  (state, props) => ({
    selectMessage: props.message,
  }),
  { onClean: actionCleanMessage }
)(EditFormMessage);
