import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { connect } from "react-redux";
import "./index.css";

export const MessageMedia = ({ media, image, medialocal }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        {image != null && image != undefined ? (
          <img
            src={
              image[0] && image[0].url
                ? `http://chat.fs.a-level.com.ua/${image[0].url}`
                : "uups"
            }
            width="200px"
            alt="media"
            onClick={showModal}
          />
        ) : media !== null && media !== undefined ? (
          <img
            src={media ? `http://chat.fs.a-level.com.ua/${media}` : "uups"}
            width="200px"
            alt="media"
            onClick={showModal}
          /> ? (
            medialocal !== null && medialocal[0].type === "image/jpeg"
          ) : (
            <img
              src={
                medialocal
                  ? `http://chat.fs.a-level.com.ua/${medialocal[0].url}`
                  : "uups"
              }
              width="200px"
              alt="media"
              onClick={showModal}
            />
          )
        ) : null}

        <Modal
          footer={null}
          title="Image"
          visible={visible}
          onCancel={hideModal}
          className="ant-modal"
        >
          {image != null && image != undefined ? (
            <img
              src={
                image[0] && image[0].url
                  ? `http://chat.fs.a-level.com.ua/${image[0].url}`
                  : "uups"
              }
              width="100%"
              alt="media"
              onClick={showModal}
            />
          ) : media != null && media != undefined ? (
            <img
              src={media ? `http://chat.fs.a-level.com.ua/${media}` : "uups"}
              width="100%"
              alt="media"
              onClick={showModal}
            /> ? (
              medialocal != null
            ) : (
              <img
                src={
                  medialocal
                    ? `http://chat.fs.a-level.com.ua/${medialocal[0].url}`
                    : "uups"
                }
                width="100%"
                alt="media"
                onClick={showModal}
              />
            )
          ) : null}
        </Modal>
      </div>
    </>
  );
};

export const CMessageMedia = connect((state) => ({
  medialocal:
    state.promise &&
    state.promise.newmesmedia &&
    state.promise.newmesmedia.payload &&
    state.promise.newmesmedia.payload.data.MessageUpsert.media,
}))(MessageMedia);
