import React, { useRef } from "react";
import { actionMedia } from "../../../actions";
import { connect } from "react-redux";

import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { actionMediaMessage } from "../../../reducers/messageReducer";

const Upload = ({
  onUpload = () => {
    throw ReferenceError("onUpload doesn't set");
  },
}) => {
  const ref = useRef(null);
  return (
    <form
      action="/upload"
      method="post"
      encType="multipart/form-data"
      ref={ref}
    >
      <input
        type="file"
        name="media"
        onChange={() => onUpload(new FormData(ref.current))}
      />
    </form>
  );
};

export const Media = ({ id, onPush, onMedia }) => {
  var media;
  return (
    <div className="App">
      <Upload
        onUpload={(formData) =>
          fetch("http://chat.fs.a-level.com.ua/upload", {
            method: "POST",
            headers: localStorage.authToken
              ? { Authorization: "Bearer " + localStorage.authToken }
              : {},
            body: formData,
          })
            .then((res) => res.json())
            .then((json) => onMedia(json))
        }
      >
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={() => onPush(media, id)}
        />
      </Upload>
    </div>
  );
};

export const CMedia = connect(null, {
  onPush: actionMedia,
  onMedia: actionMediaMessage,
})(Media);
