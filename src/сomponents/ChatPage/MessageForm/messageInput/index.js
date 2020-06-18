import React, { Component, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./index.css";
import { Button, Input, Popover } from "antd";
import {
  actionCreateMessage,
  actionReply,
  actionForward,
  actionMedia,
  actionSaveMes,
  actionEdit,
  actionMediaMessage,
  actionCleanMessage,
} from "../../../../actions";
import { CUpload } from "../upload";
import {
  SmileOutlined,
  SendOutlined,
  AudioOutlined,
  CloseCircleOutlined,
  CheckCircleTwoTone,
  PaperClipOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { CReplyToMessage } from "../messageReply";
import { CForwardMessage } from "../messageForward";
import { CEditFormMessage } from "../messageEdit";

const InputMessage = ({
  message,
  id,
  onMessage,
  onReply,
  onForward,
  onMedia,
  onAudio,
  onClean,
  onSave,
  onEdit,
}) => {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState("");
  const [audioRecorder, setAudioRecorder] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const audioRef = useRef(null);

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  let handleSubmit = (event) => {
    event.preventDefault();

    setValue("");
  };

  const addEmoji = (emoji) => {
    setValue(value + emoji.native);
  };

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    setAudioRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e) => {
      // const audioURL = window.URL.createObjectURL(e.data);
      // new Audio(audioURL).play();
      const file = new File([e.data], "audio.webm");
      setLoading(true);
      onAudio(audioRef.current, file);
      // onAudio(file);
      console.log(file);
      console.log(e.data);
    };
  };
  const onHideRecording = () => {
    setIsRecording(false);
  };
  const onError = (err) => {
    console.log("The following error occured: " + err);
  };
  const sendAudio = () => {
    audioRecorder.stop();
    // onAudio(audioRef.current);
  };

  return (
    <>
      {message.type === "media" ? (
        <div className="attached-file">
          <PaperClipOutlined twoToneColor="#bae7ff" />
          Attached file
          <span onClick={() => onClean()}>
            {" "}
            <CloseOutlined />
          </span>
        </div>
      ) : null}
      {message.type === "reply" ? <CReplyToMessage message={message} /> : null}
      {message.type === "forward" ? (
        <CForwardMessage message={message} />
      ) : null}
      {message.type === "edit" ? <CEditFormMessage message={message} /> : null}
      <div className="chat-footer">
        <Popover
          style={{ position: "relative" }}
          placement="topLeft"
          content={
            <div className="block-emoji">
              <Picker onSelect={addEmoji} emojiTooltip={true} title="weChat" />
            </div>
          }
          trigger="hover"
        >
          <Button
            type="submit"
            shape="circle"
            icon={<SmileOutlined className="icon-emoji" />}
            style={{
              margin: "10px ",
              minHeight: "42px",
              minWidth: "42px",
            }}
          />
        </Popover>
        {isRecording ? (
          <div className="record-status">
            <Button
              type="link"
              shape="circle"
              className="cancel"
              onClick={onHideRecording}
            >
              <CloseCircleOutlined twoToneColor="#d4380d" />
            </Button>
            <i className="record-status-bubble"></i>
            Recording...
            <Button
              onClick={sendAudio}
              type="link"
              shape="circle"
              className="stop-recording"
            >
              {" "}
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Button>
            <audio ref={audioRef} controls></audio>
          </div>
        ) : (
          <form className="chat-message-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Type a message..."
              autoSize={{ minRows: 1.5, maxRows: 6 }}
              value={value}
              autoFocus={true}
              onChange={(event) => setValue(event.target.value)}
              className="input-text"
              onKeyPress={(event) =>
                event.keyCode === 13 ? onMessage() : null
              }
            />
            <button
              className="ant-btn ant-btn-primary ant-btn-circle ant-btn-lg ant-btn-icon-only"
              onClick={
                message.type === "reply"
                  ? () => onReply(value, id, message.messageId)
                  : message.type === "forward"
                  ? () => onForward(value, id, message.messageId)
                  : message.type === "media"
                  ? () => onMedia(value, message.media._id, id)
                  : message.type === "edit"
                  ? () => onEdit(value, message.messageId)
                  : () => onMessage(value, id) && onClean()
              }
              style={{ margin: "10px" }}
            >
              <SendOutlined />
            </button>
          </form>
        )}
        <CUpload />
        <Button onClick={onRecord} type="link" shape="circle">
          <AudioOutlined />
        </Button>
      </div>
    </>
  );
};

export const CNewMessage = connect(
  (state) => ({
    id: state.router && state.router.match && state.router.match.params._id,
    message: state.message,
  }),
  {
    onMessage: actionCreateMessage,
    onReply: actionReply,
    onForward: actionForward,
    onMedia: actionMedia,
    onAudio: actionMediaMessage,
    onClean: actionCleanMessage,
    onSave: actionSaveMes,
    onEdit: actionEdit,
  }
)(InputMessage);
